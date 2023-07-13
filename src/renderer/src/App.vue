<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from '@renderer/store/index'

const store = useStore()

onMounted(() => {
  store.getDataFromDatabase()
})
</script>
