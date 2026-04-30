<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import EventCard from '@/components/EventCard.vue'
import type { GameStatKey } from '@/data/types'
import { getCharacterVisual } from '@/data/types'
import type { EndingCause } from '@/data/endings'
import type { HistoricalSiteEvent } from '@/data/historicalSites'
import type { TimelineEvent, SideEvent, LocationEvent } from '@/data/types'
import { audioManager } from '@/utils/audio'

const route = useRoute()
const router = useRouter()
const gameStore = useGameStore()

const SWIPE_THRESHOLD = 100

const cardRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const dragStartX = ref(0)
const dragDistance = ref(0)
const dragDirection = ref<'left' | 'right' | null>(null)

const statLabels: Record<GameStatKey, string> = {
  heaven: '天意',
  politics: '权谋',
  military: '兵力',
  provisions: '粮草',
}

function getEndingCauseLabel(cause?: EndingCause): string {
  if (!cause) return ''
  if (cause === 'heaven') return statLabels.heaven
  if (cause === 'politics') return statLabels.politics
  if (cause === 'military') return statLabels.military
  if (cause === 'provisions') return statLabels.provisions
  return ''
}

const filteredStats = computed(() => [
  { key: 'heaven' as GameStatKey, label: statLabels.heaven, value: gameStore.stats.heaven },
  { key: 'politics' as GameStatKey, label: statLabels.politics, value: gameStore.stats.politics },
  { key: 'military' as GameStatKey, label: statLabels.military, value: gameStore.stats.military },
  { key: 'provisions' as GameStatKey, label: statLabels.provisions, value: gameStore.stats.provisions },
])

const currentChoice = computed(() => {
  if (!gameStore.currentCard) return null
  if (!dragDirection.value) return null
  return gameStore.currentCard.choices.find((c) => c.direction === dragDirection.value)
})

const currentEffects = computed(() => {
  if (!currentChoice.value) return null
  return currentChoice.value.effects
})

const statChanges = computed(() => {
  if (!currentEffects.value) return null
  const changes: Record<GameStatKey, 'increase' | 'decrease' | null> = {
    heaven: null,
    politics: null,
    military: null,
    provisions: null,
  }
  if (currentEffects.value.heaven !== undefined) {
    changes.heaven = currentEffects.value.heaven > 0 ? 'increase' : 'decrease'
  }
  if (currentEffects.value.politics !== undefined) {
    changes.politics = currentEffects.value.politics > 0 ? 'increase' : 'decrease'
  }
  if (currentEffects.value.military !== undefined) {
    changes.military = currentEffects.value.military > 0 ? 'increase' : 'decrease'
  }
  if (currentEffects.value.provisions !== undefined) {
    changes.provisions = currentEffects.value.provisions > 0 ? 'increase' : 'decrease'
  }
  return changes
})

const leaderColor = computed(() => gameStore.selectedLeader?.color || '#6f8fd8')
const locationColor = computed(() => gameStore.selectedLocation?.color || '#6f8fd8')
const siteColor = computed(() => gameStore.selectedSite?.color || '#6f8fd8')

const isLocationEvent = computed(() => {
  return gameStore.isLocationMode && gameStore.currentCard && 'title' in gameStore.currentCard
})

const isSiteEvent = computed(() => {
  return gameStore.isSiteMode && gameStore.currentCard && 'title' in gameStore.currentCard
})

const gameColor = computed(() => {
  if (gameStore.isSiteMode) return siteColor.value
  if (gameStore.isLocationMode) return locationColor.value
  return leaderColor.value
})

const currentEventTitle = computed(() => {
  if (isSiteEvent.value && gameStore.currentCard) {
    return (gameStore.currentCard as HistoricalSiteEvent).title
  }
  if (isLocationEvent.value && gameStore.currentCard) {
    return (gameStore.currentCard as LocationEvent).title
  }
  return ''
})

const currentEventProtagonist = computed(() => {
  if (isSiteEvent.value && gameStore.currentCard) {
    return (gameStore.currentCard as HistoricalSiteEvent).protagonist
  }
  if (isLocationEvent.value && gameStore.currentCard) {
    return (gameStore.currentCard as LocationEvent).protagonist
  }
  if (gameStore.currentCard && 'character' in gameStore.currentCard) {
    return (gameStore.currentCard as TimelineEvent | SideEvent).character
  }
  return ''
})

