<template>
  <div>
    <h3>DatePicker - 기본 달력</h3>
    <DatePicker v-model="date" />
    {{ date }}
  </div>

  <div>
    <h3>DatePicker Range - 기간 달력</h3>
    <DatePicker v-model="date2" :range="{ partialRange: false }" />
    {{ date2 }}
  </div>

  <div>
    <h3>YearPicker - 연도 선택</h3>
    <DatePicker v-model="date3" year-picker model-type="yyyy" />
    {{ date3 }}
  </div>
  <div>
    <h3>MonthPicker - 월 선택</h3>
    <DatePicker v-model="date4" month-picker model-type="yyyyMM" />
    {{ date4 }}
  </div>

  <div>
    <h3>DatePicker - 날짜 입력</h3>
    <DatePicker v-model="date5" text-input />
    {{ date5 }}
  </div>
</template>

<script setup>
import DatePicker from '@/components/Form/DatePicker.vue'

/* ----- Route Config ----- */
definePage({
  name: 'DatePicker Sample Page',
  meta: { layout: 'empty' },
})
/* ----- Route Config ----- */

const date = ref('20250505')
const date2 = ref(['20250605', '20250705'])
const date3 = ref('2025')
const date4 = ref('202505')
const date5 = ref('20250511')
</script>
