<script setup lang="ts">
import ButtonComponent from '@/components/Button/ButtonComponent.vue'
import type { IButtonProtocol } from '@/components/Button/ButtonInterface'
import CardComponent from '@/components/Card/CardComponent.vue'
import { goToNextStep } from '@/router'
import { useMessageStore, type proposalAnswer } from '@/stores/message'
import { computed, ref, watch } from 'vue'

// ------------------------- Protocols -------------------------
const previousButtonProtocol = ref<IButtonProtocol>({
  text: '👈🏼',
  color: 'outline',
  hidden: true,
})

const nextButtonProtocol = ref<IButtonProtocol>({
  text: '👉🏼',
  color: 'outline',
  hidden: false,
})

const yesButtonProtocol = ref<IButtonProtocol>({
  text: 'Siu',
  color: 'outline',
  disabled: false,
  hidden: true,
})

const noButtonProtocol = ref<IButtonProtocol>({
  text: 'Nou',
  color: 'outline',
  disabled: false,
  hidden: true,
})

// ------------------------- Card Props -------------------------
interface IGameCardContent {
  question: string
}

const currentCardIndex = ref<number>(0)

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

const firstCard = computed(() => {
  return currentCardIndex.value === 0
})

const lastCard = computed(() => {
  return currentCardIndex.value === cards.length - 1
})

const nextCard = () => {
  if (!lastCard.value) {
    currentCardIndex.value++
  }
}

const previousCard = () => {
  if (!firstCard.value) {
    currentCardIndex.value--
  }
}

/**
 * Hide prev. button at the first card
 * Hide next button at the last card
 */
watch(currentCardIndex, (newIndex) => {
  const firstCard: boolean = newIndex === 0
  const lastCard: boolean = newIndex === cards.length - 1

  previousButtonProtocol.value.hidden = firstCard || lastCard
  nextButtonProtocol.value.hidden = lastCard

  yesButtonProtocol.value.hidden = !lastCard
  noButtonProtocol.value.hidden = !lastCard
})

// ------------------------- Form -------------------------
const messageStore = useMessageStore()

const answerSubmitted = ref<boolean>(false)

const submitAnswer = (answer: proposalAnswer) => {
  if (answer === 'yes') {
    answerSubmitted.value = true

    disableBtn()

    setTimeout(() => {
      yesButtonProtocol.value.loading = false
      goToNextStep('/date')
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
      :class="{ active: index === currentCardIndex }"
    >
      <div class="flex flex-col place-content-center">
        <h2>{{ card.question }}</h2>
      </div>
    </CardComponent>
  </div>

  <div class="flex w-100 justify-center space-x-2">
    <ButtonComponent :protocol="yesButtonProtocol" @click="submitAnswer('yes')"></ButtonComponent>
    <ButtonComponent :protocol="noButtonProtocol" @click="submitAnswer('no')"></ButtonComponent>

    <ButtonComponent :protocol="previousButtonProtocol" @click="previousCard"></ButtonComponent>
    <ButtonComponent :protocol="nextButtonProtocol" @click="nextCard"></ButtonComponent>
  </div>
</template>
