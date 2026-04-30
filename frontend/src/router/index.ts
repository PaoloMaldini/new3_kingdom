import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import MapView from '@/views/MapView.vue'
import GameView from '@/views/GameView.vue'
import InkMapView from '@/views/InkMapView.vue'
import BuildingDetailView from '@/views/BuildingDetailView.vue'
import { isValidLeaderId } from '@/data/leaders'
import { getLocationById } from '@/data/locations'
import { getBuildingById } from '@/data/ancientBuildings'
import { getSiteById } from '@/data/historicalSites'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
    },
    {
      path: '/inkmap',
      name: 'inkmap',
      component: InkMapView,
    },
    {
      path: '/building/:id',
      name: 'building',
      component: BuildingDetailView,
      beforeEnter(to, from, next) {
        const buildingId = to.params.id as string
        if (!getBuildingById(buildingId)) {
          next({ name: 'inkmap' })
        } else {
          next()
        }
      },
    },
    {
      path: '/site/:site',
      name: 'game',
      component: GameView,
      beforeEnter(to, from, next) {
        const site = to.params.site as string
        if (!getSiteById(site)) {
          next({ name: 'home' })
        } else {
          next()
        }
      },
    },
    {
      path: '/game/:location',
      name: 'game-location',
      component: GameView,
      beforeEnter(to, from, next) {
        const location = to.params.location as string
        if (!getLocationById(location)) {
          next({ name: 'map' })
        } else {
          next()
        }
      },
    },
    {
      path: '/game/:location/:leader',
      name: 'game-with-leader',
      component: GameView,
      beforeEnter(to, from, next) {
        const location = to.params.location as string
        const leader = to.params.leader as string
        if (!getLocationById(location) || !isValidLeaderId(leader)) {
          next({ name: 'map' })
        } else {
          next()
        }
      },
    },
  ],
})
