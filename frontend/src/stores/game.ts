import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { type Leader, getLeaderById } from '@/data/leaders'
import { getScenarioData, getInitialYear, type TimelineEvent, type SideEvent } from '@/data/scenarios'
import { type StatEffect, type Location, type LocationEvent } from '@/data/types'
import { type Ending, getEnding, getSpecialEndingById, type EndingCause } from '@/data/endings'
import { getLocationById } from '@/data/locations'
import { getSiteById, specialEndings, type HistoricalSite, type HistoricalSiteEvent } from '@/data/historicalSites'
import { audioManager } from '@/utils/audio'

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
  const selectedLocation = ref<Location | null>(null)
  const selectedSite = ref<HistoricalSite | null>(null)
  const stats = ref<Stats>(createInitialStats())
  const currentYear = ref(189)
  const turnCount = ref(0)
  const currentCard = ref<GameEvent | LocationEvent | HistoricalSiteEvent | null>(null)
  const usedTimelineIds = ref<string[]>([])
  const usedSideIds = ref<string[]>([])
  const usedLocationEventIds = ref<string[]>([])
  const usedSiteEventIds = ref<string[]>([])
  const ending = ref<Ending | null>(null)
  const currentScenario = ref<ReturnType<typeof getScenarioData> | null>(null)
  const isInSideEvent = ref(false)
  const inventory = ref<string[]>([])
  const inventoryTriggers = ref<string[]>([])
  const isLocationMode = ref(false)
  const isSiteMode = ref(false)

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
        playEndingSound(specialEnding.id)
        return
      }
    }

    const currentStats = stats.value
    const statKeys: (keyof Stats)[] = ['heaven', 'politics', 'military', 'provisions']

    for (const statKey of statKeys) {
      const value = currentStats[statKey]
      if (value >= MAX_STAT) {
        ending.value = getEnding(statKey as EndingCause, true) || null
        playEndingSound(null, true)
        return
      }
      if (value <= MIN_STAT) {
        ending.value = getEnding(statKey as EndingCause, false) || null
        playEndingSound(null, false)
        return
      }
    }
  }

  function playEndingSound(specialEndingId: string | null, isHigh: boolean = false) {
    const endingData = specialEndingId 
      ? specialEndings.find(e => e.id === specialEndingId)
      : null
    
    if (endingData) {
      if (endingData.category === 'good') {
        audioManager.playGoodEnding()
      } else if (endingData.category === 'bad') {
        audioManager.playBadEnding()
      } else {
        if (isHigh) {
          audioManager.playGoodEnding()
        } else {
          audioManager.playBadEnding()
        }
      }
    } else {
      if (isHigh) {
        audioManager.playGoodEnding()
      } else {
        audioManager.playBadEnding()
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
    isSiteMode.value = false
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
    if (isSiteMode.value || isLocationMode.value) return

    const card = currentCard.value as GameEvent
    const choice = card.choices.find((c) => c.direction === direction)
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

    if (card.type === 'timeline') {
      currentYear.value = card.year
      if (effectiveNextTimelineId && currentScenario.value) {
        const nextEvent = currentScenario.value.getTimelineEvent(effectiveNextTimelineId)
        const nextSideEvent = currentScenario.value.getSideEvent(effectiveNextTimelineId)
        
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
    } else if (card.type === 'side') {
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

  function startLocationRun(locationId: string, leaderId?: string) {
    const location = getLocationById(locationId)
    if (!location) return

    selectedLocation.value = location
    isLocationMode.value = true
    isSiteMode.value = false
    stats.value = createInitialStats()
    turnCount.value = 0
    usedLocationEventIds.value = []
    ending.value = null

    if (leaderId) {
      const leader = getLeaderById(leaderId)
      if (leader) {
        selectedLeader.value = leader
      }
    }

    const firstEvent = location.events[0]
    if (firstEvent) {
      currentCard.value = firstEvent
      currentYear.value = firstEvent.year
      usedLocationEventIds.value.push(firstEvent.id)
    }
  }

  function applyLocationChoice(direction: 'left' | 'right') {
    if (!currentCard.value || !selectedLocation.value) return

    const choice = currentCard.value.choices.find((c) => c.direction === direction)
    if (!choice) return

    applyEffects(choice.effects)
    turnCount.value++

    const currentLocationEvents = selectedLocation.value.events
    const currentEventIndex = currentLocationEvents.findIndex(
      e => e.id === (currentCard.value as LocationEvent).id
    )

    if (currentEventIndex < currentLocationEvents.length - 1) {
      const nextEvent = currentLocationEvents[currentEventIndex + 1]
      currentCard.value = nextEvent
      currentYear.value = nextEvent.year
      usedLocationEventIds.value.push(nextEvent.id)
    } else {
      checkEnding()
    }
  }

  function startSiteRun(siteId: string) {
    const site = getSiteById(siteId)
    if (!site) return

    selectedSite.value = site
    isSiteMode.value = true
    isLocationMode.value = false
    stats.value = createInitialStats()
    turnCount.value = 0
    usedSiteEventIds.value = []
    ending.value = null

    const firstEvent = site.events[0]
    if (firstEvent) {
      currentCard.value = firstEvent
      currentYear.value = firstEvent.year
      usedSiteEventIds.value.push(firstEvent.id)
    }
  }

  function applySiteChoice(direction: 'left' | 'right') {
    if (!currentCard.value || !selectedSite.value) return

    const choice = currentCard.value.choices.find((c) => c.direction === direction)
    if (!choice) return

    applyEffects(choice.effects)
    playChoiceSound(choice.effects)
    turnCount.value++

    const currentSiteEvents = selectedSite.value.events
    const currentEventIndex = currentSiteEvents.findIndex(
      e => e.id === (currentCard.value as HistoricalSiteEvent).id
    )

    if (currentEventIndex < currentSiteEvents.length - 1) {
      const nextEvent = currentSiteEvents[currentEventIndex + 1]
      currentCard.value = nextEvent
      currentYear.value = nextEvent.year
      usedSiteEventIds.value.push(nextEvent.id)
    } else {
      checkEnding()
    }
  }

  function playChoiceSound(effects: StatEffect) {
    const DANGER_THRESHOLD = 90
    const LOW_THRESHOLD = 10

    let hasHigh = false
    let hasLow = false

    if (effects.heaven !== undefined) {
      const newValue = stats.value.heaven
      if (newValue >= DANGER_THRESHOLD || newValue <= LOW_THRESHOLD) {
        if (effects.heaven > 0) hasHigh = true
        else hasLow = true
      }
    }
    if (effects.politics !== undefined) {
      const newValue = stats.value.politics
      if (newValue >= DANGER_THRESHOLD || newValue <= LOW_THRESHOLD) {
        if (effects.politics > 0) hasHigh = true
        else hasLow = true
      }
    }
    if (effects.military !== undefined) {
      const newValue = stats.value.military
      if (newValue >= DANGER_THRESHOLD || newValue <= LOW_THRESHOLD) {
        if (effects.military > 0) hasHigh = true
        else hasLow = true
      }
    }
    if (effects.provisions !== undefined) {
      const newValue = stats.value.provisions
      if (newValue >= DANGER_THRESHOLD || newValue <= LOW_THRESHOLD) {
        if (effects.provisions > 0) hasHigh = true
        else hasLow = true
      }
    }

    if (hasHigh) {
      audioManager.playHighValueWarning()
    } else if (hasLow) {
      audioManager.playLowValueWarning()
    }
  }

  function resetRun() {
    audioManager.stop()
    if (isSiteMode.value && selectedSite.value) {
      startSiteRun(selectedSite.value.id)
    } else if (selectedLeader.value && isLocationMode.value && selectedLocation.value) {
      startLocationRun(selectedLocation.value.id, selectedLeader.value.id)
    } else if (selectedLeader.value) {
      startNewRun(selectedLeader.value.id)
    }
  }

  function resetToHome() {
    audioManager.stop()
    selectedLeader.value = null
    selectedLocation.value = null
    selectedSite.value = null
    stats.value = createInitialStats()
    currentYear.value = 189
    turnCount.value = 0
    currentCard.value = null
    usedTimelineIds.value = []
    usedSideIds.value = []
    usedLocationEventIds.value = []
    usedSiteEventIds.value = []
    ending.value = null
    currentScenario.value = null
    isInSideEvent.value = false
    isLocationMode.value = false
    isSiteMode.value = false
  }

  return {
    selectedLeader,
    selectedLocation,
    selectedSite,
    stats,
    currentYear,
    turnCount,
    currentCard,
    ending,
    isGameOver,
    isInSideEvent,
    isLocationMode,
    isSiteMode,
    inventory,
    inventoryTriggers,
    hasInventoryItem,
    addInventoryItem,
    checkInventoryTriggers,
    addInventoryTrigger,
    startNewRun,
    startLocationRun,
    startSiteRun,
    applyChoice,
    applyLocationChoice,
    applySiteChoice,
    resetRun,
    resetToHome,
  }
})
