<script setup lang="ts">
import { ref, computed } from 'vue'
import Permissions from './components/Permissions.vue'
import Options from './components/Options.vue'
// true = photo mode & buttons are clicked, false = video mode & buttons arnt clicked
const bgcolor = ref(true)
const campermstatus = ref(false)
const micpermstatus = ref(false)
async function mode(): Promise<void> {
  //flip all the ui values from photo to video or vice versax`
  bgcolor.value = !bgcolor.value
}
async function reqmicperms(): Promise<void> {
  micpermstatus.value = await window.electron.ipcRenderer.invoke('reqmicperms')
  if (micpermstatus.value) {
    console.log('im all good')
  } else {
    console.log('im so not good')
  }
}
async function reqcamperms(): Promise<void> {
  campermstatus.value = await window.electron.ipcRenderer.invoke('reqcamperms')
  if (campermstatus.value) {
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
const modeborder = computed(() => (bgcolor.value ? '30px' : '15px'))
const modetext = computed(() => (bgcolor.value ? 'Photo' : 'Video'))
const maincaptureicon = computed(() => (bgcolor.value ? '/cameraF.svg' : '/videoF.svg'))
const camPermIconOn = computed(() => (bgcolor.value ? '/camPermsOnP.svg' : 'camPermsOnV.svg'))
const micPermIconOn = computed(() => (bgcolor.value ? '/micPermsOnP.svg' : 'micPermsOnV.svg'))
const micPermImg = computed(() => (micpermstatus.value ? micPermIconOn.value : '/micPermsOff.svg'))
const camPermImg = computed(() => (campermstatus.value ? camPermIconOn.value : '/camPermsOff.svg'))
</script>
<template>
  <main>
    <div class="controls">
      <div class="permissions-icon-box">
        <Permissions :image="micPermImg" @click="reqmicperms" />
        <Permissions :image="camPermImg" @click="reqcamperms" />
      </div>
      <button type="button" class="text-button" aria-label="Mode button" @click="mode">
        {{ modetext }}
      </button>
      <button type="button" class="capture" aria-label="Capture button" @click="">
        <img :src="maincaptureicon" alt="capture button" />
      </button>
      <div>
        <Options :bgcolor :mainContanierColor />
      </div>
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
  width: 1330px;
  margin: auto;
  align-items: center;
  background-color: transparent;
  display: flex;
  justify-content: center;
  position: relative;
  column-gap: 10px;
}
.text-button {
  background-color: v-bind(mainContanierColor);
  border-radius: v-bind(modeborder);
  border-width: 0px;
  padding: 0;
  cursor: pointer;
  font-size: 20px;
  width: 130px;
  height: 60px;
  font-family: var(--font-google-sans-flex);
  position: absolute;
  left: 450px;
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
  position: absolute;
  left: auto;
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
  position: absolute;
  width: 60px;
  height: 120px;
  left: 380px;
}
</style>
