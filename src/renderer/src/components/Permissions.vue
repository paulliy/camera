<script setup lang="ts">
const props = defineProps<{
  image: string
}>()
</script>
<template>
  <button type="button" class="perm-button" aria-label="Camera Permissions Button">
    <img :src="image" alt="perm button" />
  </button>
</template>
<style scoped>
.perm-button {
  background-color: transparent;
  border-width: 0px;
  padding: 0;
  cursor: pointer;
  width: 50px;
  height: 60px;
}
.perm-button:hover {
  transition: all 0.2s ease-in-out;
  filter: brightness(0.95);
  transform: scale(1.05);
}
.perm-button:active {
  transition: all 0.1s ease-in-out;
  filter: brightness(0.9);
  transform: scale(1);
}
</style>
