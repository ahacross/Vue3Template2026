<template>
  <component :is="layoutComponent">
    <router-view v-slot="{ Component }">
      <keep-alive :max="10">
        <component :is="Component" v-if="!route.meta?.isDetail" :key="route.fullPath" />
      </keep-alive>
      <component :is="Component" v-if="route.meta?.isDetail" :key="route.fullPath" />
    </router-view>
  </component>

  <ModalsContainer />
</template>

<script setup>
import { useDialogHistory } from '@/composable/useDialog'
import layouts from '@/layout/layouts.js'

import { ModalsContainer } from 'vue-final-modal'

const route = useRoute()
const layoutComponent = computed(() => layouts[route?.meta?.layout || 'default'])

// alert, confirm, popup history 관리
useDialogHistory()
</script>
