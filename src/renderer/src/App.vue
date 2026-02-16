<script setup lang="ts">
import { electron } from 'process'
import { ref } from 'vue'
// true = photo mode & buttons are clicked, false = video mode & buttons arnt clicked
const bgcolor = ref(true)
const camcolor = ref(true)
const bgimg = ref(true)
const butselect = ref(false)
//const primecolor = ref('var(--photo-primary-container)')
async function settings(): Promise<void> {
  const mode: boolean = await window.electron.ipcRenderer.invoke('settings')
}
</script>

<template>
  <main>
    <div class="controls">
      <button type="button" class="icon-button" aria-label="Button" @click="settings">
        <img src="/leftchevronphoto.svg" alt="left chevron" />
      </button>
    </div>
    <div class="box">
      <img src="/folder.svg" />
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: v-bind('bgcolor ? "let(--dark-green)" : "let(--grey-light)"');
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
  align-content: center;
  background-color: aliceblue;
}
.icon-button {
  border-radius: var(--buttonradius);
  --buttonradiun: v-bind(butselect);
  padding: 0;
  cursor: pointer;
  scale: 200%;
}
.icon-button img {
  display: block;
}
</style>
