import { defineStore } from 'pinia'

export enum Event {
  TimeZoneUpdated,
  DataUpdated,
  AlarmUpdated,
  LoginExpired,
}

export const useEventBusStore = defineStore('eventBus', {
  state: () => ({
    events: {},
  }),
  actions: {
    subscribe(event: Event, callback: Function) {
      if (!this.events[event]) {
        this.events[event] = []
      }
      this.events[event].push(callback)
    },
    publish(event: Event, ...args: any[]) {
      if (!this.events[event]) {
        return []
      }
      return this.events[event].map((callback) => callback(...args))
    },
    unsubscribe(event: Event, callback: Function) {
      if (!this.events[event]) {
        return
      }
      this.events[event] = this.events[event].filter(
        (cb: Function) => cb !== callback
      )
    }
  },
})