import type { IMessageProps, IMessageSeverity } from '@/components/Message/MessageInterface'
import { defineStore } from 'pinia'

export type proposalAnswer = 'yes' | 'no'

interface State {
  messages: IMessageProps[]
}

export const useMessageStore = defineStore('message', {
  state: (): State => {
    return {
      messages: [],
    }
  },

  actions: {
    getMessage(answer: proposalAnswer): [string, IMessageSeverity] {
      return answer === 'yes'
        ? ['Siuuuuu, yo tambien te amo pedos ricos', 'success']
        : ['vieja loca', 'error']
    },

    setMessageProtocol(message: string, severity: IMessageSeverity) {
      const protocol = {
        protocol: {
          content: message,
          severity: severity,
        },
      }

      this.messages.push(protocol)
      this.removeMessage()
    },

    removeMessage() {
      setTimeout(() => {
        this.messages.pop()
      }, 3000)
    },
  },
})
