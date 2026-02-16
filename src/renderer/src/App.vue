<script setup lang="ts">
import { ref } from 'vue'
const bgcolor = ref('var(--photo-bg)')
const camcolor = ref('var(--photo-secondary)')
const bgimg = ref('url(/Dots.svg)')
</script>

<template>
  <main>
    <div class="controls">
      <input type="button" name="button" value="Button" />
    </div>
    <div class="box">
      <img src="/folder.svg" />
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: var(--background);
  --background: v-bind(bgcolor);
  background-image: v-bind(bgimg);
  background-size: 250px;
  width: 100vw;
  height: 100vh;
  align-items: center;
}
.box {
  width: 1280px;
  height: 720px;
  border-radius: 15px;
  position: relative;
  background-color: black;
  max-width: 100%;
  margin: auto;
  border-width: 25px;
  border-style: solid;
  border-color: var(--secondary);
  --secondary: v-bind(camcolor);
}
.controls {
  height: 211px;
  width: 341px;
  margin: auto;
}
</style>
