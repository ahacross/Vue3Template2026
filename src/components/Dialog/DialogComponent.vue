<template>
  <div class="popup">
    <button class="close" @click="close">
      <img :src="ImgClose" alt="닫기" draggable="false" />
    </button>
    <div v-if="isTitle" class="popup-header">
      <span>
        <slot name="title" />
      </span>
    </div>
    <slot />
  </div>
  <div class="popup-actions">
    <slot name="buttons">
      <button @click="close">닫기</button>
    </slot>
  </div>
</template>
<script setup>
import ImgClose from './assets/close.svg'

defineProps({
  close: {
    type: Function,
    default: () => {},
  },
})

const isTitle = computed(() => !!useSlots().title)
</script>
