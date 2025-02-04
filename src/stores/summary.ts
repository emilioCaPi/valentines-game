import type { IDateOption } from '@/views/DatePlannerView.vue'
import { defineStore } from 'pinia'

interface State {
  date: IDateOption[]
}

export const useSummaryStore = defineStore('summary', {
  state: (): State => {
    return {
      date: [],
    }
  },

  actions: {
    setDateResult(result: IDateOption[]) {
      this.date = result
      localStorage.setItem('dateResult', JSON.stringify(this.date))
    },
  },
})
