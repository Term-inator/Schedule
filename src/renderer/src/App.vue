<template>
  <router-view />
</template>

<script setup lang="ts">
window.api.test("args").then((res) => {
  console.log(res)
})
</script>
