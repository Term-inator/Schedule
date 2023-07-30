<template>
  <n-notification-provider>
    <router-view></router-view>
  </n-notification-provider>
</template>

<script setup lang="ts">
import { useEventBusStore, useSettingsStore, Event, useRuntimeStore } from '@renderer/store'
import { NNotificationProvider } from 'naive-ui'
import { DateTime } from 'luxon'

const eventBusStore = useEventBusStore()
const settingsStore = useSettingsStore()
const runtimeStore = useRuntimeStore()

// 每天 00:00 更新数据
let time = DateTime.now()
setInterval(() => {
  const newTime = DateTime.now()

  if (newTime.day !== time.day) {
    time = newTime
    eventBusStore.publish(Event.DataUpdated)
  }
}, 1000 * 60)

settingsStore.load().then(() => {
  runtimeStore.init()
})
</script>
