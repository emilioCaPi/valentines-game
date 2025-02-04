import { createMemoryHistory, createRouter } from 'vue-router'

import IntroGameView from '@/views/IntroGameView.vue'
import GameView from '@/views/GameView.vue'
import DatePlannerView from './views/DatePlannerView.vue'
import SummaryView from './views/SummaryView.vue'

const routes = [
  { path: '/', component: IntroGameView },
  { path: '/game', component: GameView },
  { path: '/date', component: DatePlannerView },
  { path: '/summary', component: SummaryView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
