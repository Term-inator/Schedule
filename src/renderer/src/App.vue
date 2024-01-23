<template>
  <n-notification-provider>
    <router-view></router-view>
  </n-notification-provider>
</template>

<script setup lang="ts">
import { useEventBusStore, useSettingsStore, Event, useRuntimeStore, useDataStore, useUserStore } from '@renderer/store'
import { NNotificationProvider } from 'naive-ui'
import { DateTime } from 'luxon'
import { getToken } from './utils/auth';

const eventBusStore = useEventBusStore()
const settingsStore = useSettingsStore()
const runtimeStore = useRuntimeStore()
const dataStore = useDataStore()
const userStore = useUserStore()

// 每天 00:00 更新数据
let time = DateTime.now()
setInterval(() => {
  const newTime = DateTime.now()

  if (newTime.day !== time.day) {
    time = newTime
    eventBusStore.publish(Event.DataUpdated) // 此时 alarm 也被更新了
  }
}, 1000 * 60)

settingsStore.load().then(() => {
  runtimeStore.init()
})
dataStore.init()

userStore.init()
// 如果有 token，说明上次没有退出登录，直接登录
if (getToken()) {
  userStore.login('passive')
}
</script>
