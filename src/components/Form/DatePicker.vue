<template>
  <VueDatePicker v-model="model" v-bind="props" :range="rangeProp" :formats="resolvedFormats" />
</template>

<script setup>
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ko } from 'date-fns/locale'

const props = defineProps({
  locale: {
    type: Object,
    default: () => ko,
  },
  modelType: {
    type: String,
    default: 'yyyyMMdd',
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  noToday: {
    type: Boolean,
    default: true,
  },
  weekStart: {
    type: Number,
    default: 0, // 주 시작일 0: 일요일
  },
  yearFirst: {
    type: Boolean,
    default: true,
  },
  yearRange: {
    type: Array,
    default: () => [2000, 2040],
  },
  autoApply: {
    type: Boolean, // 선택, 취소 버튼 없이 날짜 선택시바로 적용
    default: true,
  },
  timeConfig: {
    type: Object,
    default: () => ({
      enableTimePicker: false,
    }),
  },
  formats: {
    type: [Object, Function],
    default: undefined,
  },
  actionRow: {
    type: Object,
    default: () => ({
      selectBtnLabel: '선택',
      cancelBtnLabel: '취소',
    }),
  },
  range: {
    type: [Boolean, Object],
    default: false,
  },
})

const resolvedFormats = computed(() => {
  if (props.formats) return props.formats
  const { modelType } = props
  if (modelType === 'yyyyMMdd') {
    return { input: 'yyyy.MM.dd', preview: 'yyyy.MM.dd' }
  } else if (modelType === 'yyyyMM') {
    return { input: 'yyyy.MM', preview: 'yyyy.MM' }
  } else {
    // modelType === 'yyyy'
    return { input: 'yyyy', preview: 'yyyy' }
  }
})

const rangeProp = computed(() => {
  if (props.range === false) {
    return false
  } else {
    let returnRange = { partialRange: true }
    if (typeof props.range === 'object') {
      returnRange = { ...returnRange, ...props.range }
    }
    return returnRange
  }
})

const model = defineModel()
</script>
