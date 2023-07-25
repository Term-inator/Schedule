import { defineStore } from 'pinia'
import { useNotification } from 'naive-ui'
import moment from 'moment-timezone'
import { ipcHandler } from '@renderer/utils/utils'

const notification = useNotification()

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore('main', {
  state: () => ({}),
})

export enum Event {
  DataUpdated
}

export const useEventBusStore = defineStore('eventBus', {
  state: () => ({
    events: {},
  }),
  actions: {
    subscribe(event, callback) {
      if (!this.events[event]) {
        this.events[event] = []
      }
      this.events[event].push(callback)
    },
    publish(event, ...args) {
      if (!this.events[event]) {
        return []
      }
      return this.events[event].map((callback) => callback(...args))
    },
    unsubscribe(event, callback) {
      if (!this.events[event]) {
        return
      }
      this.events[event] = this.events[event].filter(
        (cb) => cb !== callback
      )
    }
  },
})


export const useSettingsStore = defineStore('settings', {
  state: () => ({
    value: {
      timeZone: '',
      wkst: 'MO',
      priority: 'month',
      days: 5,
      startTime: { hour: 0, minute: 0 }
    }
  }),
  actions: {
    async load() {
      const settings = await ipcHandler({
        // @ts-ignore
        data: await window.api.loadSettings(),
        notification: {
          composable: notification,
          successNotification: false,
          failureNotification: true,
        }
      })
      // load default settings
      let modifyFlag = false
      for (const key in this.value) {
        if (settings[key] === undefined) {
          if (key == 'timeZone') {
            this.value[key] = moment.tz.guess(true)
          }
          modifyFlag = true
        }
        else {
          this.value[key] = settings[key]
        }
      }
      console.log(settings)
      if (modifyFlag) {
        this.save()
      }
    },
    async save() {
      await ipcHandler({
        // @ts-ignore
        data: await window.api.saveSettings({settings: JSON.stringify(this.value, null, 2)}),
        notification: {
          composable: notification,
          successNotification: false,
          failureNotification: false,
        }
      })
    },
    setValue(key: string, value: any): void {
      if (value) {
        // 如果是对象
        if (typeof value === 'object') {
          console.log('object')
          this.value[key] = Object.assign(this.value[key], value)
        }
        else {
          this.value[key] = value
        }
        this.save()
      }
    }
  }
})
