<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ancientBuildings, getBuildingsByCategory } from '@/data/ancientBuildings'
import { BUILDING_CATEGORY_NAMES, BUILDING_CATEGORY_ICONS } from '@/data/buildingTypes'
import type { AncientBuilding, BuildingCategory } from '@/data/buildingTypes'

const router = useRouter()
const selectedBuilding = ref<AncientBuilding | null>(null)
const hoveredBuilding = ref<string | null>(null)
const activeCategory = ref<BuildingCategory | 'all'>('all')

// 地图原点位置（用于计算偏移）
const mapCenterX = 50
const mapCenterY = 45

const filteredBuildings = computed(() => {
  if (activeCategory.value === 'all') {
    return ancientBuildings
  }
  return getBuildingsByCategory(activeCategory.value)
})

const categories: Array<{ key: BuildingCategory | 'all'; label: string }> = [
  { key: 'all', label: '全部' },
  { key: 'palace', label: '皇宫' },
  { key: 'government', label: '官府' },
  { key: 'residence', label: '民居' },
  { key: 'bridge', label: '桥梁' },
]

function selectBuilding(building: AncientBuilding) {
  selectedBuilding.value = building
  router.push({ name: 'building', params: { id: building.id } })
}

function hoverBuilding(buildingId: string | null) {
  hoveredBuilding.value = buildingId
}

function goBack() {
  router.push({ name: 'home' })
}

function getCategoryIcon(category: BuildingCategory | 'all'): string {
  if (category === 'all') return '🗺️'
  return BUILDING_CATEGORY_ICONS[category]
}

function getBuildingIcon(building: AncientBuilding): string {
  return BUILDING_CATEGORY_ICONS[building.category]
}

// 计算建筑标记的样式
function getMarkerStyle(building: AncientBuilding) {
  return {
    left: `${building.location.coordinates.x}%`,
    top: `${building.location.coordinates.y}%`,
    '--building-color': building.color,
  }
}

onMounted(() => {
  // 地图淡入效果
  setTimeout(() => {
    document.querySelector('.ink-map')?.classList.add('ink-map--visible')
  }, 100)
})
</script>

