<script setup lang="ts">
import type { IButtonProps } from '@/components/Button/ButtonInterface'
import { computed } from 'vue'
import SpinnerComponent from '../Spinner/SpinnerComponent.vue'

const props = withDefaults(defineProps<IButtonProps>(), {
  protocol: () => ({
    text: '',
    clicked: false,
    disabled: false,
    color: 'primary',
    spinner: false,
    hidden: false,
  }),
})

const colorClasses: Record<string, string> = {
  primary: 'bg-purple-500 text-white',
  outline:
    'rounded-md border-2 border-solid border-purple-500 px-4 py-2 text-sm font-semibold text-white',
}

const color = computed(() => colorClasses[props.protocol.color || 'primary'])
</script>

<template>
  <button
    v-if="!props.protocol.hidden"
    :class="[
      props.protocol.disabled
        ? 'pointer-events-none'
        : 'duration-300 ease-in hover:scale-125 cursor-pointer',
      color,
    ]"
    class="button-component inline-flex font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:border-gray-400 disabled:pointer-events-none"
    type="button"
    :disabled="props.protocol.disabled"
  >
    <SpinnerComponent v-if="props.protocol.loading" />
    {{ props.protocol.text }}
  </button>
</template>
