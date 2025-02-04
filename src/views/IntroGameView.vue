<script setup lang="ts">
import ButtonComponent from '@/components/Button/ButtonComponent.vue'
import type { IButtonProtocol } from '@/components/Button/ButtonInterface'
import { useGameStore } from '@/stores/game'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const gameStore = useGameStore()

const buttonProtocol = ref<IButtonProtocol>({
  text: 'Demole',
})

const gameStarted = ref<boolean>(false)

const startGame = () => {
  gameStarted.value = true
  setTimeout(() => {
    gameStore.step = 1
    router.push('/game')
  }, 1000)
}

/**
 * TODO reset game offscreen to screen animation
 */
</script>

<template>
  <div :class="{ 'box-disappear-animation-hidden': gameStarted }" class="box-disappear-animation">
    <h1 class="mb-[1rem] text-gradient-animation">
      Un pequeño juego para recordar lo especial que es nuestra relación. ¿Listos para jugar?
    </h1>
    <ButtonComponent :protocol="buttonProtocol" @click="startGame" />
  </div>
</template>
