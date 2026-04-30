<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
// 假设这是你的数据源，保持不变
import { historicalSites } from '@/data/historicalSites'

const router = useRouter()

// 1. 初始索引设为 1（即第一个真实的遗址卡片，跳过索引 0 的占位符）
const currentIndex = ref(1) 
const scrollContainer = ref<HTMLElement | null>(null)

// 2. 修正翻页边界：不能进入左右两侧的占位符
const canGoPrev = computed(() => currentIndex.value > 1)
const canGoNext = computed(() => currentIndex.value < visibleSites.value.length - 2)

function selectSite(siteId: string) {
  router.push({ name: 'game', params: { site: siteId } })
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
    const cards = scrollContainer.value.querySelectorAll('.site-card')
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }
}

// 3. 核心修复：基于真实物理距离计算当前高亮的卡片，彻底抛弃死板的宽度除法
function handleScroll() {
  if (!scrollContainer.value) return
  
  const container = scrollContainer.value
  // 计算当前视口(可见区域)的正中心坐标
  const scrollCenter = container.scrollLeft + container.clientWidth / 2
  
  const cards = container.querySelectorAll('.site-card')
  let closestIndex = currentIndex.value
  let minDistance = Infinity
  
  // 遍历所有卡片，找出物理距离中心点最近的那一个
  cards.forEach((card, index) => {
    const cardElement = card as HTMLElement
    // 卡片自身的中心点 = 它离起点的距离 + 自身宽度的一半
    const cardCenter = cardElement.offsetLeft + cardElement.offsetWidth / 2
    const distance = Math.abs(scrollCenter - cardCenter)
    
    if (distance < minDistance) {
      minDistance = distance
      closestIndex = index
    }
  })
  
  // 更新状态，并严防越界进入占位符
  if (closestIndex >= 1 && closestIndex <= visibleSites.value.length - 2) {
    currentIndex.value = closestIndex
  }
}

interface PlaceholderSite {
  id: string
  name: string
  location: string
  era: string
  color: string
  subtitle: string
  protagonists: string[]
  visual?: { pattern: string; emblem: string }
  imageUrl?: string
}

const ancientSitesWithPlaceholders = computed<PlaceholderSite[]>(() => [
  { id: 'placeholder-left', name: '', location: '', era: '', color: 'transparent', subtitle: '', protagonists: [] },
  ...historicalSites.map(site => ({
    ...site,
    visual: site.protagonists.length > 0 ? { pattern: '', emblem: site.protagonists[0][0] } : undefined
  })),
  { id: 'placeholder-right', name: '', location: '', era: '', color: 'transparent', subtitle: '', protagonists: [] },
])

const visibleSites = computed(() => ancientSitesWithPlaceholders.value)

function isPlaceholder(site: typeof ancientSitesWithPlaceholders.value[0]) {
  return site.id.startsWith('placeholder')
}

function getPatternBackground(pattern: string): string {
  const patterns: Record<string, string> = {
    mountain: 'linear-gradient(135deg, #1a1a2e 25%, transparent 25%) -20px 0, linear-gradient(225deg, #1a1a2e 25%, transparent 25%) -20px 0, linear-gradient(315deg, #1a1a2e 25%, transparent 25%), linear-gradient(45deg, #1a1a2e 25%, transparent 25%)',
    gate: 'repeating-linear-gradient(90deg, #2a2a3e 0px, #2a2a3e 10px, #1a1a2e 10px, #1a1a2e 20px)',
    wave: 'repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(100,150,200,0.1) 10px, rgba(100,150,200,0.1) 20px)',
    sword: 'linear-gradient(45deg, transparent 40%, rgba(200,50,50,0.3) 50%, transparent 60%)',
    flower: 'radial-gradient(circle at 30% 30%, rgba(200,100,150,0.2) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(200,100,150,0.2) 0%, transparent 50%)',
    fish: 'conic-gradient(from 0deg at 50% 50%, #1a2a3a 0deg, #2a3a4a 90deg, #1a2a3a 180deg, #2a3a4a 270deg, #1a2a3a 360deg)',
    wall: 'repeating-linear-gradient(0deg, #2a3a4a 0px, #2a3a4a 30px, #1a2a3a 30px, #1a2a3a 35px)',
    bridge: 'repeating-linear-gradient(90deg, #1a1a2e 0px, #1a1a2e 15px, #2a2a3e 15px, #2a2a3e 18px)',
    palace: 'radial-gradient(ellipse at center, rgba(200,180,100,0.15) 0%, transparent 70%)',
  }
  return patterns[pattern] || patterns.mountain
}