<template>
  <main class="ink-map-page">
    <!-- 水墨背景层 -->
    <div class="ink-background">
      <!-- 远山剪影 -->
      <svg class="ink-mountains" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="mountainGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:0.9" />
            <stop offset="100%" style="stop-color:#0d1118;stop-opacity:0.7" />
          </linearGradient>
          <filter id="inkBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>
        <!-- 远山层 -->
        <path class="mountain mountain--far-1" d="M0,350 Q150,200 300,300 T600,280 T900,320 T1200,250 L1200,600 L0,600 Z" fill="url(#mountainGrad1)" />
        <path class="mountain mountain--far-2" d="M0,400 Q200,280 400,350 T700,300 T1000,360 T1200,300 L1200,600 L0,600 Z" fill="#151515" opacity="0.8" />
        <!-- 近山层 -->
        <path class="mountain mountain--near" d="M0,450 Q300,350 500,420 T800,380 T1200,440 L1200,600 L0,600 Z" fill="#1a1a1a" />
        <!-- 墨点装饰 -->
        <circle cx="100" cy="150" r="3" fill="#333" opacity="0.4" />
        <circle cx="250" cy="100" r="2" fill="#333" opacity="0.3" />
        <circle cx="1100" cy="180" r="4" fill="#333" opacity="0.35" />
        <circle cx="950" cy="120" r="2" fill="#333" opacity="0.25" />
      </svg>

      <!-- 水墨纹理叠加 -->
      <div class="ink-texture"></div>

      <!-- 毛笔笔触装饰 -->
      <div class="ink-brush-stroke brush-stroke--1"></div>
      <div class="ink-brush-stroke brush-stroke--2"></div>
    </div>

    <!-- 标题区域 -->
    <header class="ink-header">
      <button class="back-btn" @click="goBack">← 返回</button>
      <div class="brand-lockup">
        <p class="brand-lockup__eyebrow">中华优秀传统文化系列</p>
        <h1>古建筑地图</h1>
      </div>
      <div class="header-spacer"></div>
    </header>

    <!-- 分类筛选 -->
    <nav class="category-nav">
      <button
        v-for="cat in categories"
        :key="cat.key"
        class="category-btn"
        :class="{ 'category-btn--active': activeCategory === cat.key }"
        @click="activeCategory = cat.key"
      >
        <span class="category-btn__icon">{{ getCategoryIcon(cat.key) }}</span>
        <span class="category-btn__label">{{ cat.label }}</span>
      </button>
    </nav>

    <!-- 主地图区域 -->
    <div class="ink-map-container">
      <div class="ink-map">
        <!-- 地图底图 - 水墨风格中国地图轮廓 -->
        <svg class="china-outline" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="landGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#2a2a35;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#1f1f28;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#18181f;stop-opacity:1" />
            </linearGradient>
            <filter id="inkLand">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>

          <!-- 简化的中国地图轮廓 -->
          <path
            class="land-path"
            d="M180,180 L220,150 L280,140 L340,130 L420,120 L500,110 L580,115 L660,130 L720,150 L780,170 L820,200 L850,240 L870,290 L850,340 L820,380 L780,400 L730,410 L680,420 L630,410 L580,390 L530,360 L480,320 L430,280 L380,240 L330,200 L280,180 L230,175 Z"
            fill="url(#landGrad)"
            filter="url(#inkLand)"
          />

          <!-- 水墨晕染边框 -->
          <path
            class="land-border"
            d="M180,180 L220,150 L280,140 L340,130 L420,120 L500,110 L580,115 L660,130 L720,150 L780,170 L820,200 L850,240 L870,290 L850,340 L820,380 L780,400 L730,410 L680,420 L630,410 L580,390 L530,360 L480,320 L430,280 L380,240 L330,200 L280,180 L230,175 Z"
            fill="none"
            stroke="#333"
            stroke-width="1"
            stroke-dasharray="4,4"
            opacity="0.5"
          />
        </svg>

        <!-- 建筑标记层 -->
        <div class="buildings-layer">
          <div
            v-for="building in filteredBuildings"
            :key="building.id"
            class="building-marker"
            :class="{
              'building-marker--hovered': hoveredBuilding === building.id,
              'building-marker--selected': selectedBuilding?.id === building.id,
            }"
            :style="getMarkerStyle(building)"
            @click="selectBuilding(building)"
            @mouseenter="hoverBuilding(building.id)"
            @mouseleave="hoverBuilding(null)"
          >
            <!-- 毛笔点标记 -->
            <div class="marker-dot">
              <span class="marker-icon">{{ getBuildingIcon(building) }}</span>
              <div class="marker-ripple"></div>
            </div>

            <!-- 悬停/选中时显示的信息 -->
            <div class="marker-tooltip">
              <div class="tooltip-header">
                <span class="tooltip-name">{{ building.name }}</span>
                <span class="tooltip-era">{{ building.era }}</span>
              </div>
              <p class="tooltip-location">{{ building.location.province }} · {{ building.location.city }}</p>
              <p class="tooltip-desc">{{ building.description.substring(0, 40) }}...</p>
            </div>
          </div>
        </div>

        <!-- 水墨装饰线条 -->
        <svg class="ink-decorations" viewBox="0 0 1000 600">
          <!-- 水平水墨线 -->
          <path d="M50,100 Q200,95 400,102 T800,98" stroke="#333" stroke-width="0.5" fill="none" opacity="0.4" />
          <path d="M100,500 Q300,495 500,502 T900,498" stroke="#333" stroke-width="0.5" fill="none" opacity="0.3" />

          <!-- 竖直水墨线 -->
          <path d="M100,50 Q95,150 102,250 T98,450" stroke="#333" stroke-width="0.5" fill="none" opacity="0.3" />
          <path d="M900,80 Q895,180 902,280 T898,480" stroke="#333" stroke-width="0.5" fill="none" opacity="0.3" />
        </svg>

        <!-- 右侧建筑列表 -->
        <aside class="buildings-sidebar">
          <h3 class="sidebar-title">建筑一览</h3>
          <div class="sidebar-list">
            <div
              v-for="building in filteredBuildings"
              :key="building.id"
              class="sidebar-item"
              :class="{ 'sidebar-item--active': selectedBuilding?.id === building.id }"
              @click="selectBuilding(building)"
            >
              <span class="sidebar-item__icon">{{ getBuildingIcon(building) }}</span>
              <div class="sidebar-item__content">
                <h4 class="sidebar-item__name">{{ building.name }}</h4>
                <p class="sidebar-item__location">{{ building.location.province }}</p>
              </div>
              <span class="sidebar-item__era">{{ building.era }}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <!-- 图例 -->
    <div class="ink-legend">
      <div class="legend-title">图例</div>
      <div class="legend-items">
        <div class="legend-item">
          <span class="legend-icon">🏠</span>
          <span>民居</span>
        </div>
        <div class="legend-item">
          <span class="legend-icon">🏛️</span>
          <span>官府</span>
        </div>
        <div class="legend-item">
          <span class="legend-icon">⛩️</span>
          <span>皇宫</span>
        </div>
        <div class="legend-item">
          <span class="legend-icon">🌉</span>
          <span>桥梁</span>
        </div>
      </div>
    </div>

    <!-- 底部说明 -->
    <footer class="ink-footer">
      <p>点击地图上的标记进入建筑详情，开启您的古建筑探索之旅</p>
    </footer>
  </main>
