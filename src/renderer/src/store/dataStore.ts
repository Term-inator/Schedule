import { defineStore } from 'pinia'
import { useNotification } from 'naive-ui'
import { apiHandler } from '../apis/scheduleController'
import { TodoBriefVO } from '../../../utils/vo'
import { useEventBusStore, Event } from './eventBusStore'

const notification = useNotification()

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
      this.todos = await apiHandler({
        group: 'schedule',
        name: 'findAllTodos',
        params: {}, 
        notification: {
          composable: notification,
          successNotification: false,
          failureNotification: true
        }
      })
      // api 是将两个排过序的数组合并成一个数组，所以需要重新排序
      this.todos.sort((a, b) => a.end > b.end ? 1 : -1)
    },
    getTodoByTimeId(timeId: string): TodoBriefVO {
      const todo = this.todos.find((todo) => todo.id === timeId)
      if (todo) {
        return { ...todo} // TodoBriefVO 只有一层
      }
      else {
        throw new Error(`Can't find todo with timeId ${timeId}`)
      }
    },
    getTodoNames(): {name: string, timeId: string}[] {
      return this.todos.map((todo) => ({ name: todo.name, timeId: todo.id }))
    }
  }
})