// 4. 挂载时，平滑滚动到第一个真实卡片
onMounted(() => {
  setTimeout(() => scrollToCard(1), 100)
})
</script>

<template>
  <main class="page-shell">
    <div class="page-shell__glow page-shell__glow--left"></div>
    <div class="page-shell__glow page-shell__glow--right"></div>

    <header class="site-header">
      <div class="brand-lockup">
        <p class="brand-lockup__eyebrow">千古筑迹 · 历史长河</p>
        <h1>选择你的历史遗址</h1>
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
          v-for="(site, index) in visibleSites"
          :key="site.id"
          class="site-card"
          :class="{ 
            'site-card--active': index === currentIndex,
            'site-card--placeholder': isPlaceholder(site)
          }"
          :style="{
            '--site-color': site.color,
            '--site-primary': site.color,
            '--site-secondary': site.color + '80',
          }"
          @click="!isPlaceholder(site) && selectSite(site.id)"
        >
          <div class="site-card__visual">
            <img 
              v-if="site.imageUrl" 
              :src="site.imageUrl" 
              :alt="site.name"
              class="site-card__image"
            />
            <div 
              v-else-if="site.visual?.pattern" 
              class="site-card__pattern"
              :style="{ background: getPatternBackground(site.visual.pattern) }"
            ></div>
            <span v-else-if="site.visual?.emblem" class="site-card__emblem">{{ site.visual.emblem }}</span>
            <div v-else class="site-card__placeholder-bg"></div>
          </div>
          
          <div v-if="site.name" class="site-card__content">
            <div class="site-card__header">
              <h3 class="site-card__name">{{ site.name }}</h3>
              <p class="site-card__era">{{ site.era }}</p>
            </div>
            <p class="site-card__location">📍 {{ site.location }}</p>
            <p class="site-card__subtitle">{{ site.subtitle }}</p>
            <div class="site-card__protagonists">
              <span class="site-card__protagonist-label">历史人物：</span>
              <span class="site-card__protagonist-names">{{ site.protagonists?.join('、') }}</span>
            </div>
          </div>
          
          <button v-if="site.name" class="site-card__button">
            进入遗址
          </button>
        </article>
      </div>
      
      <button class="carousel-btn carousel-btn--right" @click="goToNext" :disabled="!canGoNext">
        ›
      </button>
    </div>

    <div class="carousel-indicators">
      <button
        v-for="(site, index) in historicalSites"
        :key="site.id"
        class="indicator"
        :class="{ 'indicator--active': index + 1 === currentIndex }"
        @click="currentIndex = index + 1; scrollToCard(index + 1)"
      ></button>
    </div>

    <div class="mode-info">
      <p class="mode-info__text">
        每座遗址都承载着独特的历史故事。<br>
        扮演历史人物，在左右抉择中改变命运。
      </p>
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
  background: url('/img/map.png') center center / cover no-repeat;
}

.page-shell::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(10, 10, 18, 0.85) 0%,
    rgba(18, 18, 26, 0.80) 50%,
    rgba(10, 10, 18, 0.90) 100%
  );
  pointer-events: none;
  z-index: 0;
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
  background: rgba(74, 147, 112, 0.3);
}

.page-shell__glow--right {
  right: -8vw;
  top: 22vh;
  background: rgba(100, 120, 180, 0.24);
}

.site-header {
  width: 100%;
  max-width: 72rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 15vh;
  margin-bottom: clamp(1.5rem, 4vw, 3rem);
  position: relative;
  z-index: 1;
}

