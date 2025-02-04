<script setup lang="ts">
import { computed } from 'vue'
import MessageComponent from './components/Message/MessageComponent.vue'
import { useMessageStore } from './stores/message'

// ------------------------- Get Messages -------------------------
const messageStore = useMessageStore()
const messages = computed(() => messageStore.messages)

const hasMessage = computed((): boolean => {
  return messages.value.length > 0
})
</script>

<template>
  <!-- Overflow hidden due to box animation hidden -->
  <main class="flex justify-center h-screen items-center overflow-hidden text-center">
    <div class="flex flex-col justify-center items-center">
      <div v-if="hasMessage" class="space-y-2">
        <template v-for="(message, index) in messages" :key="index">
          <MessageComponent :protocol="message.protocol" />
        </template>
      </div>
      <!-- <ButtonComponent v-if="hideButton" @click="resetGame" :protocol="buttonProtocol" /> -->
      <router-view class="text-center" />
    </div>
  </main>
</template>

<style scoped></style>
