<template>
  <div class="query-sample">
    <h1>TanStack Query Sample</h1>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="isError">Error: {{ error.message }}</div>
    <div v-else>
      <ul>
        <li v-for="character in data" :key="character.id">{{ character.name.first }} {{ character.name.last }} ({{ character.species }})</li>
      </ul>
    </div>

    <button :disabled="isFetching" @click="refetch">
      {{ isFetching ? 'Refreshing...' : 'Refetch Data' }}
    </button>
  </div>
</template>

<script setup>
import { apiTest } from '@/apis/example.js'

import { useQuery } from '@tanstack/vue-query'

definePage({
  name: 'TanStack Query Sample',
  meta: {
    layout: 'default',
  },
})

// useQuery 훅 사용
const { isLoading, isError, data, error, isFetching, refetch } = useQuery({
  queryKey: ['futurama', 'characters'],
  queryFn: apiTest,
  // 옵션 설정 (예: 윈도우 포커스 시 재요청 비활성화)
  refetchOnWindowFocus: false,
})
</script>

<style scoped>
.query-sample {
  padding: 20px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}
</style>