.brand-lockup__eyebrow {
  margin: 0 0 0.6vh;
  color: var(--gold, #c9a86c);
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  font-size: clamp(0.72rem, 1.5vw, 0.9rem);
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.brand-lockup h1 {
  margin: 0;
  color: #e8e8f0;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-shadow: 0 2px 20px rgba(100, 150, 200, 0.3);
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  max-width: 90rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 1;
}

/* 添加 relative 确保 offsetLeft 取值精准 */
.carousel-track {
  position: relative;
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding: 1rem 0;
  scrollbar-width: none;
}

.carousel-track::-webkit-scrollbar {
  display: none;
}

.site-card {
  flex: 0 0 300px;
  min-height: 480px;
  background: linear-gradient(145deg, #1a1a24, #12121a);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  scroll-snap-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  position: relative;
}

/* 5. 修复占位符 CSS：自适应宽度算法
   (50% 容器宽度 - 150px 卡片一半宽度) 确保了完美居中 */
.site-card--placeholder {
  opacity: 0;
  pointer-events: none;
  flex: 0 0 calc(50% - 150px);
  min-height: 100px;
  min-width: 10px; /* 防止在极小屏幕上被挤破 */
  border: none;
  box-shadow: none;
}

.site-card--active {
  transform: scale(1.05);
  border-color: var(--site-color);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5),
              0 0 60px color-mix(in srgb, var(--site-color) 30%, transparent);
}

.site-card--active .site-card__visual {
  height: 180px;
}

.site-card:hover:not(.site-card--placeholder) {
  transform: scale(1.02);
  border-color: var(--site-color);
}

.site-card__visual {
  height: 150px;
  background: linear-gradient(135deg, var(--site-primary), var(--site-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: height 0.4s ease;
}

.site-card__visual::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  pointer-events: none;
}

.site-card--dark .site-card__visual {
  background: linear-gradient(135deg, #2a2525, #1a1515);
  box-shadow: inset 0 0 60px rgba(255,255,255,0.05);
}

.site-card--dark .site-card__visual::after {
  background: linear-gradient(135deg, rgba(200,180,150,0.15) 0%, rgba(150,120,100,0.1) 100%);
}

.site-card--gray .site-card__visual {
  background: linear-gradient(135deg, #5a5a5a, #4a4a4a);
  box-shadow: inset 0 0 60px rgba(255,255,255,0.05);
}

.site-card--gray .site-card__visual::after {
  background: linear-gradient(135deg, rgba(180,180,200,0.2) 0%, rgba(120,120,150,0.1) 100%);
}

.site-card__pattern {
  position: absolute;
  inset: 0;
  background-size: 40px 40px;
  opacity: 0.4;
}

.site-card__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
}

.site-card__emblem {
  font-size: 4rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.site-card__placeholder-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--site-primary), var(--site-secondary));
}

.site-card__content {
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.site-card__header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.75rem;
}

.site-card__name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #f0f0f8;
  line-height: 1.3;
}

.site-card__era {
  margin: 0.25rem 0 0;
  font-size: 0.8rem;
  color: var(--site-color);
  font-weight: 500;
}

.site-card__location {
  margin: 0;
  font-size: 0.85rem;
  color: #8888a0;
}

.site-card__subtitle {
  margin: 0;
  font-size: 0.9rem;
  color: #b0b0c0;
  font-style: italic;
}

.site-card__protagonists {
  margin-top: auto;
  font-size: 0.8rem;
  color: #707080;
  line-height: 1.4;
}

.site-card__protagonist-label {
  color: #505060;
}

.site-card__protagonist-names {
  color: var(--site-color);
  font-weight: 500;
}

.site-card__button {
  margin: 0 1.5rem 1.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--site-primary), var(--site-secondary));
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.site-card__button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px color-mix(in srgb, var(--site-color) 40%, transparent);
}

.carousel-btn {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: #a0a0b0;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
  color: #e0e0f0;
  border-color: rgba(255, 255, 255, 0.2);
}

.carousel-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-indicators {
  display: flex;
  gap: 0.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 600px;
  position: relative;
  z-index: 1;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.4);
}

.indicator--active {
  background: var(--gold, #c9a86c);
  width: 24px;
  border-radius: 4px;
}

.mode-info {
  margin-top: 2rem;
  padding: 1.5rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

.mode-info__text {
  margin: 0;
  color: #707080;
  font-size: 0.85rem;
  line-height: 1.6;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .site-card {
    flex: 0 0 260px;
    min-height: 420px;
  }
  
  /* 移动端卡片宽度变为 260px，因此减去的值也要变成 130px */
  .site-card--placeholder {
    flex: 0 0 calc(50% - 130px);
  }
  
  .carousel-btn {
    display: none;
  }
}
</style>