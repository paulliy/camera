<script setup lang="ts">
import { ref, computed } from 'vue'
// true = photo mode & buttons are clicked, false = video mode & buttons arnt clicked
const bgcolor = ref(true)
const camcolor = ref(true)
const bgimg = ref(true)
const butselect = ref(false)
const modeselect = ref(false)
const contcolor = ref(true)
const capturecolor = ref(true)
const captureicon = ref(true)
//const primecolor = ref('var(--photo-primary-container)')
async function mode(): Promise<void> {
  bgcolor.value = !bgcolor.value
  camcolor.value = !camcolor.value
  bgimg.value = !bgimg.value
  contcolor.value = !contcolor.value
  modeselect.value = !modeselect.value
  capturecolor.value = !capturecolor.value
  captureicon.value = !captureicon.value
  // const mode: boolean = await window.electron.ipcRenderer.invoke('settings')
}
const mainBgColor = computed(() => (bgcolor.value ? 'var(--photo-bg)' : 'var(--video-bg)'))
const mainBgImage = computed(() => (bgimg.value ? 'url(/Dots.svg)' : 'url(/Squares.svg)'))
const mainBgImagesize = computed(() => (bgimg.value ? '400px' : '700px'))
const mainCamColor = computed(() =>
  camcolor.value ? 'var(--photo-secondary)' : 'var(--video-secondary)'
)
const mainContanierColor = computed(() =>
  contcolor.value ? 'var(--photo-primary-container)' : 'var(--video-primary-container)'
)
const mainCaptureColor = computed(() =>
  capturecolor.value ? 'var(--photo-primary)' : 'var(--video-primary)'
)
const butborder = computed(() => (butselect.value ? '15px' : '30px'))
const modeborder = computed(() => (modeselect.value ? '15px' : '30px'))
const modetext = computed(() => (modeselect.value ? 'Video' : 'Photo'))
const maincaptureicon = computed(() => (captureicon.value ? '/cameraF.svg' : '/videoF.svg'))
</script>

<template>
  <main>
    <div class="controls">
      <button type="button" class="text-button" aria-label="Mode button" @click="mode">
        {{ modetext }}
      </button>
      <button type="button" class="capture" aria-label="Capture button" @click="">
        <img :src="maincaptureicon" alt="capture button" />
      </button>
      <button type="button" class="icon-button" aria-label="Settings Button" @click="">
        <img src="/rightchevronphoto.svg" alt="left chevron" />
      </button>
    </div>
    <div class="box">
      <img src="/maincamoff.svg" />
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
  display: flex;
  align-items: center;
  justify-content: center;
}
.controls {
  height: 211px;
  width: 100vw;
  margin: auto;
  align-items: center;
  background-color: transparent;
  display: flex;
  flex-direction: horizontal;
  justify-content: center;
  position: relative;
  column-gap: 10px;
}
.icon-button {
  background-color: v-bind(mainContanierColor);
  border-radius: v-bind(butborder);
  padding: 0;
  cursor: pointer;
  width: 50px;
  height: 60px;
}
.icon-button img {
  width: 100%;
  height: 100%;
}
.text-button {
  background-color: v-bind(mainContanierColor);
  border-radius: v-bind(modeborder);
  padding: 0;
  cursor: pointer;
  font-size: 20px;
  width: 130px;
  height: 60px;
  font-family: var(--font-google-sans-flex);
}
.capture {
  background-color: v-bind(mainCaptureColor);
  border-color: v-bind(mainContanierColor);
  border-style: solid;
  border-width: 10px;
  border-radius: 75px;
  cursor: pointer;
  width: 141px;
  height: 141px;
}
</style>
