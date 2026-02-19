<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  bgcolor: boolean
  mainContanierColor: string
}>()
const butselect = ref(false)
const butborder = computed(() => (butselect.value ? '15px' : '30px'))
const isExpanded = ref(false)
const rightchevron = computed(() =>
  props.bgcolor ? '/rightchevronphoto.svg' : '/rightchevronvideo.svg'
)
const leftchevron = computed(() =>
  props.bgcolor ? '/leftchevronphoto.svg' : '/leftchevronvideo.svg'
)
const optionsImg = computed(() => (isExpanded.value ? leftchevron.value : rightchevron.value))
const optionsWidth = computed(() => (isExpanded.value ? '400px' : '50px'))
function options() {
  isExpanded.value = !isExpanded.value
  butselect.value = !butselect.value
}
</script>

<template>
  <div class="icon-box">
    <button type="button" class="icon-button" aria-label="Options Button" @click="options">
      <img :src="optionsImg" alt="chevron" />
    </button>
  </div>
</template>

<style scoped>
.icon-box {
  background-color: v-bind(mainContanierColor);
  border-radius: v-bind(butborder);
  width: v-bind(optionsWidth);
  height: 60px;
  padding: 0;
  transition: all 0.2s ease-in-out;
  align-content: center;
  position: absolute;
  left: 750px;
  bottom: 75px;
}
.icon-button {
  cursor: pointer;
  background-color: transparent;
  height: 100%;
  border-width: 0px;
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
  width: 44px;
  height: 44px;
}
</style>
