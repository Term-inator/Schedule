<template>
  <router-view />
</template>

<script setup lang="ts">
window.api.test().then((res) => {
  console.log(res)
})
</script>
