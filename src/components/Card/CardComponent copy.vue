<script setup lang="ts"></script>

<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  width: 200px;
  height: 300px;
  background-color: #07182e;
  border: 1px solid #ddd;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  transition:
    transform 0.3s,
    opacity 0.3s;
  opacity: 0;
  transform: translateY(10px) scale(0.95);
  padding: 2rem;
  text-align: center;

  display: flex;
  flex-direction: column;
  place-items: start;
  place-content: center;

  h2 {
    color: white;
    font-size: 2em;
  }

  &.active {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
