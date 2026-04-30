<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBuildingById } from '@/data/ancientBuildings'
import { BUILDING_CATEGORY_NAMES, BUILDING_CATEGORY_ICONS } from '@/data/buildingTypes'
import type { AncientBuilding, BuildingEvent, StatEffect } from '@/data/buildingTypes'

const route = useRoute()
const router = useRouter()

const building = ref<AncientBuilding | null>(null)
const currentEventIndex = ref(0)
const isDragging = ref(false)
const dragStartX = ref(0)
const dragDistance = ref(0)
const dragDirection = ref<'left' | 'right' | null>(null)
const showEffects = ref(false)
const gameStats = ref({ heaven: 50, politics: 50, military: 50, provisions: 50 })

const SWIPE_THRESHOLD = 80

const currentEvent = computed<BuildingEvent | null>(() => {
  if (!building.value || currentEventIndex.value >= building.value.events.length) {
    return null
  }
  return building.value.events[currentEventIndex.value]
})

const currentEffects = computed(() => {
  if (!currentEvent.value || !dragDirection.value) return null
  return currentEvent.value.choices.find(c => c.direction === dragDirection.value)?.effects || null
})

const statChanges = computed(() => {
  if (!currentEffects.value) return null
  const changes: { heaven: 'increase' | 'decrease' | null; politics: 'increase' | 'decrease' | null; military: 'increase' | 'decrease' | null; provisions: 'increase' | 'decrease' | null } = {
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

const isGameOver = computed(() => {
  return !building.value || currentEventIndex.value >= building.value.events.length
})

const statLabels: Record<keyof StatEffect, string> = {
  heaven: '天意',
  politics: '权谋',
  military: '兵力',
  provisions: '粮草',
}

onMounted(() => {
  const buildingId = route.params.id as string
  building.value = getBuildingById(buildingId) || null
  resetGame()
})

watch(() => route.params.id, (newId) => {
  if (newId) {
    building.value = getBuildingById(newId as string) || null
    resetGame()
  }
})

function resetGame() {
  currentEventIndex.value = 0
  gameStats.value = { heaven: 50, politics: 50, military: 50, provisions: 50 }
  isDragging.value = false
  dragDistance.value = 0
  dragDirection.value = null
  showEffects.value = false
}

function handlePointerDown(e: PointerEvent | TouchEvent) {
  if (isGameOver.value) return
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

  if (dragDistance.value < -25) {
    dragDirection.value = 'left'
  } else if (dragDistance.value > 25) {
    dragDirection.value = 'right'
  } else {
    dragDirection.value = null
  }
}

function handlePointerUp() {
  if (!isDragging.value) return

  const distance = Math.abs(dragDistance.value)
  if (distance >= SWIPE_THRESHOLD && dragDirection.value && currentEvent.value) {
    applyChoice()
  }

  isDragging.value = false
  dragDistance.value = 0
  dragDirection.value = null

  document.removeEventListener('pointermove', handlePointerMove)
  document.removeEventListener('pointerup', handlePointerUp)
  document.removeEventListener('touchmove', handlePointerMove)
  document.removeEventListener('touchend', handlePointerUp)
}

function applyChoice() {
  if (!currentEffects.value || !currentEvent.value) return

  const effects = currentEffects.value

  // 应用效果
  if (effects.heaven !== undefined) {
    gameStats.value.heaven = Math.max(0, Math.min(100, gameStats.value.heaven + effects.heaven))
  }
  if (effects.politics !== undefined) {
    gameStats.value.politics = Math.max(0, Math.min(100, gameStats.value.politics + effects.politics))
  }
  if (effects.military !== undefined) {
    gameStats.value.military = Math.max(0, Math.min(100, gameStats.value.military + effects.military))
  }
  if (effects.provisions !== undefined) {
    gameStats.value.provisions = Math.max(0, Math.min(100, gameStats.value.provisions + effects.provisions))
  }

  showEffects.value = true
  setTimeout(() => {
    showEffects.value = false
    currentEventIndex.value++
  }, 1200)
}

function goBack() {
  router.push({ name: 'inkmap' })
}

function restartGame() {
  resetGame()
}

function goToMap() {
  router.push({ name: 'inkmap' })
}
</script>

<template>
  <main class="building-detail-page" v-if="building">
    <!-- 顶部背景图 -->
    <div class="building-hero" :style="{ '--building-color': building.color }">
      <img
        v-if="building.imageUrl"
        :src="building.imageUrl"
        :alt="building.name"
        class="hero-image"
      />
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <button class="back-btn" @click="goBack">← 返回地图</button>
        <div class="building-info">
          <span class="building-category">
            {{ BUILDING_CATEGORY_ICONS[building.category] }} {{ BUILDING_CATEGORY_NAMES[building.category] }}
          </span>
          <h1 class="building-name">{{ building.name }}</h1>
          <p class="building-location">{{ building.location.province }} · {{ building.location.city }}</p>
          <p class="building-era">{{ building.era }}</p>
        </div>
      </div>
    </div>

    <!-- 建筑信息 -->
    <section class="info-section">
      <div class="info-grid">
        <div class="info-card">
          <h3>建筑简介</h3>
          <p>{{ building.description }}</p>
        </div>
        <div class="info-card">
          <h3>历史意义</h3>
          <p>{{ building.historicalSignificance }}</p>
        </div>
        <div class="info-card">
          <h3>关联人物</h3>
          <div class="figures-list">
            <span v-for="figure in building.associatedFigures" :key="figure" class="figure-tag">
              {{ figure }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- 剧本互动区域 -->
    <section class="scenario-section">
      <div class="scenario-header">
        <h2>📜 剧本体验</h2>
        <p class="scenario-intro">{{ building.scenarioIntro }}</p>
      </div>

      <!-- 状态栏 -->
      <div class="stats-panel">
        <div
          v-for="(value, key) in gameStats"
          :key="key"
          class="stat-bar"
          :class="{
            'stat-bar--increase': showEffects && statChanges?.[key] === 'increase',
            'stat-bar--decrease': showEffects && statChanges?.[key] === 'decrease',
          }"
        >
          <div class="stat-bar__label">{{ statLabels[key] }}</div>
          <div class="stat-bar__track">
            <div
              class="stat-bar__fill"
              :style="{
                width: `${value}%`,
                backgroundColor: value >= 80 || value <= 20 ? '#c95f56' : building.color,
              }"
            ></div>
            <span class="stat-bar__value">{{ value }}</span>
          </div>
        </div>
      </div>

      <!-- 剧本卡片 -->
      <div class="scenario-content" v-if="!isGameOver && currentEvent">
        <div
          class="event-card"
          :style="{ '--event-color': building.color }"
        >
          <div class="event-header">
            <div class="event-protagonist">
              <span class="protagonist-name">{{ currentEvent.protagonist }}</span>
              <span class="protagonist-role">{{ currentEvent.protagonistRole }}</span>
            </div>
            <div class="event-year">{{ currentEvent.year }}年</div>
          </div>

          <div class="event-portrait">
            <div class="portrait-placeholder" :style="{ background: `linear-gradient(135deg, ${building.color}, rgba(0,0,0,0.3))` }">
              {{ currentEvent.protagonist[0] }}
            </div>
          </div>

          <div class="event-title">{{ currentEvent.title }}</div>

          <div class="event-description">
            {{ currentEvent.description }}
          </div>

          <!-- 滑动手势区域 -->
          <div
            class="swipe-area"
            :style="{ transform: `translateX(${dragDistance}px)` }"
            @pointerdown="handlePointerDown"
            @touchstart="handlePointerDown"
          >
            <div
              class="choice choice--left"
              :class="{ 'choice--active': dragDirection === 'left' }"
            >
              <span class="choice-label">{{ currentEvent.choices[0].label }}</span>
              <div class="choice-effects" v-if="dragDirection === 'left' && currentEffects">
                <span v-for="(val, key) in currentEffects" :key="key"
                  :class="{ positive: val !== undefined && val > 0, negative: val !== undefined && val < 0 }">
                  {{ val !== undefined && val > 0 ? '+' : '' }}{{ val }} {{ statLabels[key] }}
                </span>
              </div>
            </div>

            <div class="swipe-hint-text" v-if="!dragDirection">
              <span>← 选择 →</span>
            </div>

            <div
              class="choice choice--right"
              :class="{ 'choice--active': dragDirection === 'right' }"
            >
              <span class="choice-label">{{ currentEvent.choices[1].label }}</span>
              <div class="choice-effects" v-if="dragDirection === 'right' && currentEffects">
                <span v-for="(val, key) in currentEffects" :key="key"
                  :class="{ positive: val !== undefined && val > 0, negative: val !== undefined && val < 0 }">
                  {{ val !== undefined && val > 0 ? '+' : '' }}{{ val }} {{ statLabels[key] }}
                </span>
              </div>
            </div>
          </div>

          <p class="swipe-instruction">← 左右滑动选择 →</p>
        </div>
      </div>

      <!-- 游戏结束 -->
      <div class="game-over" v-else-if="isGameOver">
        <div class="ending-card">
          <h3>剧本体验结束</h3>
          <p>您已完成「{{ building.name }}」的剧本探索</p>
          <div class="final-stats">
            <div class="final-stat" v-for="(value, key) in gameStats" :key="key">
              <span class="final-stat__label">{{ statLabels[key] }}</span>
              <span class="final-stat__value">{{ value }}</span>
            </div>
          </div>
          <div class="ending-actions">
            <button class="btn btn--primary" @click="restartGame">再体验一次</button>
            <button class="btn btn--ghost" @click="goToMap">返回地图</button>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- 建筑不存在 -->
  <main class="not-found" v-else>
    <h1>建筑未找到</h1>
    <button class="btn btn--primary" @click="goToMap">返回地图</button>
  </main>
</template>

<style scoped>
.building-detail-page {
  min-height: 100dvh;
  background: #0d1118;
}

/* ========== 顶部英雄图 ========== */
.building-hero {
  position: relative;
  height: 50vh;
  min-height: 400px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(13, 17, 24, 0.3) 0%,
    rgba(13, 17, 24, 0.7) 50%,
    rgba(13, 17, 24, 0.95) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 2rem;
}

.back-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #f4efe5;
  padding: 0.6rem 1.2rem;
  border-radius: 0.6rem;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.building-info {
  text-align: center;
}

.building-category {
  display: inline-block;
  padding: 0.4rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--building-color);
  border-radius: 2rem;
  font-size: 0.85rem;
  color: var(--building-color);
  margin-bottom: 1rem;
}

.building-name {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 600;
  color: #f4efe5;
  letter-spacing: 0.08em;
}

.building-location {
  margin: 0.5rem 0 0;
  font-size: 1.1rem;
  color: rgba(244, 239, 229, 0.7);
}

.building-era {
  margin: 0.3rem 0 0;
  font-size: 0.9rem;
  color: var(--building-color);
}

/* ========== 信息区域 ========== */
.info-section {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  padding: 1.5rem;
}

.info-card h3 {
  margin: 0 0 1rem;
  font-size: 1rem;
  color: #d2b270;
  letter-spacing: 0.08em;
}

.info-card p {
  margin: 0;
  font-size: 0.95rem;
  color: rgba(244, 239, 229, 0.8);
  line-height: 1.7;
}

.figures-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.figure-tag {
  padding: 0.4rem 0.9rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  font-size: 0.85rem;
  color: rgba(244, 239, 229, 0.7);
}

/* ========== 剧本区域 ========== */
.scenario-section {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.scenario-header {
  text-align: center;
  margin-bottom: 2rem;
}

.scenario-header h2 {
  margin: 0 0 1rem;
  font-size: 1.8rem;
  color: #f4efe5;
}

.scenario-intro {
  margin: 0;
  font-size: 1rem;
  color: rgba(244, 239, 229, 0.7);
  font-style: italic;
}

/* ========== 状态栏 ========== */
.stats-panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-bar {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  transition: all 0.3s ease;
}

.stat-bar--increase {
  background: rgba(74, 147, 112, 0.2);
  border-radius: 0.5rem;
  padding: 0.3rem;
}

.stat-bar--decrease {
  background: rgba(201, 95, 86, 0.2);
  border-radius: 0.5rem;
  padding: 0.3rem;
}

.stat-bar__label {
  font-size: 0.8rem;
  color: rgba(244, 239, 229, 0.6);
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
  transition: width 0.5s ease, background-color 0.5s ease;
}

.stat-bar__value {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.7rem;
  color: rgba(244, 239, 229, 0.5);
  padding-right: 0.3rem;
}

/* ========== 事件卡片 ========== */
.event-card {
  background: linear-gradient(165deg, rgba(33, 39, 55, 0.96), rgba(10, 14, 22, 0.92));
  border: 2px solid var(--event-color);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.event-protagonist {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.protagonist-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #f4efe5;
}

.protagonist-role {
  font-size: 0.9rem;
  color: var(--event-color);
}

.event-year {
  padding: 0.4rem 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  font-size: 0.85rem;
  color: rgba(244, 239, 229, 0.6);
}

.event-portrait {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.portrait-placeholder {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #f4efe5;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.event-title {
  text-align: center;
  font-size: 1.3rem;
  font-weight: 600;
  color: #f4efe5;
  margin-bottom: 1rem;
}

.event-description {
  text-align: center;
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(244, 239, 229, 0.8);
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 0.8rem;
}

/* ========== 滑动选择 ========== */
.swipe-area {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: center;
  transition: transform 0.1s ease;
  touch-action: none;
}

.choice {
  padding: 1.2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.8rem;
  transition: all 0.3s ease;
  text-align: center;
}

.choice--left {
  text-align: left;
}

.choice--right {
  text-align: right;
}

.choice--active {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--event-color);
  transform: scale(1.02);
}

.choice-label {
  display: block;
  font-size: 1rem;
  font-weight: 500;
  color: #f4efe5;
  margin-bottom: 0.5rem;
}

.choice-effects {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  font-size: 0.8rem;
}

.choice-effects span {
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem;
}

.choice-effects span.positive {
  background: rgba(74, 147, 112, 0.2);
  color: #4a9370;
}

.choice-effects span.negative {
  background: rgba(201, 95, 86, 0.2);
  color: #c95f56;
}

.swipe-hint-text {
  padding: 0 1rem;
  font-size: 0.85rem;
  color: rgba(244, 239, 229, 0.4);
  white-space: nowrap;
}

.swipe-instruction {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: rgba(244, 239, 229, 0.4);
}

/* ========== 游戏结束 ========== */
.game-over {
  text-align: center;
  padding: 2rem 0;
}

.ending-card {
  background: linear-gradient(165deg, rgba(33, 39, 55, 0.96), rgba(10, 14, 22, 0.92));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  padding: 2.5rem;
  max-width: 500px;
  margin: 0 auto;
}

.ending-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  color: #f4efe5;
}

.ending-card > p {
  margin: 0 0 1.5rem;
  color: rgba(244, 239, 229, 0.6);
}

.final-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}

.final-stat {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 0.6rem;
}

.final-stat__label {
  font-size: 0.75rem;
  color: rgba(244, 239, 229, 0.5);
}

.final-stat__value {
  font-size: 1.2rem;
  font-weight: 600;
  color: #f4efe5;
}

.ending-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

/* ========== 按钮 ========== */
.btn {
  padding: 0.8rem 1.5rem;
  border-radius: 999px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.btn--primary {
  background: linear-gradient(135deg, #d2b270, #b8962e);
  color: #0d1118;
  border: none;
  font-weight: 600;
}

.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(210, 178, 112, 0.4);
}

.btn--ghost {
  background: transparent;
  color: #f4efe5;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn--ghost:hover {
  background: rgba(255, 255, 255, 0.05);
}

/* ========== 未找到 ========== */
.not-found {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.not-found h1 {
  margin: 0;
  color: #f4efe5;
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .stats-panel {
    grid-template-columns: repeat(2, 1fr);
  }

  .swipe-area {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }

  .choice--left,
  .choice--right {
    text-align: left;
  }

  .swipe-hint-text {
    display: none;
  }

  .final-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .ending-actions {
    flex-direction: column;
  }
}
</style>
