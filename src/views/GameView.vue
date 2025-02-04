<script setup lang="ts">
import ButtonComponent from '@/components/Button/ButtonComponent.vue'
import type { IButtonProtocol } from '@/components/Button/ButtonInterface'
import CardComponent from '@/components/Card/CardComponent.vue'
import router from '@/router'
import { useGameStore, type proposalAnswer } from '@/stores/game'
import { useMessageStore } from '@/stores/message'
import { computed, ref } from 'vue'

// ------------------------- Protocols -------------------------
const previousButtonProtocol = ref<IButtonProtocol>({
  text: '👈🏼',
  color: 'outline',
})

const nextButtonProtocol = ref<IButtonProtocol>({
  text: '👉🏼',
  color: 'outline',
})

const yesButtonProtocol = ref<IButtonProtocol>({
  text: 'Siu',
  color: 'outline',
  disabled: false,
})

const noButtonProtocol = ref<IButtonProtocol>({
  text: 'Nou',
  color: 'outline',
  disabled: false,
})

// ------------------------- Card Props -------------------------
interface IGameCardContent {
  question: string
}

const currentIndex = ref<number>(0)

const cards: IGameCardContent[] = [
  {
    question: '¿Cúal fue tu viaje favorito y por que?',
  },
  {
    question: '¿Cúal fue tu viaje favorito y por que?',
  },
  {
    question: '¿Cúal fue tu viaje favorito y por que?',
  },
  {
    question: '¿Cúal fue tu viaje favorito y por que?',
  },
  {
    question: '¿Cúal fue tu viaje favorito y por que?',
  },
  {
    question: '¿Cúal fue tu viaje favorito y por que?',
  },
  {
    question: '¿Queres ser mi valentines?',
  },
]

const lastCard = computed(() => {
  return currentIndex.value === cards.length - 1
})

const nextCard = () => {
  if (!lastCard.value) {
    currentIndex.value++
  }
}

const previousCard = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

// ------------------------- Form -------------------------
const gameStore = useGameStore()
const messageStore = useMessageStore()

const answerSubmitted = ref<boolean>(false)

const submitAnswer = (answer: proposalAnswer) => {
  if (answer === 'yes') {
    gameStore.step++
    answerSubmitted.value = true

    disableBtn()

    setTimeout(() => {
      yesButtonProtocol.value.loading = false
      router.push('date')
    }, 3000)
  }

  updateMessage(answer)
}

const disableBtn = () => {
  yesButtonProtocol.value.disabled = true
  yesButtonProtocol.value.loading = true
  noButtonProtocol.value.disabled = true
}

/**
 * Get the message based on the response and set it to the protocol
 */
const updateMessage = (answer: proposalAnswer) => {
  const [message, severity] = messageStore.getMessage(answer)
  messageStore.setMessageProtocol(message, severity)
}
</script>

<template>
  <h1>El Juego</h1>

  <div class="card-stack mb-[1rem]">
    <CardComponent
      v-for="(card, index) in cards"
      :key="index"
      :class="{ active: index === currentIndex }"
    >
      <div class="flex flex-col h-full place-content-center">
        <h2>{{ card.question }}</h2>
      </div>
    </CardComponent>
  </div>

  <div class="flex w-100 justify-center space-x-2">
    <template v-if="lastCard">
      <ButtonComponent :protocol="yesButtonProtocol" @click="submitAnswer('yes')"></ButtonComponent>
      <ButtonComponent :protocol="noButtonProtocol" @click="submitAnswer('no')"></ButtonComponent>
    </template>
    <template v-else>
      <ButtonComponent
        :protocol="previousButtonProtocol"
        @click="previousCard"
        :class="[currentIndex === 0 ? 'hidden' : 'block']"
      ></ButtonComponent>
      <ButtonComponent
        :protocol="nextButtonProtocol"
        @click="nextCard"
        :class="[lastCard ? 'hidden' : 'block']"
      ></ButtonComponent>
    </template>
  </div>
</template>
