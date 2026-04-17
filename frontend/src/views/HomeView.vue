<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { leaders } from '@/data/leaders'

const router = useRouter()
const currentIndex = ref(1)
const scrollContainer = ref<HTMLElement | null>(null)

const isPlaceholder = (leader: typeof leaders[0]) => leader.id.startsWith('placeholder')
const canGoPrev = computed(() => currentIndex.value > 1)
const canGoNext = computed(() => currentIndex.value < leaders.length - 2)
const realLeaders = computed(() => leaders.filter(l => !l.id.startsWith('placeholder')))

function selectLeader(leaderId: string) {
  if (leaderId.startsWith('placeholder')) return
  router.push({ name: 'game', params: { leader: leaderId } })
}

function goToPrev() {
  if (canGoPrev.value) {
    currentIndex.value--
    scrollToCard(currentIndex.value)
  }
}

function goToNext() {
  if (canGoNext.value) {
    currentIndex.value++
    scrollToCard(currentIndex.value)
  }
}

function scrollToCard(index: number) {
  if (scrollContainer.value) {
    const cards = scrollContainer.value.querySelectorAll('.leader-card')
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }
}

function handleScroll() {
  if (scrollContainer.value) {
    const scrollLeft = scrollContainer.value.scrollLeft
    const cardWidth = 280
    const gap = 24
    
    const newIndex = Math.round(scrollLeft / (cardWidth + gap))
    if (newIndex >= 0 && newIndex < leaders.length) {
      currentIndex.value = newIndex
    }
  }
}

onMounted(() => {
  scrollToCard(1)
})
</script>

<template>
  <main class="page-shell">
    <div class="page-shell__glow page-shell__glow--left"></div>
    <div class="page-shell__glow page-shell__glow--right"></div>

    <header class="site-header">
      <div class="brand-lockup">
        <p class="brand-lockup__eyebrow">建安前夕 · 公元 189 年</p>
        <h1>王权：新三国</h1>
      </div>
    </header>

    <div class="carousel-wrapper">
      <button class="carousel-btn carousel-btn--left" @click="goToPrev" :disabled="!canGoPrev">
        ‹
      </button>
      
      <div 
        ref="scrollContainer"
        class="carousel-track"
        @scroll="handleScroll"
      >
        <article
          v-for="(leader, index) in leaders"
          :key="leader.id"
          class="leader-card"
          :class="{ 
            'leader-card--active': index === currentIndex,
            'leader-card--placeholder': isPlaceholder(leader)
          }"
          :style="{
            '--leader-color': leader.color,
            '--leader-primary': leader.visual.primaryColor,
            '--leader-secondary': leader.visual.secondaryColor,
          }"
          @click="selectLeader(leader.id)"
        >
          <div class="leader-card__visual">
            <img
              v-if="leader.visual.image"
              :src="leader.visual.image"
              :alt="leader.name"
              class="leader-card__img"
            />
            <div v-else-if="leader.visual.emblem" class="leader-card__pattern"></div>
            <span v-if="leader.visual.emblem" class="leader-card__emblem">{{ leader.visual.emblem }}</span>
          </div>
          <div v-if="leader.name" class="leader-card__content">
            <h3 class="leader-card__name">{{ leader.name }}</h3>
            <p class="leader-card__faction">{{ leader.faction }}</p>
            <p class="leader-card__summary">{{ leader.summary }}</p>
          </div>
          <button v-if="leader.name" class="leader-card__button">
            选择此主公
          </button>
        </article>
      </div>
      
      <button class="carousel-btn carousel-btn--right" @click="goToNext" :disabled="!canGoNext">
        ›
      </button>
    </div>

    <div class="carousel-indicators">
      <button 
        v-for="(leader, index) in realLeaders" 
        :key="leader.id"
        class="indicator"
        :class="{ 'indicator--active': index + 1 === currentIndex }"
        @click="currentIndex = index + 1; scrollToCard(index + 1)"
      ></button>
    </div>
  </main>
</template>

