<script setup lang="ts">
import { ref, computed } from 'vue'
// true = photo mode & buttons are clicked, false = video mode & buttons arnt clicked
const bgcolor = ref(true)
const camcolor = ref(true)
const bgimg = ref(true)
const butselect = ref(false)
const contcolor = ref(true)
//const primecolor = ref('var(--photo-primary-container)')
async function settings(): Promise<void> {
  bgcolor.value = !bgcolor.value
  camcolor.value = !camcolor.value
  bgimg.value = !bgimg.value
  butselect.value = !butselect.value
  contcolor.value = !contcolor.value
  // const mode: boolean = await window.electron.ipcRenderer.invoke('settings')
}
const mainBgColor = computed(() => (bgcolor.value ? 'var(--photo-bg)' : 'var(--video-bg)'))
const mainBgImage = computed(() => (bgimg.value ? 'url(/Dots.svg)' : 'url(/Squares.svg)'))
const mainBgImagesize = computed(() => (bgimg.value ? '450px' : '750px'))
const mainCamColor = computed(() =>
  camcolor.value ? 'var(--photo-secondary)' : 'var(--video-secondary)'
)
const mainContanierColor = computed(() =>
  contcolor.value ? 'var(--photo-primary-container)' : 'var(--video-primary-container)'
)
const butborder = computed(() => (butselect.value ? '15px' : '30px'))
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
  background-color: v-bind(mainBgColor);
  background-image: v-bind(mainBgImage);
  background-size: v-bind(mainBgImagesize);
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
  border-color: v-bind(mainCamColor);
}
.controls {
  height: 211px;
  width: 341px;
  margin: auto;
  align-content: center;
  background-color: transparent;
}
.icon-button {
  background-color: v-bind(mainContanierColor);
  border-radius: v-bind(butborder);
  /* border-color: transparent; */
  padding: 0;
  cursor: pointer;
  width: 50px;
  height: 60px;
}
.icon-button img {
  display: block;
}
</style>
