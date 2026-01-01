<template>
  <keep-alive>
    <component :is="layoutComponent">
      <router-view />
    </component>
  </keep-alive>

  <ModalsContainer />
</template>

<script setup>
import layouts from '@/layout/layouts.js'

import { ModalsContainer } from 'vue-final-modal'

const route = useRoute()
const layoutComponent = computed(() => layouts[route?.meta?.layout || 'default'])
</script>
