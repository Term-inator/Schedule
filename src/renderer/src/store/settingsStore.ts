import { defineStore } from 'pinia'
import { useDebounce } from '@renderer/utils/utils'
import { apiHandler } from '@renderer/apis/scheduleController'
import { useNotification } from 'naive-ui'
import moment from 'moment-timezone'

const notification = useNotification()

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
      'preferences.startTime.minute': 0,
      'preferences.openAtLogin': false, // 默认不开机启动
      'pomodoro.focus.hour': 0,
      'pomodoro.focus.minute': 25,
      'pomodoro.smallBreak.hour': 0,
      'pomodoro.smallBreak.minute': 5,
      'pomodoro.bigBreak.hour': 0,
      'pomodoro.bigBreak.minute': 20,
    }
  }),
  getters: {
    getValue(): any {
      return (path: string): any => this.value[path]
    },
  },
  actions: {
    async load() {
      const settings = await apiHandler({
        group: 'user',
        name: 'loadSettings',
        params: {},
        notification: {
          composable: notification,
          successNotification: false,
          failureNotification: true,
        }
      })
      // load default settings

      for (const path in this.value) {
        if (settings[path] === undefined || settings[path] === null || settings[path] === '') {
          if (path == 'rrule.timeZone') {
            this.value[path] = moment.tz.guess()
            this.save(path, this.value[path])
          }
        }
        else {
          this.value[path] = settings[path]
        }
      }
    },
    async save(path: string, value: any) {
      await apiHandler({
        group: 'user',
        name: 'saveSettings',
        params: {
          path,
          value,
        },
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
      deboucedSave(path, value)
    }
  }
})