</template>

<style scoped>
.ink-map-page {
  min-height: 100dvh;
  background: #0d1118;
  position: relative;
  overflow: hidden;
}

/* ========== 水墨背景 ========== */
.ink-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.ink-mountains {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60%;
  opacity: 0.6;
}

.mountain {
  transition: opacity 0.5s ease;
}

.ink-texture {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 20% 30%, rgba(30, 30, 40, 0.4) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, rgba(25, 25, 35, 0.3) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 50%, rgba(15, 15, 20, 0.2) 0%, transparent 60%);
}

.ink-brush-stroke {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(50, 50, 60, 0.15), transparent);
  height: 1px;
}

.brush-stroke--1 {
  top: 15%;
  left: 5%;
  width: 40%;
  transform: rotate(-2deg);
}

.brush-stroke--2 {
  top: 75%;
  right: 5%;
  width: 30%;
  transform: rotate(1deg);
}

/* ========== 头部 ========== */
.ink-header {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
}

.back-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #f4efe5;
  padding: 0.6rem 1.2rem;
  border-radius: 0.6rem;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-4px);
}

.brand-lockup {
  text-align: center;
}

.brand-lockup__eyebrow {
  margin: 0 0 0.3rem;
  color: #d2b270;
  font-size: 0.85rem;
  letter-spacing: 0.15em;
}

.brand-lockup h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
  color: #f4efe5;
  letter-spacing: 0.1em;
}

.header-spacer {
  width: 100px;
}

/* ========== 分类导航 ========== */
.category-nav {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  padding: 0 2rem 1.5rem;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  color: rgba(244, 239, 229, 0.7);
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.category-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #f4efe5;
}

.category-btn--active {
  background: rgba(210, 178, 112, 0.15);
  border-color: #d2b270;
  color: #d2b270;
}

.category-btn__icon {
  font-size: 1.1rem;
}

/* ========== 地图容器 ========== */
.ink-map-container {
  position: relative;
  z-index: 10;
  padding: 0 2rem;
}

