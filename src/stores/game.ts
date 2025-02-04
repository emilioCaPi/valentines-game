import { defineStore } from 'pinia'

enum IStep {
  notStarted = 0,
  gameStart = 1,
  dateStart = 2,
  datePlanStart = 3,
  summary = 4,
}

export type proposalAnswer = 'yes' | 'no'

interface IGame {
  step: IStep
}

export const useGameStore = defineStore('game', {
  state: (): IGame => {
    return {
      step: 0,
    }
  },
})
