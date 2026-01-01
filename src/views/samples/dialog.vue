<template>
  <div>
    <h1>This is an dialog page</h1>

    <button @click="onAlert">alert</button>
    <button @click="onConfirm">confirm</button>
    <button @click="onModal">modal</button>

    <input v-model="kakao" type="text" />
  </div>
</template>
<script setup>
/* ----- Route Config ----- */
definePage({
  name: 'Dialog Sample Page',
  meta: {},
})
/* ----- Route Config ----- */

const onAlert = async () => {
  const result = await useDialog.alert({ msg: '야호 alert 이다' })
  console.log('onAlert', result)
}

const onConfirm = async () => {
  const result = await useDialog.confirm({ msg: '야호 confirm 이다' })
  console.log('onConfirm', result)
}

const onModal = async () => {
  const result = await useDialog.modal(await import('@/components/Dialog/modalTemplate.vue'), { kakao: 1234 })
  console.log('onModal', result)
}

const kakao = ref('')
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
