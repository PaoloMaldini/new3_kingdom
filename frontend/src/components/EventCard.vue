<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  character: string
  faction?: string
  description: string
  leftLabel: string
  rightLabel: string
  isDragging: boolean
  dragDirection: 'left' | 'right' | null
  leaderColor: string
  characterImg?: string
}>()

function getCharacterVisual(character: string) {
  const colors: Record<string, { bg: string; accent: string; emblem: string }> = {
    '董卓': { bg: '#1a1515', accent: '#8b3a3a', emblem: '董' },
    '袁绍': { bg: '#1a1520', accent: '#6f4a8b', emblem: '袁' },
    '荀彧': { bg: '#151a20', accent: '#4a6f8b', emblem: '荀' },
    '关羽': { bg: '#151515', accent: '#8b4a4a', emblem: '羽' },
    '陶谦': { bg: '#1a1a15', accent: '#8b7a4a', emblem: '陶' },
    '诸葛亮': { bg: '#151a1a', accent: '#4a8b6f', emblem: '葛' },
    '孙坚': { bg: '#151a1a', accent: '#4a6f8b', emblem: '孫' },
    '周瑜': { bg: '#1a151a', accent: '#8b4a6f', emblem: '周' },
    '张昭': { bg: '#1a1a15', accent: '#6f8b4a', emblem: '張' },
    '汉献帝': { bg: '#151515', accent: '#d2b270', emblem: '漢' },
    '匈奴单于': { bg: '#1a1515', accent: '#8b6f4a', emblem: '奴' },
    '商贾': { bg: '#151a15', accent: '#6f8b4a', emblem: '商' },
    '儒生': { bg: '#151515', accent: '#4a8b8b', emblem: '儒' },
    '山贼': { bg: '#151515', accent: '#6f4a4a', emblem: '寇' },
    '黄巾余党': { bg: '#1a1515', accent: '#8b7a3a', emblem: '黃' },
    '邢道荣': { bg: '#1a1515', accent: '#8b8b4a', emblem: '邢' },
    '公孙瓒': { bg: '#151a20', accent: '#4a8b6f', emblem: '公' },
    '许褚': { bg: '#151515', accent: '#8b4a4a', emblem: '許' },
    '貂蝉': { bg: '#1a1520', accent: '#8b6f8b', emblem: '貂' },
    '华雄': { bg: '#1a1515', accent: '#8b4a4a', emblem: '華' },
    '孙权': { bg: '#151a15', accent: '#6f8b4a', emblem: '孫' },
    '鲁肃': { bg: '#151515', accent: '#4a6f8b', emblem: '魯' },
    '陈宫': { bg: '#1a1a15', accent: '#8b7a4a', emblem: '陳' },
    '袁术': { bg: '#1a1520', accent: '#6f4a8b', emblem: '袁' },
    '曹操': { bg: '#151515', accent: '#8b3a3a', emblem: '曹' },
    '陆逊': { bg: '#151a20', accent: '#4a6f8b', emblem: '陸' },
    '庞德': { bg: '#151515', accent: '#6f4a6f', emblem: '龐' },
    '刘禅': { bg: '#151515', accent: '#8b6f4a', emblem: '劉' },
    '司马懿': { bg: '#1a1515', accent: '#6f4a8b', emblem: '馬' },
    '吕布': { bg: '#151a15', accent: '#8b4a4a', emblem: '呂' },
    '刘貂蝉': { bg: '#1a1520', accent: '#8b6f8b', emblem: '貂' },
  }
  return colors[character] || { bg: '#151520', accent: '#6f6f8b', emblem: character[0] }
}

const characterVisual = computed(() => getCharacterVisual(props.character))

const emit = defineEmits<{
  (e: 'pointerdown', event: PointerEvent | TouchEvent): void
  (e: 'touchstart', event: TouchEvent): void
}>()

function handlePointerDown(e: PointerEvent | TouchEvent) {
  emit('pointerdown', e)
}

function handleTouchStart(e: TouchEvent) {
  emit('touchstart', e)
}
</script>

