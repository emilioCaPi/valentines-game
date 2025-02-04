<script setup lang="ts">
import ButtonComponent from '@/components/Button/ButtonComponent.vue'
import type { IButtonProtocol } from '@/components/Button/ButtonInterface'
import CardComponent from '@/components/Card/CardComponent.vue'
import router from '@/router'
import { useGameStore } from '@/stores/game'
import { useMessageStore } from '@/stores/message'
import { useSummaryStore } from '@/stores/summary'
import { ref, watch } from 'vue'

export interface IDateOption {
  key: string
  label: string
  value: string
}

const doneButtonProtocol = ref<IButtonProtocol>({
  text: 'Listo',
  color: 'outline',
  disabled: true,
  loading: false,
})

const dateOptions = ref<IDateOption[]>([
  { key: 'Ir', label: 'Ir a comer 🍽', value: 'Ir a comer 🍽' },
  { key: 'Br', label: 'Brunch 🥐', value: 'Brunch 🥐' },
  { key: 'Ro', label: 'Road trip 🏎️', value: 'Road trip 🏎️' },
  { key: 'De', label: 'Delis 🤪', value: 'Delis 🤪' },
  { key: 'Ot', label: 'Otro', value: '' },
])

const defaultOption = ref<IDateOption>(
  dateOptions.value.find((option) => option.key === 'De') ?? {
    key: 'De',
    label: 'Delis 🤪',
    value: 'Delis 🤪',
  },
)

const otherOptionSelected = ref<boolean>(false)
const otherOption = ref<IDateOption>({ key: 'Ot', label: '', value: '' })

const selectedOption = ref<IDateOption[]>([defaultOption.value])

watch(selectedOption, (newVal) => {
  if (newVal.length > 2) {
    selectedOption.value = [defaultOption.value, newVal[newVal.length - 1]]
  }

  otherOptionSelected.value = Boolean(newVal.find((option) => (option.key === 'Ot' ? true : false)))

  /**
   * Enabling / Disabling submit button
   * Default length 1 = 1 < 2 = true = its disabled then
   * Second option check = length 2 = 2 < 2 = false = its not disabled then
   */
  doneButtonProtocol.value.disabled = newVal.length < 2
})

const gameStore = useGameStore()
const messageStore = useMessageStore()
const summaryStore = useSummaryStore()

const submit = () => {
  gameStore.step++

  disableBtn()
  summaryStore.setDateResult(selectedOption.value)

  setTimeout(() => {
    doneButtonProtocol.value.loading = false
    router.push('/summary')
  }, 3000)

  updateMessage()
}

const disableBtn = () => {
  doneButtonProtocol.value.disabled = true
  doneButtonProtocol.value.loading = true
}

const updateMessage = () => {
  messageStore.setMessageProtocol('Wohoooo tenemos una date!', 'success')
}
</script>

<template>
  <h1>La Date</h1>

  <div class="card-stack">
    <CardComponent class="active">
      <div class="flex flex-col place-content-between">
        <h2 class="card-title">¿Que queres hacer?</h2>
        <div class="place-items-start">
          <div v-for="option in dateOptions" :key="option.key">
            <label :class="{ 'pointer-events-none': option.key === defaultOption.key }">
              <input
                type="checkbox"
                :name="option.label"
                :value="option"
                v-model="selectedOption"
              />
              {{ option.label }}
            </label>
          </div>
          <div v-if="otherOptionSelected">
            <input
              v-model="otherOption.label"
              type="text"
              placeholder="Enter other option"
              class="mb-[0.5rem] w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <ButtonComponent
          class="w-full justify-center"
          :protocol="doneButtonProtocol"
          @click="submit"
        ></ButtonComponent>
      </div>
    </CardComponent>
  </div>
</template>
