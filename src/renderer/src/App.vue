<script setup lang="ts">
import { ref, computed } from 'vue'
// true = photo mode & buttons are clicked, false = video mode & buttons arnt clicked
const bgcolor = ref(true)
const butselect = ref(false)
async function mode(): Promise<void> {
  //flip all the ui values from photo to video or vice versax`
  bgcolor.value = !bgcolor.value
}
async function reqmicperms(): Promise<void> {
  const micpermsstatus = await window.electron.ipcRenderer.invoke('reqmicperms')
  if (micpermsstatus) {
    console.log('im all good')
  } else {
    console.log('im so not good')
  }
}
async function reqcamperms(): Promise<void> {
  const campermsstatus = await window.electron.ipcRenderer.invoke('reqmicperms')
  if (campermsstatus) {
    console.log('im all good')
  } else {
    console.log('im so not good')
  }
}
const mainBgColor = computed(() => (bgcolor.value ? 'var(--photo-bg)' : 'var(--video-bg)'))
const mainBgImage = computed(() => (bgcolor.value ? 'url(/Dots.svg)' : 'url(/Squares.svg)'))
const mainBgImagesize = computed(() => (bgcolor.value ? '400px' : '700px'))
const mainCamColor = computed(() =>
  bgcolor.value ? 'var(--photo-secondary)' : 'var(--video-secondary)'
)
const mainContanierColor = computed(() =>
  bgcolor.value ? 'var(--photo-primary-container)' : 'var(--video-primary-container)'
)
const mainCaptureColor = computed(() =>
  bgcolor.value ? 'var(--photo-primary)' : 'var(--video-primary)'
)
const butborder = computed(() => (butselect.value ? '15px' : '30px'))
const modeborder = computed(() => (bgcolor.value ? '30px' : '15px'))
const modetext = computed(() => (bgcolor.value ? 'Video' : 'Photo'))
const maincaptureicon = computed(() => (bgcolor.value ? '/cameraF.svg' : '/videoF.svg'))
</script>
<template>
  <main>
    <div class="controls">
      <div class="permissions-icon-box">
        <button
          type="button"
          class="perm-button"
          aria-label="Microphone Permissions Button"
          @click="reqmicperms"
        >
          <img src="/micPermsOff.svg" alt="perm button" />
        </button>
        <button
          type="button"
          class="perm-button"
          aria-label="Camera Permissions Button"
          @click="reqcamperms"
        >
          <img src="/camPermsOff.svg" alt="perm button" />
        </button>
      </div>
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
.icon-button:hover {
  transition: all 0.2s ease-in-out;
  filter: brightness(0.95);
  transform: scale(1.05);
}
.icon-button:active {
  transition: all 0.1s ease-in-out;
  filter: brightness(0.9);
  transform: scale(1);
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
.text-button:hover {
  transition: all 0.2s ease-in-out;
  filter: brightness(0.95);
  transform: scale(1.05);
}
.text-button:active {
  transition: all 0.1s ease-in-out;
  filter: brightness(0.9);
  transform: scale(1);
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
.capture:hover {
  transition: all 0.2s ease-in-out;
  filter: brightness(0.9);
  transform: scale(1.0025);
}
.capture:active {
  transition: all 0.1s ease-in-out;
  filter: brightness(0.75);
  transform: scale(0.95);
}
.permissions-icon-box {
  width: 60px;
  height: 120px;
}
</style>
