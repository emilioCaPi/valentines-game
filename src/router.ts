import { createRouter, createWebHistory } from 'vue-router'

import IntroGameView from '@/views/IntroGameView.vue'
import GameView from '@/views/GameView.vue'
import DatePlannerView from './views/DatePlannerView.vue'
import SummaryView from './views/SummaryView.vue'

const basePath: string = '/valentines-game/'

const routes = [
  { path: '/', component: IntroGameView },
  { path: '/game', component: GameView },
  { path: '/date', component: DatePlannerView },
  { path: '/summary', component: SummaryView },
]

const router = createRouter({
  history: createWebHistory(basePath),
  routes,
})

// Restore last visited route on reload
router.beforeEach((to, from, next) => {
  const lastStep = localStorage.getItem('lastStep') || '/'

  // If user tries to skip ahead, they will be redirected back to their last step
  if (to.path !== '/' && to.path !== lastStep) {
    return next(lastStep)
  }

  next()
})

export function goToNextStep(nextStep: string) {
  localStorage.setItem('lastStep', nextStep)
  router.push(nextStep)
}

export default router
