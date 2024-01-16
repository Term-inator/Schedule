import { defineStore } from 'pinia'
import { useSettingsStore } from './settingsStore'


export const useRuntimeStore = defineStore('runtime', {
  state: (): {
    homepage: {
      timeFilterOptionValue: 'onSchedule' | 'overdue' | null, // todoList 区分过期和未过期
      doneFilterOptionValue: 0 | 1 | null, // todoList 区分已完成和未完成
      priority: string, // 确定 view 的默认优先级是 month 还是 week
    },
    database: {
      conditions: {
        search: string,
        dateRange: [number, number] | null,
        type: string | null,
        star: true | null,
      },
      page: number
    },
    schedule: {
      timesPageSize: number, // times 的每页数量
    }
  } => ({
    homepage: {
      timeFilterOptionValue: 'onSchedule',
      doneFilterOptionValue: 1,
      priority: '',
    },
    database: {
      conditions: {
        search: '',
        dateRange: null,
        type: null,
        star: null,
      },
      page: 1
    },
    schedule: {
      timesPageSize: 5,
    }
  }),
  actions: {
    init() {
      this.homepage.priority = useSettingsStore().getValue('preferences.priority')
    }
  }
})