const currentEventRole = computed(() => {
  if (isSiteEvent.value && gameStore.currentCard) {
    return (gameStore.currentCard as HistoricalSiteEvent).protagonistRole
  }
  if (isLocationEvent.value && gameStore.currentCard) {
    return (gameStore.currentCard as LocationEvent).protagonistRole
  }
  if (gameStore.currentCard && 'faction' in gameStore.currentCard) {
    return (gameStore.currentCard as TimelineEvent | SideEvent).faction || ''
  }
  return ''
})

const currentSiteName = computed(() => {
  return gameStore.selectedSite?.name || ''
})

const leaderEventCard = computed(() => {
  if (!gameStore.currentCard || isSiteEvent.value || isLocationEvent.value) return null
  const card = gameStore.currentCard as TimelineEvent | SideEvent
  return {
    character: card.character,
    faction: card.faction,
    description: card.description,
    leftLabel: card.choices[0].label,
    rightLabel: card.choices[1].label,
  }
})

onMounted(() => {
  const siteId = route.params.site as string
  const locationId = route.params.location as string
  const leaderId = route.params.leader as string

  if (siteId) {
    gameStore.startSiteRun(siteId)
  } else if (locationId) {
    gameStore.startLocationRun(locationId, leaderId)
  } else if (leaderId) {
    gameStore.startNewRun(leaderId)
  }
})

function handlePointerDown(e: PointerEvent | TouchEvent) {
  if (gameStore.isGameOver) return
  isDragging.value = true
  dragStartX.value = 'touches' in e ? e.touches[0].clientX : e.clientX
  document.addEventListener('pointermove', handlePointerMove)
  document.addEventListener('pointerup', handlePointerUp)
  document.addEventListener('touchmove', handlePointerMove)
  document.addEventListener('touchend', handlePointerUp)
}

function handlePointerMove(e: PointerEvent | TouchEvent) {
  if (!isDragging.value) return
  const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX
  dragDistance.value = currentX - dragStartX.value

  if (dragDistance.value < -30) {
    dragDirection.value = 'left'
  } else if (dragDistance.value > 30) {
    dragDirection.value = 'right'
  } else {
    dragDirection.value = null
  }
}

function handlePointerUp() {
  if (!isDragging.value) return

  audioManager.stop()

  const distance = Math.abs(dragDistance.value)
  if (distance >= SWIPE_THRESHOLD && dragDirection.value) {
    if (gameStore.isSiteMode) {
      gameStore.applySiteChoice(dragDirection.value)
    } else if (gameStore.isLocationMode) {
      gameStore.applyLocationChoice(dragDirection.value)
    } else {
      gameStore.applyChoice(dragDirection.value)
    }
  }

  isDragging.value = false
  dragDistance.value = 0
  dragDirection.value = null

  document.removeEventListener('pointermove', handlePointerMove)
  document.removeEventListener('pointerup', handlePointerUp)
  document.removeEventListener('touchmove', handlePointerMove)
  document.removeEventListener('touchend', handlePointerUp)
}

function goHome() {
  audioManager.stop()
  gameStore.resetToHome()
  router.push({ name: 'home' })
}

function restartGame() {
  audioManager.stop()
  if (gameStore.isSiteMode && gameStore.selectedSite) {
    gameStore.startSiteRun(gameStore.selectedSite.id)
  } else if (gameStore.selectedLeader) {
    gameStore.resetRun()
  }
}

watch(() => gameStore.isGameOver, (isOver) => {
  if (isOver) {
    isDragging.value = false
    dragDistance.value = 0
    dragDirection.value = null
  }
})
</script>

