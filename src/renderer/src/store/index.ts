import { defineStore } from 'pinia'
import { Schedule, Time } from '@renderer/utils/entity'
import { DateTime } from 'luxon'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore('main', {
  state: () => ({
    scheduleData: new Map<number, Schedule>, // id -> Scheudle
    timeData: new Map<string, Time[]> // '2021/01/01' -> Time
  }),
  getters: {
    getScheduleData() {
      return (id: number): Schedule | undefined => this.scheduleData.get(id)
    },
    getTimeData() {
      return (date: string): Time[] | undefined => this.timeData.get(date)
    }
  },
  actions: {
    setScheduleData(schedule: Schedule) {
      this.scheduleData.set(schedule.id, schedule)
    },
    setTimeData(time: Time) {
      const dt = DateTime.fromJSDate(new Date(time.start))
      const key = `${dt.year}/${dt.month}/${dt.day}`
      const value = this.timeData.get(key)
      if (value) {
        value.push(time)
      }
      else {
        this.timeData.set(key, [time])
      }
    },
    async getDataFromDatabase() {
      const time: Time[] = await window.api.readTime({
        where: {
          done: false,
          deleted: false
        }
      })
      const scheduleIds = new Set()
      for (const item of time) {
        this.setTimeData(item)
        scheduleIds.add(item.scheduleId)
      }
    
      const schedule: Schedule[] = await window.api.readSchedule({
        where: {
          id: {
            in: [...scheduleIds]
          }
        }
      })
      for (const item of schedule) {
        this.setScheduleData(item)
      }
    }
  }
})