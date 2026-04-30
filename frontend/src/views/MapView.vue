<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { locations } from '@/data/locations'
import type { Location } from '@/data/types'

const router = useRouter()
const selectedLocation = ref<Location | null>(null)
const hoveredLocation = ref<string | null>(null)

const capitals = computed(() => locations.filter(l => l.type === 'capital'))
const battlefields = computed(() => locations.filter(l => l.type === 'battlefield'))
const strategic = computed(() => locations.filter(l => l.type === 'strategic'))

function selectLocation(location: Location) {
  selectedLocation.value = location
  router.push({ name: 'game', params: { location: location.id } })
}

function hoverLocation(locationId: string | null) {
  hoveredLocation.value = locationId
}

function goBack() {
  router.push({ name: 'home' })
}

function getLocationIcon(type: string): string {
  switch (type) {
    case 'capital': return '🏛️'
    case 'battlefield': return '⚔️'
    case 'strategic': return '🎯'
    default: return '📍'
  }
}
</script>

<template>
  <main class="map-page">
    <div class="map-page__glow map-page__glow--left"></div>
    <div class="map-page__glow map-page__glow--right"></div>

    <header class="site-header">
      <button class="back-btn" @click="goBack">← 返回</button>
      <div class="brand-lockup">
        <p class="brand-lockup__eyebrow">天下大势 · 地图</p>
        <h1>千古筑迹</h1>
      </div>
    </header>

    <div class="map-container">
      <div class="map-background">
        <div class="map-grid"></div>
        <div class="map-rivers">
          <div class="river river--yellow"></div>
          <div class="river river--yangtze"></div>
          <div class="river river--han"></div>
        </div>
      </div>

      <div class="locations-layer">
        <div
          v-for="location in locations"
          :key="location.id"
          class="location-marker"
          :class="[
            `location-marker--${location.type}`,
            {
              'location-marker--selected': selectedLocation?.id === location.id,
              'location-marker--hovered': hoveredLocation === location.id
            }
          ]"
          :style="{
            '--loc-x': location.coordinates.x + '%',
            '--loc-y': location.coordinates.y + '%',
            '--loc-color': location.color
          }"
          @click="selectLocation(location)"
          @mouseenter="hoverLocation(location.id)"
          @mouseleave="hoverLocation(null)"
        >
          <div class="location-marker__dot">
            <span class="location-marker__icon">{{ getLocationIcon(location.type) }}</span>
          </div>
          <div class="location-marker__label">{{ location.name }}</div>
        </div>
      </div>

      <div class="map-sidebar">
        <div class="sidebar-section">
          <h3 class="sidebar-title">都城</h3>
          <div
            v-for="location in capitals"
            :key="location.id"
            class="sidebar-card"
            :class="{ 'sidebar-card--active': selectedLocation?.id === location.id }"
            @click="selectLocation(location)"
          >
            <span class="sidebar-card__icon">{{ getLocationIcon(location.type) }}</span>
            <div class="sidebar-card__content">
              <h4 class="sidebar-card__title">{{ location.name }}</h4>
              <p class="sidebar-card__desc">{{ location.description }}</p>
            </div>
          </div>
        </div>

        <div class="sidebar-section">
          <h3 class="sidebar-title">古战场</h3>
          <div
            v-for="location in battlefields"
            :key="location.id"
            class="sidebar-card"
            :class="{ 'sidebar-card--active': selectedLocation?.id === location.id }"
            @click="selectLocation(location)"
          >
            <span class="sidebar-card__icon">{{ getLocationIcon(location.type) }}</span>
            <div class="sidebar-card__content">
              <h4 class="sidebar-card__title">{{ location.name }}</h4>
              <p class="sidebar-card__desc">{{ location.description }}</p>
            </div>
          </div>
        </div>

        <div class="sidebar-section">
          <h3 class="sidebar-title">战略要地</h3>
          <div
            v-for="location in strategic"
            :key="location.id"
            class="sidebar-card"
            :class="{ 'sidebar-card--active': selectedLocation?.id === location.id }"
            @click="selectLocation(location)"
          >
            <span class="sidebar-card__icon">{{ getLocationIcon(location.type) }}</span>
            <div class="sidebar-card__content">
              <h4 class="sidebar-card__title">{{ location.name }}</h4>
              <p class="sidebar-card__desc">{{ location.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="map-legend">
      <div class="legend-item">
        <span class="legend-icon">🏛️</span>
        <span>都城</span>
      </div>
      <div class="legend-item">
        <span class="legend-icon">⚔️</span>
        <span>古战场</span>
      </div>
      <div class="legend-item">
        <span class="legend-icon">🎯</span>
        <span>战略要地</span>
      </div>
    </div>
  </main>
</template>

<style scoped>
.map-page {
  min-height: 100dvh;
  background: linear-gradient(160deg, #0a0e14 0%, #111725 48%, #0d1118 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.map-page__glow {
  position: absolute;
  width: 40vw;
  height: 40vw;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.15;
  pointer-events: none;
}

.map-page__glow--left {
  background: #6f8fd8;
  top: -10%;
  left: -10%;
}

.map-page__glow--right {
  background: #FACD05;
  bottom: -10%;
  right: -10%;
}

.site-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 10;
}

.back-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text);
  padding: 0.8rem 1.6rem;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-4px);
}