<template>
  <main class="page-shell">
    <header class="game-header">
      <button class="back-button" @click="goHome">← 返回</button>
      <div class="game-title">
        <template v-if="gameStore.isSiteMode">
          <span class="game-title__leader">{{ gameStore.selectedSite?.name }}</span>
          <span class="game-title__faction">{{ currentEventTitle }}</span>
        </template>
        <template v-else-if="gameStore.isLocationMode">
          <span class="game-title__leader">{{ gameStore.selectedLocation?.name }}</span>
          <span class="game-title__faction">{{ currentEventTitle }}</span>
        </template>
        <template v-else>
          <span class="game-title__leader">{{ gameStore.selectedLeader?.name }}</span>
          <span class="game-title__faction">{{ gameStore.selectedLeader?.faction }}</span>
        </template>
      </div>
      <div class="game-year">
        <template v-if="gameStore.isSiteMode || gameStore.isLocationMode">
          {{ currentEventProtagonist }} · {{ currentEventRole }} · {{ gameStore.currentYear }}年
        </template>
        <template v-else>
          在位 {{ gameStore.turnCount }} 年 / 当前 {{ gameStore.currentYear }} 年
        </template>
      </div>
    </header>

    <section class="stats-panel">
      <div
        v-for="stat in filteredStats"
        :key="stat.key"
        class="stat-bar"
        :class="{
          'stat-bar--increase': isDragging && statChanges?.[stat.key] === 'increase',
          'stat-bar--decrease': isDragging && statChanges?.[stat.key] === 'decrease',
        }"
      >
        <div class="stat-bar__label">{{ stat.label }}</div>
        <div class="stat-bar__track">
          <div
            class="stat-bar__fill"
            :style="{
              width: `${stat.value}%`,
              backgroundColor: stat.value >= 80 || stat.value <= 20 ? '#c95f56' : gameColor,
            }"
          ></div>
          <span class="stat-bar__value">{{ stat.value }}</span>
        </div>
      </div>
    </section>

    <section
      v-if="!gameStore.isGameOver && gameStore.currentCard"
      class="card-section"
    >
      <div
        ref="cardRef"
        class="card-wrapper"
        :style="{
          transform: `translateX(${dragDistance}px) rotate(${dragDistance * 0.02}deg)`,
        }"
        @pointerdown="handlePointerDown"
        @touchstart="handlePointerDown"
      >
        <EventCard
          v-if="leaderEventCard"
          :character="leaderEventCard.character"
          :faction="leaderEventCard.faction"
          :description="leaderEventCard.description"
          :left-label="leaderEventCard.leftLabel"
          :right-label="leaderEventCard.rightLabel"
          :is-dragging="isDragging"
          :drag-direction="dragDirection"
          :leader-color="gameColor"
          :character-img="getCharacterVisual(leaderEventCard.character).image"
        />

        <div
          v-else-if="gameStore.currentCard && (isSiteEvent || isLocationEvent)"
          class="location-event-card"
          :style="{ '--event-color': gameColor }"
        >
          <div class="location-event-card__header">
            <div class="location-event-card__protagonist">
              <span class="protagonist-name">{{ currentEventProtagonist }}</span>
              <span class="protagonist-role">{{ currentEventRole }}</span>
            </div>
            <div class="location-event-card__location">
              {{ gameStore.isSiteMode ? currentSiteName : gameStore.selectedLocation?.name }} · {{ gameStore.currentYear }}年
            </div>
          </div>
          <div class="location-event-card__portrait">
            <div class="portrait-placeholder">
              {{ currentEventProtagonist[0] }}
            </div>
          </div>
          <div class="location-event-card__description">
            {{ gameStore.currentCard.description }}
          </div>
          <div class="location-event-card__choices">
            <div
              class="choice choice--left"
              :class="{ 'choice--active': dragDirection === 'left' }"
            >
              <span class="choice__label">{{ gameStore.currentCard.choices[0].label }}</span>
              <div class="choice__effects">
                <span v-if="gameStore.currentCard.choices[0].effects.heaven !== undefined" :class="{ positive: gameStore.currentCard.choices[0].effects.heaven > 0 }">
                  {{ gameStore.currentCard.choices[0].effects.heaven > 0 ? '+' : '' }}{{ gameStore.currentCard.choices[0].effects.heaven }} 天意
                </span>
                <span v-if="gameStore.currentCard.choices[0].effects.politics !== undefined" :class="{ positive: gameStore.currentCard.choices[0].effects.politics > 0 }">
                  {{ gameStore.currentCard.choices[0].effects.politics > 0 ? '+' : '' }}{{ gameStore.currentCard.choices[0].effects.politics }} 权谋
                </span>
                <span v-if="gameStore.currentCard.choices[0].effects.military !== undefined" :class="{ positive: gameStore.currentCard.choices[0].effects.military > 0 }">
                  {{ gameStore.currentCard.choices[0].effects.military > 0 ? '+' : '' }}{{ gameStore.currentCard.choices[0].effects.military }} 兵力
                </span>
                <span v-if="gameStore.currentCard.choices[0].effects.provisions !== undefined" :class="{ positive: gameStore.currentCard.choices[0].effects.provisions > 0 }">
                  {{ gameStore.currentCard.choices[0].effects.provisions > 0 ? '+' : '' }}{{ gameStore.currentCard.choices[0].effects.provisions }} 粮草
                </span>
              </div>
            </div>
            <div
              class="choice choice--right"
              :class="{ 'choice--active': dragDirection === 'right' }"
            >
              <span class="choice__label">{{ gameStore.currentCard.choices[1].label }}</span>
              <div class="choice__effects">
                <span v-if="gameStore.currentCard.choices[1].effects.heaven !== undefined" :class="{ positive: gameStore.currentCard.choices[1].effects.heaven > 0 }">
                  {{ gameStore.currentCard.choices[1].effects.heaven > 0 ? '+' : '' }}{{ gameStore.currentCard.choices[1].effects.heaven }} 天意
                </span>
                <span v-if="gameStore.currentCard.choices[1].effects.politics !== undefined" :class="{ positive: gameStore.currentCard.choices[1].effects.politics > 0 }">
                  {{ gameStore.currentCard.choices[1].effects.politics > 0 ? '+' : '' }}{{ gameStore.currentCard.choices[1].effects.politics }} 权谋
                </span>
                <span v-if="gameStore.currentCard.choices[1].effects.military !== undefined" :class="{ positive: gameStore.currentCard.choices[1].effects.military > 0 }">
                  {{ gameStore.currentCard.choices[1].effects.military > 0 ? '+' : '' }}{{ gameStore.currentCard.choices[1].effects.military }} 兵力
                </span>
                <span v-if="gameStore.currentCard.choices[1].effects.provisions !== undefined" :class="{ positive: gameStore.currentCard.choices[1].effects.provisions > 0 }">
                  {{ gameStore.currentCard.choices[1].effects.provisions > 0 ? '+' : '' }}{{ gameStore.currentCard.choices[1].effects.provisions }} 粮草
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="swipe-hint">← 左右滑动选择 →</p>
    </section>

    <section v-else-if="gameStore.isGameOver && gameStore.ending" class="ending-section">
      <div class="ending-card">
        <h2 class="ending-card__title">{{ gameStore.ending.title }}</h2>
        <p class="ending-card__description">{{ gameStore.ending.description }}</p>
        <div class="ending-card__stats">
          <p>存活年数：{{ gameStore.turnCount }} 年</p>
          <p v-if="gameStore.ending.category === 'special'">剧本结局</p>
          <p v-else>结局原因：{{ getEndingCauseLabel(gameStore.ending.cause) }}{{ gameStore.ending.isHigh ? '达成极致' : '耗尽' }}</p>
        </div>
        <div class="ending-card__actions">
          <button class="button button--primary" @click="restartGame">再来一局</button>
          <button class="button button--ghost" @click="goHome">重新选择遗址</button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.page-shell {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  padding: clamp(0.6rem, 1.8vw, 1.2rem);
}

