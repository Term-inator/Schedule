<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useEventBusStore, useSettingsStore, Event } from '@renderer/store'
import { DateTime } from 'luxon';

const eventBusStore = useEventBusStore()
const settingsStore = useSettingsStore()

// 每天 00:00 更新数据
let time = DateTime.now()
setInterval(() => {
  const newTime = DateTime.now()
  if (newTime.day !== time.day) {
    time = newTime
    eventBusStore.publish(Event.DataUpdated)
  }
}, 1000 * 60)

settingsStore.load()
</script>
