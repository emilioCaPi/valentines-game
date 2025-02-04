<script setup lang="ts">
import { computed } from 'vue'
import type { IMessageProps } from './MessageInterface'

const props = withDefaults(defineProps<IMessageProps>(), {
  protocol: () => ({
    content: '',
  }),
})

const hasMessage = computed((): boolean => {
  return props.protocol.content.length > 0
})

const colorClasses: Record<string, string> = {
  success: 'bg-green-100 border-green-400 text-green-700',
  error: 'bg-red-100 border-red-400 text-red-700',
}

const color = computed(() => colorClasses[props.protocol.severity || ''])
</script>

<template>
  <template v-if="hasMessage">
    <div :class="[color, 'border px-4 py-3 rounded-md']" role="alert">
      <p>{{ props.protocol.content }}</p>
    </div>
  </template>
</template>