.game-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 52rem;
  margin: 0 auto clamp(0.8rem, 2vw, 1.2rem);
}

.back-button {
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border);
  color: var(--muted);
  cursor: pointer;
  font-size: clamp(0.72rem, 1.3vw, 0.88rem);
  transition: background 0.2s ease;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.12);
}

.game-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
}

.game-title__leader {
  font-size: clamp(1.2rem, 2.8vw, 1.7rem);
  font-weight: bold;
  color: var(--text);
}

.game-title__faction {
  font-size: clamp(0.62rem, 1.1vw, 0.78rem);
  color: var(--leader-color, var(--gold));
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.game-year {
  font-size: clamp(0.72rem, 1.3vw, 0.88rem);
  color: var(--muted);
}

.stats-panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(0.5rem, 1.4vw, 0.9rem);
  width: 100%;
  max-width: 52rem;
  margin: 0 auto clamp(1rem, 2.5vw, 1.5rem);
}

.stat-bar {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: background-color 0.2s ease, border-radius 0.2s ease;
}

.stat-bar--increase {
  background-color: rgba(74, 147, 112, 0.2);
  border-radius: 0.5rem;
  padding: 0.15rem 0.25rem;
}

.stat-bar--decrease {
  background-color: rgba(201, 95, 86, 0.2);
  border-radius: 0.5rem;
  padding: 0.15rem 0.25rem;
}

.stat-bar__label {
  font-size: clamp(0.62rem, 1vw, 0.78rem);
  color: var(--muted);
  text-align: center;
}

.stat-bar__track {
  position: relative;
  height: 0.5rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  overflow: hidden;
}

.stat-bar__fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.3s ease, background-color 0.3s ease;
}

.stat-bar__value {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: clamp(0.58rem, 1vw, 0.68rem);
  color: var(--muted);
  padding-right: 0.35rem;
}

.card-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(0.8rem, 2vw, 1.2rem);
}

.card-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
}

.swipe-hint {
  font-size: clamp(0.72rem, 1.3vw, 0.88rem);
  color: var(--muted);
}

