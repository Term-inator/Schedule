import { defineStore } from 'pinia'
import { Event, useEventBusStore } from './eventBusStore'
import { useSettingsStore } from './settingsStore'
import { useDataStore } from './dataStore'
import { useRuntimeStore } from './runtimeStore'
import { useUserStore } from './userStore'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore('main', {
  state: () => ({})
})

export { Event, useEventBusStore, useSettingsStore, useDataStore, useRuntimeStore, useUserStore }