<template>
  <div
    class="event-card"
    :class="{
      'event-card--dragging': isDragging,
      'event-card--left': dragDirection === 'left',
      'event-card--right': dragDirection === 'right',
    }"
    :style="{ '--leader-color': leaderColor }"
    @pointerdown="handlePointerDown"
    @touchstart="handleTouchStart"
  >
    <div class="event-card__header">
      <span class="event-card__character">{{ character }}</span>
      <span v-if="faction" class="event-card__faction">{{ faction }}</span>
    </div>

    <div
      class="event-card__portrait"
      :style="{
        '--portrait-bg': characterVisual.bg,
        '--portrait-accent': characterVisual.accent,
      }"
    >
      <img
        v-if="characterImg"
        :src="characterImg"
        :alt="character"
        class="portrait-img"
      />
      <span v-else class="event-card__emblem">{{ characterVisual.emblem }}</span>
    </div>

    <p class="event-card__description">{{ description }}</p>

    <div class="event-card__choices">
      <div class="choice choice--left" :class="{ 'choice--reject': isDragging && dragDirection === 'left' }">
        <span class="choice__indicator">←</span>
        <span class="choice__label">{{ leftLabel }}</span>
      </div>
      <div class="choice choice--right" :class="{ 'choice--accept': isDragging && dragDirection === 'right' }">
        <span class="choice__label">{{ rightLabel }}</span>
        <span class="choice__indicator">→</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-card {
  position: relative;
  width: 100%;
  max-width: 34rem;
  min-height: 24rem;
  padding: clamp(1.2rem, 3vw, 1.8rem);
  background: linear-gradient(
    165deg,
    rgba(33, 39, 55, 0.96),
    rgba(10, 14, 22, 0.92)
  );
  border: 3px solid var(--border);
  border-radius: clamp(1.1rem, 2.8vw, 1.7rem);
  box-shadow: 0 1.4rem 2.8rem rgba(0, 0, 0, 0.28);
  cursor: grab;
  user-select: none;
  transition: transform 0.1s ease, box-shadow 0.2s ease;
}

.event-card--dragging {
  cursor: grabbing;
  border-color: var(--leader-color);
}

.event-card--left {
  border-left: 3px solid #c95f56;
  box-shadow: -0.6rem 0 2rem rgba(201, 95, 86, 0.5), 0 1.4rem 2.8rem rgba(0, 0, 0, 0.28);
}

.event-card--right {
  border-right: 3px solid #4a9370;
  box-shadow: 0.6rem 0 2rem rgba(74, 147, 112, 0.5), 0 1.4rem 2.8rem rgba(0, 0, 0, 0.28);
}

.event-card__header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.8rem;
}

.event-card__character {
  font-size: clamp(1.1rem, 2.3vw, 1.4rem);
  font-weight: bold;
  color: var(--text);
}

.event-card__faction {
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  font-size: clamp(0.62rem, 1vw, 0.75rem);
  color: var(--leader-color);
}

.event-card__portrait {
  width: 100%;
  height: clamp(18rem, 14vw, 8rem);
  margin-bottom: clamp(0.8rem, 2vw, 1.2rem);
  background: var(--portrait-bg);
  border-radius: clamp(0.6rem, 1.5vw, 1rem);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.event-card__portrait::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--portrait-accent);
  opacity: 0.25;
}

.event-card__portrait::after {
  content: '';
  position: absolute;
  inset: -50%;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 0.8rem,
    rgba(255, 255, 255, 0.03) 0.8rem,
    rgba(255, 255, 255, 0.03) 1.6rem
  );
}

.event-card__emblem {
  font-size: clamp(2.5rem, 7vw, 4rem);
  font-weight: bold;
  color: var(--portrait-accent);
  opacity: 0.9;
  z-index: 1;
  font-family: 'Source Han Serif SC', 'Noto Serif SC', serif;
}

.portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.event-card__description {
  margin: 0 0 clamp(1.2rem, 2.5vw, 1.6rem);
  font-size: clamp(0.92rem, 1.9vw, 1.12rem);
  line-height: 1.8;
  color: var(--text);
}

.event-card__choices {
  display: flex;
  justify-content: space-between;
  gap: clamp(0.6rem, 1.5vw, 1rem);
  margin-top: auto;
}

.choice {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 0.8rem;
  border-radius: 0.7rem;
  background: rgba(255, 255, 255, 0.06);
  border: 2px solid transparent;
  box-sizing: border-box;
}

.choice--left {
  justify-content: flex-start;
}

.choice--right {
  justify-content: flex-end;
}

.choice__indicator {
  font-size: 1.1rem;
  color: var(--muted);
}

.choice--reject {
  background: rgba(180, 50, 50, 0.25) !important;
  border: 2px solid #e04545;
}

.choice--accept {
  background: rgba(50, 150, 80, 0.25) !important;
  border: 2px solid #45e070;
}

.choice__label {
  font-size: clamp(0.78rem, 1.3vw, 0.95rem);
  color: var(--text);
}

.choice--reject {
  background: rgba(180, 50, 50, 0.25) !important;
  border: 2px solid #e04545;
}

.choice--accept {
  background: rgba(50, 150, 80, 0.25) !important;
  border: 2px solid #45e070;
}

.choice__label {
  font-size: clamp(0.78rem, 1.3vw, 0.95rem);
  color: var(--text);
}
</style>