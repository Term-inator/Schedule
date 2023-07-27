import { defineStore } from 'pinia'
import { useNotification } from 'naive-ui'
import moment from 'moment-timezone'
import { ipcHandler, useDebounce } from '@renderer/utils/utils'

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

let deboucedSave
export const useSettingsStore = defineStore('settings', {
  state: () => ({
    value: {
      'rrule.timeZone': '',
      'rrule.wkst': 'MO',
      'alarm.todo.enable': true,
      'alarm.todo.before.hour': 0, // 默认提前5分钟提醒
      'alarm.todo.before.minute': 5,
      'alarm.event.enable': true,
      'alarm.event.before.hour': 0, // 默认提前5分钟提醒
      'alarm.event.before.minute': 5,
      'preferences.priority': 'month', // 默认优先级为月
      'preferences.days': 5, // 默认显示5天
      'preferences.startTime.hour': 0, // 默认开始时间为0点
      'preferences.startTime.minute': 0
    }
  }),
  getters: {
    getValue(): any {
      return (path: string): any => this.value[path]
    },
  },
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

      for (const path in this.value) {
        if (settings[path] === undefined) {
          if (path == 'rrule.timeZone') {
            this.value[path] = moment.tz.guess()
          }
          modifyFlag = true
        }
        else {
          this.setValue(path, settings[path])
        }
      }
      if (modifyFlag) {
        this.save()
      }
    },
    async save() {
      await ipcHandler({
        // @ts-ignore
        data: await window.api.saveSettings({settings: JSON.stringify(this.value)}),
        notification: {
          composable: notification,
          successNotification: false,
          failureNotification: false,
        }
      })
    },
    async setValue(path: string, value: any) {
      this.value[path] = value
      if (!deboucedSave) {
        deboucedSave = useDebounce(this.save, 1000)
      }
      deboucedSave()
    }
  }
})
