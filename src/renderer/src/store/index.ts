import { defineStore } from 'pinia'
import { useNotification } from 'naive-ui'
import moment from 'moment-timezone'
import { ipcHandler, useDebounce } from '@renderer/utils/utils'
import { TodoBriefVO } from '@utils/vo'

const notification = useNotification()

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore('main', {
  state: () => ({}),
})

export enum Event {
  DataUpdated,
  AlarmUpdated,
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

export const useRuntimeStore = defineStore('runtime', {
  state: (): {
    homepage: {
      priority: string
    },
    concentratepage: {
      active: boolean
    }
  } => ({
    homepage: {
      priority: '',
    },
    concentratepage: {
      active: false,
    }
  }),
  actions: {
    init() {
      this.homepage.priority = useSettingsStore().getValue('preferences.priority')
    }
  }
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
          this.value[path] = settings[path]
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
      if (path.includes('alarm')) {
        const eventBusStore = useEventBusStore()
        eventBusStore.publish(Event.AlarmUpdated)
      }
      this.value[path] = value
      if (!deboucedSave) {
        deboucedSave = useDebounce(this.save, 1000)
      }
      deboucedSave()
    }
  }
})

export const useDataStore = defineStore('data', {
  state: (): {
    todos: TodoBriefVO[]
  } => ({
    todos: [],
  }),
  actions: {
    init() {
      const eventBusStore = useEventBusStore()
      eventBusStore.publish(Event.DataUpdated)
      eventBusStore.subscribe(Event.DataUpdated, this.load)
      this.load()
    },
    async load() {
      this.todos = await ipcHandler({
        // @ts-ignore
        data: await window.api.findAllTodos(), // api 已经排过序
        notification: {
          composable: notification,
          successNotification: false,
          failureNotification: true
        }
      })
    },
    getTodoByTimeId(timeId: number): TodoBriefVO {
      const todo = this.todos.find((todo) => todo.id === timeId)
      if (todo) {
        return { ...todo} // TodoBriefVO 只有一层
      }
      else {
        throw new Error(`Can't find todo with timeId ${timeId}`)
      }
    },
    getTodoNames(): {name: string, timeId: number}[] {
      return this.todos.map((todo) => ({ name: todo.name, timeId: todo.id }))
    }
  }
})