.ink-map {
  position: relative;
  height: calc(100dvh - 280px);
  min-height: 500px;
  background: linear-gradient(180deg, rgba(20, 20, 28, 0.6) 0%, rgba(13, 17, 24, 0.8) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.2rem;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.ink-map--visible {
  opacity: 1;
  transform: translateY(0);
}

/* ========== 中国地图轮廓 ========== */
.china-outline {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.land-path {
  transition: fill 0.3s ease;
}

/* ========== 建筑标记 ========== */
.buildings-layer {
  position: absolute;
  inset: 0;
}

.building-marker {
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 20;
}

.marker-dot {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.marker-icon {
  font-size: 1.5rem;
  z-index: 1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
  transition: transform 0.3s ease;
}

.marker-ripple {
  position: absolute;
  inset: 0;
  border: 2px solid var(--building-color);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s ease;
}

.building-marker:hover .marker-dot,
.building-marker--hovered .marker-dot {
  transform: scale(1.2);
}

.building-marker:hover .marker-ripple,
.building-marker--hovered .marker-ripple {
  opacity: 1;
  animation: inkPulse 2s ease-in-out infinite;
}

.building-marker--selected .marker-dot {
  transform: scale(1.3);
}

.building-marker--selected .marker-ripple {
  opacity: 1;
  animation: inkPulse 1.5s ease-in-out infinite;
}

@keyframes inkPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.5);
    opacity: 0;
  }
}

/* ========== 悬停提示 ========== */
.marker-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  width: 220px;
  padding: 1rem;
  background: rgba(20, 20, 28, 0.95);
  border: 1px solid var(--building-color);
  border-radius: 0.8rem;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
}

.building-marker:hover .marker-tooltip,
.building-marker--hovered .marker-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.tooltip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.tooltip-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #f4efe5;
}

.tooltip-era {
  font-size: 0.75rem;
  color: var(--building-color);
  padding: 0.2rem 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.3rem;
}

.tooltip-location {
  margin: 0 0 0.5rem;
  font-size: 0.8rem;
  color: rgba(244, 239, 229, 0.6);
}

.tooltip-desc {
  margin: 0;
  font-size: 0.8rem;
  color: rgba(244, 239, 229, 0.7);
  line-height: 1.4;
}

/* ========== 装饰线条 ========== */
.ink-decorations {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* ========== 侧边栏 ========== */
.buildings-sidebar {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 240px;
  max-height: calc(100% - 2rem);
  background: rgba(20, 20, 28, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  padding: 1rem;
  overflow-y: auto;
  backdrop-filter: blur(8px);
}

.sidebar-title {
  margin: 0 0 1rem;
  font-size: 0.9rem;
  color: #d2b270;
  letter-spacing: 0.1em;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.7rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid transparent;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sidebar-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.sidebar-item--active {
  background: rgba(210, 178, 112, 0.1);
  border-color: rgba(210, 178, 112, 0.3);
}

.sidebar-item__icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.sidebar-item__content {
  flex: 1;
  min-width: 0;
}

.sidebar-item__name {
  margin: 0;
  font-size: 0.9rem;
  color: #f4efe5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-item__location {
  margin: 0.2rem 0 0;
  font-size: 0.75rem;
  color: rgba(244, 239, 229, 0.5);
}

.sidebar-item__era {
  font-size: 0.7rem;
  color: rgba(244, 239, 229, 0.4);
  flex-shrink: 0;
}

/* ========== 图例 ========== */
.ink-legend {
  position: absolute;
  bottom: 5rem;
  left: 2rem;
  background: rgba(20, 20, 28, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.8rem;
  padding: 0.8rem 1.2rem;
  backdrop-filter: blur(8px);
  z-index: 15;
}

.legend-title {
  font-size: 0.75rem;
  color: rgba(244, 239, 229, 0.5);
  margin-bottom: 0.6rem;
  letter-spacing: 0.1em;
}

.legend-items {
  display: flex;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: rgba(244, 239, 229, 0.7);
}

.legend-icon {
  font-size: 1rem;
}

/* ========== 底部说明 ========== */
.ink-footer {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 1rem;
}

.ink-footer p {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(244, 239, 229, 0.4);
}

/* ========== 响应式 ========== */
@media (max-width: 900px) {
  .buildings-sidebar {
    display: none;
  }

  .ink-header {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .header-spacer {
    display: none;
  }

  .brand-lockup {
    order: -1;
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .category-nav {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .ink-legend {
    bottom: 3rem;
    left: 1rem;
    right: 1rem;
  }

  .legend-items {
    justify-content: center;
  }
}
</style>