.brand-lockup {
  flex: 1;
  text-align: center;
}

.brand-lockup__eyebrow {
  font-size: 0.9rem;
  color: var(--gold);
  margin: 0 0 0.4rem 0;
  letter-spacing: 0.1em;
}

.brand-lockup h1 {
  font-size: 2.4rem;
  font-weight: 600;
  margin: 0;
  background: linear-gradient(135deg, var(--text) 0%, var(--gold) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.map-container {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 2rem;
  position: relative;
  z-index: 10;
  min-height: calc(100dvh - 200px);
}

.map-background {
  position: relative;
  background: rgba(14, 18, 29, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.6rem;
  overflow: hidden;
}

.map-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}

.map-rivers {
  position: absolute;
  inset: 0;
}

.river {
  position: absolute;
  background: rgba(100, 150, 200, 0.2);
  border-radius: 50%;
  filter: blur(8px);
}

.river--yellow {
  width: 60%;
  height: 20px;
  top: 40%;
  left: 20%;
  transform: rotate(-15deg);
}

.river--yangtze {
  width: 70%;
  height: 25px;
  top: 55%;
  left: 15%;
  transform: rotate(10deg);
}

.river--han {
  width: 30%;
  height: 15px;
  top: 45%;
  left: 45%;
  transform: rotate(-20deg);
}

.locations-layer {
  position: absolute;
  inset: 0;
}

.location-marker {
  position: absolute;
  left: var(--loc-x);
  top: var(--loc-y);
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.location-marker__dot {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--loc-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.3),
    0 0 0 4px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
}

.location-marker::before {
  content: '';
  position: absolute;
  inset: -8px;
  border: 2px solid var(--loc-color);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s ease;
}

.location-marker--hovered .location-marker__dot,
.location-marker--selected .location-marker__dot {
  transform: scale(1.2);
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.4),
    0 0 0 6px rgba(255, 255, 255, 0.2);
}

.location-marker--hovered::before,
.location-marker--selected::before {
  opacity: 1;
  animation: pulse 2s ease-in-out infinite;
}

.location-marker__icon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.location-marker__label {
  margin-top: 0.8rem;
  padding: 0.4rem 0.8rem;
  background: rgba(14, 18, 29, 0.9);
  border: 1px solid var(--loc-color);
  border-radius: 0.6rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  text-align: center;
  backdrop-filter: blur(8px);
  opacity: 0;
  transform: translateY(-8px);
  transition: all 0.3s ease;
}

.location-marker--hovered .location-marker__label,
.location-marker--selected .location-marker__label {
  opacity: 1;
  transform: translateY(0);
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.3);
    opacity: 0;
  }
}

.map-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  overflow-y: auto;
  max-height: calc(100dvh - 200px);
  padding-right: 0.8rem;
}

.sidebar-section {
  background: rgba(14, 18, 29, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.2rem;
  padding: 1.6rem;
  backdrop-filter: blur(8px);
}

.sidebar-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--gold);
  margin: 0 0 1.2rem 0;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.sidebar-card {
  display: flex;
  gap: 1.2rem;
  padding: 1.2rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 0.8rem;
  margin-bottom: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sidebar-card:last-child {
  margin-bottom: 0;
}

.sidebar-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateX(4px);
}

.sidebar-card--active {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--gold);
}

.sidebar-card__icon {
  font-size: 1.8rem;
  flex-shrink: 0;
}

.sidebar-card__content {
  flex: 1;
}

.sidebar-card__title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.4rem 0;
  color: var(--text);
}

.sidebar-card__desc {
  font-size: 0.85rem;
  color: var(--muted);
  margin: 0;
  line-height: 1.4;
}

.map-legend {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  display: flex;
  gap: 1.6rem;
  background: rgba(14, 18, 29, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.8rem;
  padding: 1rem 1.6rem;
  backdrop-filter: blur(8px);
  z-index: 20;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.85rem;
  color: var(--muted);
}

.legend-icon {
  font-size: 1.2rem;
}

@media (max-width: 900px) {
  .map-container {
    grid-template-columns: 1fr;
  }

  .map-sidebar {
    display: none;
  }

  .map-legend {
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    justify-content: center;
  }
}
</style>
