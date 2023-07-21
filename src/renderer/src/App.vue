<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@renderer/store'

const settingsStore = useSettingsStore()

settingsStore.load()
</script>