<style scoped>
.page-shell {
  position: relative;
  width: 100%;
  min-height: 100dvh;
  padding: clamp(0.8rem, 2vw, 1.6rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
}

.page-shell__glow {
  position: absolute;
  width: 26vw;
  height: 26vw;
  border-radius: 50%;
  filter: blur(2.8vw);
  opacity: 0.32;
  pointer-events: none;
}

.page-shell__glow--left {
  top: -6vh;
  left: -4vw;
  background: rgba(201, 95, 86, 0.3);
}

.page-shell__glow--right {
  right: -8vw;
  top: 22vh;
  background: rgba(74, 147, 112, 0.24);
}

.site-header {
  width: 100%;
  max-width: 72rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 15vh;
  margin-bottom: clamp(1.5rem, 4vw, 3rem);
}

.brand-lockup__eyebrow {
  margin: 0 0 0.6vh;
  color: var(--gold);
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  font-size: clamp(0.72rem, 1.5vw, 0.9rem);
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.brand-lockup h1 {
  margin: 0;
  font-family: 'Source Han Serif SC', 'Noto Serif SC', serif;
  font-size: clamp(1.8rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--text);
  letter-spacing: 0.08em;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  max-width: 680px;
  display: flex;
  align-items: center;
  gap: 0;
}

.carousel-btn {
  position: absolute;
  z-index: 20;
  width: clamp(2.5rem, 6vw, 3.5rem);
  height: clamp(2.5rem, 6vw, 3.5rem);
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: var(--text);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  transform: translateY(-50%);
}

.carousel-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.15);
}

.carousel-btn:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}

.carousel-btn--left {
  left: 0;
}

.carousel-btn--right {
  right: 0;
}

.carousel-track {
  display: flex;
  gap: clamp(1rem, 3vw, 1.5rem);
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 1rem clamp(3rem, 8vw, 5rem);
  width: 100%;
}

.carousel-track::-webkit-scrollbar {
  display: none;
}

.leader-card {
  flex: 0 0 280px;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  background: linear-gradient(165deg, rgba(33, 39, 55, 0.94), rgba(10, 14, 22, 0.88));
  border: 1px solid var(--border);
  border-radius: clamp(1rem, 2.2vw, 1.6rem);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  opacity: 0.5;
  transform: scale(0.85);
}

.leader-card--active {
  opacity: 1;
  transform: scale(1);
  border-color: var(--leader-color);
  box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.4);
}

.leader-card--placeholder {
  opacity: 0;
  pointer-events: none;
  cursor: default;
}

.leader-card:hover {
  opacity: 0.8;
  transform: scale(0.9);
}

.leader-card--active:hover {
  opacity: 1;
  transform: scale(1.02);
}

.leader-card__visual {
  position: relative;
  height: clamp(9rem, 22vw, 14rem);
  background: var(--leader-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.leader-card__pattern {
  position: absolute;
  inset: 0;
  background: var(--leader-secondary);
  opacity: 0.35;
}

.leader-card__pattern::before {
  content: '';
  position: absolute;
  inset: -50%;
  background: repeating-linear-gradient(45deg, transparent, transparent 1.2rem, rgba(255, 255, 255, 0.04) 1.2rem, rgba(255, 255, 255, 0.04) 2.4rem);
}

.leader-card__emblem {
  font-size: clamp(3.5rem, 9vw, 5rem);
  font-weight: bold;
  color: var(--leader-color);
  opacity: 0.9;
  z-index: 1;
  font-family: 'Source Han Serif SC', 'Noto Serif SC', serif;
}

.leader-card__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.leader-card__content {
  padding: clamp(1rem, 2vw, 1.5rem);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}

.leader-card__name {
  margin: 0;
  font-size: clamp(1.3rem, 2.4vw, 1.7rem);
  color: var(--leader-color);
}

.leader-card__faction {
  margin: 0;
  font-size: clamp(0.75rem, 1.3vw, 0.9rem);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.leader-card__summary {
  margin: 0;
  font-size: clamp(0.78rem, 1.2vw, 0.9rem);
  line-height: 1.6;
  color: var(--text);
  opacity: 0.8;
}

.leader-card__button {
  margin: clamp(0.8rem, 1.5vw, 1.2rem);
  padding: clamp(0.6rem, 1.2vw, 0.8rem) clamp(1rem, 2vw, 1.4rem);
  background: transparent;
  border: 1px solid var(--leader-color);
  border-radius: 0.6rem;
  color: var(--leader-color);
  font-size: clamp(0.78rem, 1.3vw, 0.95rem);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.leader-card__button:hover {
  background: var(--leader-color);
  color: var(--bg);
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 1.5rem;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.25);
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  padding: 0;
}

.indicator--active {
  background: var(--gold);
  transform: scale(1.3);
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>