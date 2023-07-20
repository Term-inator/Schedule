import { defineStore } from 'pinia'

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