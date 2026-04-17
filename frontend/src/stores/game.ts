import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { type Leader, getLeaderById } from '@/data/leaders'
import { getScenarioData, getInitialYear, type TimelineEvent, type SideEvent } from '@/data/scenarios'
import { type GameStatKey, type StatEffect } from '@/data/types'
import { type Ending, getEnding, getSpecialEndingById, type EndingCause } from '@/data/endings'

const INITIAL_STAT = 50
const MAX_STAT = 100
const MIN_STAT = 0

interface Stats {
  heaven: number
  politics: number
  military: number
  provisions: number
}

const createInitialStats = (): Stats => ({
  heaven: INITIAL_STAT,
  politics: INITIAL_STAT,
  military: INITIAL_STAT,
  provisions: INITIAL_STAT,
})

export type GameEvent = TimelineEvent | SideEvent

export const useGameStore = defineStore('game', () => {
  const selectedLeader = ref<Leader | null>(null)
  const stats = ref<Stats>(createInitialStats())
  const currentYear = ref(189)
  const turnCount = ref(0)
  const currentCard = ref<GameEvent | null>(null)
  const usedTimelineIds = ref<string[]>([])
  const usedSideIds = ref<string[]>([])
  const ending = ref<Ending | null>(null)
  const currentScenario = ref<ReturnType<typeof getScenarioData> | null>(null)
  const isInSideEvent = ref(false)
  const inventory = ref<string[]>([])
  const inventoryTriggers = ref<string[]>([])

  function hasInventoryItem(item: string): boolean {
    return inventory.value.includes(item)
  }

  function addInventoryItem(item: string) {
    if (!inventory.value.includes(item)) {
      inventory.value.push(item)
    }
  }

  function checkInventoryTriggers(triggerId: string): boolean {
    return inventoryTriggers.value.includes(triggerId)
  }

  function addInventoryTrigger(triggerId: string) {
    if (!inventoryTriggers.value.includes(triggerId)) {
      inventoryTriggers.value.push(triggerId)
    }
  }

  const isGameOver = computed(() => ending.value !== null)

  function shuffle<T>(array: T[]): T[] {
    const result = [...array]
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[result[i], result[j]] = [result[j], result[i]]
    }
    return result
  }

  function drawNextSideEvent(): SideEvent | null {
    if (!currentScenario.value) return null

    const availableSides = currentScenario.value.sideEvents.filter(
      (e) => !usedSideIds.value.includes(e.id)
    )

    if (availableSides.length === 0) {
      usedSideIds.value = []
      return drawNextSideEvent()
    }

    const shuffled = shuffle(availableSides)
    const nextEvent = shuffled[0]
    if (nextEvent) {
      usedSideIds.value.push(nextEvent.id)
    }
    return nextEvent || null
  }

  function applyEffects(effects: StatEffect) {
    if (effects.heaven !== undefined) {
      stats.value.heaven = Math.max(MIN_STAT, Math.min(MAX_STAT, stats.value.heaven + effects.heaven))
    }
    if (effects.politics !== undefined) {
      stats.value.politics = Math.max(MIN_STAT, Math.min(MAX_STAT, stats.value.politics + effects.politics))
    }
    if (effects.military !== undefined) {
      stats.value.military = Math.max(MIN_STAT, Math.min(MAX_STAT, stats.value.military + effects.military))
    }
    if (effects.provisions !== undefined) {
      stats.value.provisions = Math.max(MIN_STAT, Math.min(MAX_STAT, stats.value.provisions + effects.provisions))
    }
  }

  function checkEnding() {
    if (currentCard.value && 'specialEndingId' in currentCard.value && currentCard.value.specialEndingId) {
      const specialEnding = getSpecialEndingById(currentCard.value.specialEndingId)
      if (specialEnding) {
        ending.value = specialEnding
        return
      }
    }

    const currentStats = stats.value
    const statKeys: (keyof Stats)[] = ['heaven', 'politics', 'military', 'provisions']

    for (const statKey of statKeys) {
      const value = currentStats[statKey]
      if (value >= MAX_STAT) {
        ending.value = getEnding(statKey as EndingCause, true) || null
        return
      }
      if (value <= MIN_STAT) {
        ending.value = getEnding(statKey as EndingCause, false) || null
        return
      }
    }
  }

  function startNewRun(leaderId: string) {
    const leader = getLeaderById(leaderId)
    if (!leader) return

    selectedLeader.value = leader
    stats.value = createInitialStats()
    currentYear.value = getInitialYear(leaderId)
    turnCount.value = 0
    usedTimelineIds.value = []
    usedSideIds.value = []
    ending.value = null
    isInSideEvent.value = false
    currentScenario.value = getScenarioData(leaderId) || null

    if (currentScenario.value) {
      const firstEvent = currentScenario.value.getTimelineEvent(
        currentScenario.value.getFirstTimelineId()
      )
      if (firstEvent) {
        currentCard.value = firstEvent
        usedTimelineIds.value.push(firstEvent.id)
      }
    }
  }

  function applyChoice(direction: 'left' | 'right') {
    if (!currentCard.value || !selectedLeader.value) return

    const choice = currentCard.value.choices.find((c) => c.direction === direction)
    if (!choice) return

    if (choice.requiredInventoryItem) {
      const hasRequired = hasInventoryItem(choice.requiredInventoryItem)
      if (!hasRequired) {
        return
      }
    }

    let effectiveNextTimelineId = choice.nextTimelineId

    if (choice.ifHasInventoryItem && hasInventoryItem(choice.ifHasInventoryItem)) {
      effectiveNextTimelineId = choice.nextTimelineId || null
    } else if (choice.ifNotHasInventoryItem && !hasInventoryItem(choice.ifNotHasInventoryItem)) {
      effectiveNextTimelineId = choice.nextTimelineId || null
    }

    applyEffects(choice.effects)
    turnCount.value++

    if (choice.inventoryItem) {
      addInventoryItem(choice.inventoryItem)
    }

    if (choice.triggerInventoryItem) {
      addInventoryTrigger(choice.triggerInventoryItem)
    }

    if (currentCard.value.type === 'timeline') {
      currentYear.value = currentCard.value.year
      if (effectiveNextTimelineId && currentScenario.value) {
        let nextEvent = currentScenario.value.getTimelineEvent(effectiveNextTimelineId)
        let nextSideEvent = currentScenario.value.getSideEvent(effectiveNextTimelineId)
        
        if (nextEvent) {
          if (nextEvent.specialEndingId) {
            usedTimelineIds.value.push(nextEvent.id)
          }
          currentCard.value = nextEvent
        } else if (nextSideEvent) {
          isInSideEvent.value = true
          usedSideIds.value.push(nextSideEvent.id)
          currentCard.value = nextSideEvent
        } else {
          checkEnding()
        }
      } else {
        checkEnding()
      }
    } else if (currentCard.value.type === 'side') {
      if (choice.completionEventId && currentScenario.value) {
        const completionEvent = currentScenario.value.getSideEvent(choice.completionEventId)
        if (completionEvent) {
          currentCard.value = completionEvent
          usedSideIds.value.push(completionEvent.id)
        } else if (choice.nextTimelineId && currentScenario.value) {
          isInSideEvent.value = false
          const nextEvent = currentScenario.value.getTimelineEvent(choice.nextTimelineId)
          if (nextEvent) {
            currentCard.value = nextEvent
            usedTimelineIds.value.push(nextEvent.id)
          } else {
            drawNextTimeline()
          }
        } else {
          isInSideEvent.value = false
          drawNextTimeline()
        }
      } else if (choice.nextTimelineId && currentScenario.value) {
        isInSideEvent.value = false
        const nextEvent = currentScenario.value.getTimelineEvent(choice.nextTimelineId)
        if (nextEvent) {
          currentCard.value = nextEvent
          usedTimelineIds.value.push(nextEvent.id)
        } else {
          drawNextTimeline()
        }
      } else {
        isInSideEvent.value = false
        drawNextTimeline()
      }
    }

    checkEnding()
  }

  function drawNextTimeline() {
    if (!currentScenario.value) return

    const availableTimeline = currentScenario.value.timeline.filter(
      (e) => !usedTimelineIds.value.includes(e.id) && !e.specialEndingId
    )

    if (availableTimeline.length === 0) {
      checkEnding()
      return
    }

    const nextEvent = availableTimeline[0]
    if (nextEvent) {
      usedTimelineIds.value.push(nextEvent.id)
      currentCard.value = nextEvent
    }
  }

  function drawRandomSideEvent() {
    const sideEvent = drawNextSideEvent()
    if (sideEvent) {
      currentCard.value = sideEvent
      isInSideEvent.value = true
    }
  }

  function resetRun() {
    if (selectedLeader.value) {
      startNewRun(selectedLeader.value.id)
    }
  }

  function resetToHome() {
    selectedLeader.value = null
    stats.value = createInitialStats()
    currentYear.value = 189
    turnCount.value = 0
    currentCard.value = null
    usedTimelineIds.value = []
    usedSideIds.value = []
    ending.value = null
    currentScenario.value = null
    isInSideEvent.value = false
  }

  return {
    selectedLeader,
    stats,
    currentYear,
    turnCount,
    currentCard,
    ending,
    isGameOver,
    isInSideEvent,
    inventory,
    inventoryTriggers,
    hasInventoryItem,
    addInventoryItem,
    checkInventoryTriggers,
    addInventoryTrigger,
    startNewRun,
    applyChoice,
    resetRun,
    resetToHome,
  }
})