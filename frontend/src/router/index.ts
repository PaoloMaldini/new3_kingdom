import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import GameView from '@/views/GameView.vue'
import { isValidLeaderId } from '@/data/leaders'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/game/:leader',
      name: 'game',
      component: GameView,
      beforeEnter(to, from, next) {
        const leader = to.params.leader as string
        if (!isValidLeaderId(leader)) {
          next({ name: 'home' })
        } else {
          next()
        }
      },
    },
  ],
})