<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup>
/* ----- Route Config ----- */
definePage({
  name: 'About',
  meta: {
    layout: 'default',
  },
})
/* ----- Route Config ----- */

console.log('about 이다')
</script>
