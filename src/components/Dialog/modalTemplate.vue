<template>
  <DialogComponent :close="close">
    <template #title> 이거시 타이틀 </template>
    <template #default>
      <div v-for="(item, idx) in list" :key="idx">
        {{ `무어라 해야 할까? ${item}` }}
      </div>
      <label>
        <input v-model="test" type="text" />
      </label>
    </template>
    <template #buttons>
      <button class="point" @click="onConfirm">확인</button>
      <button @click="close">닫기</button>
    </template>
  </DialogComponent>
</template>

<script setup>
// 팝업 닫을 때 onClose에 return 하고 싶은 값은 value에 넣어주면 됨
const props = defineProps({
  close: {
    type: Function,
    default: () => {},
  },
  kakao: {
    type: Number,
    default: 0,
  },
})

const list = Array.from({ length: 10 }, (_, i) => i)
const test = ref('')
const onConfirm = () => props.close({ naver: 7678, test: test.value })

// open 시 실행
onMounted(() => {
  console.log(props)
})
</script>
