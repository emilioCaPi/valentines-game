<script setup lang="ts"></script>

<template>
  <div class="card">
    <slot name="title"></slot>
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  width: 200px;
  min-height: 300px;
  height: auto;
  display: flex;
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

  &.active {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