.ending-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ending-card {
  width: 100%;
  max-width: 34rem;
  padding: clamp(1.4rem, 3vw, 2rem);
  background: linear-gradient(
    165deg,
    rgba(33, 39, 55, 0.96),
    rgba(10, 14, 22, 0.92)
  );
  border: 1px solid var(--border);
  border-radius: clamp(1.1rem, 2.8vw, 1.7rem);
  text-align: center;
}

.ending-card__title {
  margin: 0 0 0.8rem;
  font-size: clamp(1.4rem, 3.2vw, 2rem);
  color: var(--leader-color);
}

.ending-card__description {
  margin: 0 0 1.2rem;
  font-size: clamp(0.92rem, 1.9vw, 1.08rem);
  line-height: 1.8;
  color: var(--muted);
}

.ending-card__stats {
  margin-bottom: clamp(1rem, 2.2vw, 1.6rem);
  padding: 0.8rem;
  border-radius: 0.7rem;
  background: rgba(255, 255, 255, 0.04);
}

.ending-card__stats p {
  margin: 0 0 0.4rem;
  font-size: clamp(0.82rem, 1.4vw, 0.95rem);
  color: var(--text);
}

.ending-card__stats p:last-child {
  margin-bottom: 0;
}

.ending-card__actions {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.button {
  display: inline-block;
  padding: 0.7rem 1.5rem;
  border-radius: 999px;
  font-size: clamp(0.82rem, 1.4vw, 1rem);
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.button--primary {
  background: var(--leader-color);
  color: #fff;
  border: none;
}

.button--primary:hover {
  opacity: 0.85;
}

.button--ghost {
  background: transparent;
  color: var(--muted);
  border: 1px solid var(--border);
}

.button--ghost:hover {
  background: rgba(255, 255, 255, 0.06);
  color: var(--text);
}

@media (max-width: 36rem) {
  .stats-panel {
    grid-template-columns: repeat(2, 1fr);
  }

  .event-card__choices {
    flex-direction: column;
  }

  .swipe-indicator {
    display: none;
  }
}

.location-event-card {
  width: 100%;
  max-width: 36rem;
  padding: clamp(1.6rem, 3.2vw, 2.4rem);
  background: linear-gradient(
    165deg,
    rgba(33, 39, 55, 0.96),
    rgba(10, 14, 22, 0.92)
  );
  border: 2px solid var(--event-color);
  border-radius: clamp(1.2rem, 2.8vw, 1.8rem);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}

.location-event-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.6rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.location-event-card__protagonist {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.protagonist-name {
  font-size: clamp(1.4rem, 3vw, 1.8rem);
  font-weight: 700;
  color: var(--text);
}

.protagonist-role {
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  color: var(--event-color);
  font-weight: 500;
}

.location-event-card__location {
  font-size: clamp(0.82rem, 1.3vw, 0.95rem);
  color: var(--muted);
  padding: 0.4rem 0.8rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 0.5rem;
}

.location-event-card__portrait {
  display: flex;
  justify-content: center;
  margin-bottom: 1.6rem;
}

.portrait-placeholder {
  width: clamp(6rem, 12vw, 8rem);
  height: clamp(6rem, 12vw, 8rem);
  border-radius: 50%;
  background: linear-gradient(135deg, var(--event-color), rgba(0, 0, 0, 0.3));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  color: var(--text);
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.3),
    0 0 0 4px rgba(255, 255, 255, 0.1);
}

.location-event-card__description {
  font-size: clamp(0.92rem, 1.8vw, 1.08rem);
  line-height: 1.8;
  color: var(--muted);
  text-align: center;
  margin-bottom: 1.6rem;
  padding: 1.2rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.location-event-card__choices {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
}

.choice {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.8rem;
  transition: all 0.3s ease;
}

.choice--left {
  text-align: left;
}

.choice--right {
  text-align: right;
}

.choice--active {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--event-color);
  transform: scale(1.02);
}

.choice__label {
  font-size: clamp(0.9rem, 1.6vw, 1.05rem);
  font-weight: 600;
  color: var(--text);
  line-height: 1.5;
}

.choice__effects {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  font-size: clamp(0.78rem, 1.2vw, 0.88rem);
  color: var(--muted);
}

.choice__effects span.positive {
  color: #4a9370;
}

@media (max-width: 600px) {
  .location-event-card__choices {
    grid-template-columns: 1fr;
  }

  .choice--left,
  .choice--right {
    text-align: left;
  }
}
</style>
