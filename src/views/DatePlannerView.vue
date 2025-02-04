<script setup lang="ts">
import ButtonComponent from '@/components/Button/ButtonComponent.vue'
import type { IButtonProtocol } from '@/components/Button/ButtonInterface'
import CardComponent from '@/components/Card/CardComponent.vue'
import { goToNextStep } from '@/router'
import { useMessageStore } from '@/stores/message'
import { useSummaryStore } from '@/stores/summary'
import { ref, watch } from 'vue'

export interface IDateOption {
  key: string
  label: string
}

const doneButtonProtocol = ref<IButtonProtocol>({
  text: 'Listo',
  color: 'outline',
  disabled: true,
  loading: false,
})

const dateOptions = ref<IDateOption[]>([
  { key: 'Ir', label: 'Ir a comer 🍽' },
  { key: 'Br', label: 'Brunch 🥐' },
  { key: 'Ro', label: 'Road trip 🏎️' },
  { key: 'De', label: 'Delis 🤪' },
  { key: 'Ot', label: 'Otro' },
])

const defaultOption = ref<IDateOption>(
  dateOptions.value.find((option) => option.key === 'De') ?? {
    key: 'De',
    label: 'Delis 🤪',
  },
)

const isOtherOptionSelected = ref<boolean>(false)
const otherOption = ref<string>('')

const selectedOption = ref<IDateOption[]>([defaultOption.value])

watch([selectedOption, otherOption], ([newSelectedVal, newOtherOptionVal]) => {
  const hasTwoOptions = newSelectedVal.length >= 2
  isOtherOptionSelected.value = newSelectedVal.some((opt) => opt.key === 'Ot')
  const isOtherOptionValid = newOtherOptionVal.trim().length >= 3

  /**
   * Up to two options can be chosen
   */
  if (newSelectedVal.length > 2) {
    selectedOption.value = [defaultOption.value, newSelectedVal[newSelectedVal.length - 1]]
  }

  /**
   * Clear `otherOption` if is not selected
   */
  isOtherOptionSelected.value = newSelectedVal.some((opt) => opt.key === 'Ot')
  if (!isOtherOptionSelected.value) {
    otherOption.value = ''
  }

  /**
   * Enabling / Disabling submit button
   *
   * At least two option need to be selected, without the 'other' option selected OR
   * Is the 'other' option selected and it has at least 3 characters
   */
  const isOtherValid = isOtherOptionSelected.value && isOtherOptionValid
  const hasEnoughOptions = hasTwoOptions && !isOtherOptionSelected.value

  doneButtonProtocol.value.disabled = !(isOtherValid || hasEnoughOptions)
})

const messageStore = useMessageStore()
const summaryStore = useSummaryStore()

const submit = () => {
  disableBtn()

  const result = getResultOptions()
  summaryStore.setDateResult(result)

  setTimeout(() => {
    doneButtonProtocol.value.loading = false
    setTimeout(() => goToNextStep('/summary'), 1000)
  }, 3000)

  updateMessage()
}

function getResultOptions(): IDateOption[] {
  return selectedOption.value.map((option) =>
    option.key === 'Ot' && otherOption.value.trim()
      ? { key: 'Cu', label: otherOption.value }
      : option,
  )
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
          <div v-if="isOtherOptionSelected">
            <input
              v-model="otherOption"
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
