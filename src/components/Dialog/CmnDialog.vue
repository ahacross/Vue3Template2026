<template>
  <VueFinalModal content-transition="vfm-fade" overlay-transition="vfm-fade">
    <DialogComponent :close="close">
      <template #title> {{ title }} </template>
      <slot />
      <template #buttons>
        <button v-if="type === 'confirm'" class="point" @click="close(true)">
          {{ confirmTxt }}
        </button>
        <button @click="close">{{ cancelTxt }}</button>
      </template>
    </DialogComponent>
  </VueFinalModal>
</template>

<script setup>
import DialogComponent from '@/components/Dialog/DialogComponent.vue'

import { VueFinalModal } from 'vue-final-modal'

defineProps({
  type: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  confirmTxt: {
    type: String,
    default: '',
  },
  cancelTxt: {
    type: String,
    default: '',
  },
  close: {
    type: Function,
    default: () => {},
  },
})
</script>
