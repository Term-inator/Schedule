<template>
  <div class="container">
    <n-button-group class="tool-bar">
      <n-button @click="filtExpired" :style="getButtonStyle('expired')">Not Expired</n-button>
      <n-button @click="filtDone" :style="getButtonStyle('done')">Not Done</n-button>
    </n-button-group>
    <n-data-table
      :columns="columns"
      :data="dataStore.todos"
      :row-class-name="rowClassName"
      :max-height="'76vh'"
      :min-height="'76vh'"
    >
    </n-data-table>
  </div>
</template>

<script setup lang="ts">
import { computed, h, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useDataStore, useRuntimeStore, useSettingsStore } from '@renderer/store'
import { NButtonGroup, NButton, NIcon, NCheckbox, useNotification } from 'naive-ui'
import { NDataTable, DataTableColumns, DataTableBaseColumn } from 'naive-ui'
import { Play as PlayIcon } from '@vicons/ionicons5'
import { TodoBriefVO } from '@utils/vo'
import { DateTime } from 'luxon'
import { apiHandler } from '@renderer/apis/scheduleController'

const router = useRouter()
const dataStore = useDataStore()
const runtimeStore = useRuntimeStore()
const settingsStore = useSettingsStore()
const notification = useNotification()

const handleClick = (row) => {
  router.push({ name: 'schedule', params: { id: row.scheduleId } })
}

const handleCheckChange = async (row) => {
  await apiHandler({
    group: 'schedule',
    name: 'updateDoneById', 
    params: { id: row.id, done: !row.done },
    notification: {
      composable: notification,
      successNotification: false,
      failureNotification: true
    }
  })
  row.done = !row.done
  // 这里对其他页面和组件没有影响，所以暂时不在 eventBus 上 publish
}

const getTitle = (title: string) => {
  return h('span', { style: {overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'} }, title)
}

const timeColumn = reactive<DataTableBaseColumn<TodoBriefVO>>({
  key: 'end',
  title () {
    return getTitle('Deadline')
  },
  render (row) {
    return h(
      'span',
      {
        onClick: () => handleClick(row),
        style: {
          cursor: 'pointer'
        }
      },
      DateTime.fromISO(row.end).setZone(settingsStore.getValue('rrule.timeZone')).toFormat('MM-dd HH:mm')
    )
  },
  filterMultiple: false,
  filterOptionValue: runtimeStore.homepage.timeFilterOptionValue,
  filterOptions: [
    {
      label: 'Expired',
      value: 'expired'
    },
    {
      label: 'On Schedule',
      value: 'onSchedule'
    }
  ],
  filter (value, row) {
    if (value == 'expired') {
      return DateTime.fromISO(row.end) < DateTime.now().setZone('UTC') // 在 UTC 时区下比较即可
    }
    else if (value == 'onSchedule') {
      return DateTime.fromISO(row.end) > DateTime.now().setZone('UTC')
    }
    else {
      return true
    }
  }
})

const doneColumn = reactive<DataTableBaseColumn<TodoBriefVO>>({
  key: 'done',
  title () {
    return getTitle('Done')
  },
  width: '100px',
  render (row) {
    return h(
      NCheckbox,
      {
        checked: row.done,
        onUpdateChecked: () => handleCheckChange(row)
      }
    )
  },
  filterMultiple: false,
  filterOptionValue: runtimeStore.homepage.doneFilterOptionValue,
  filterOptions: [
    {
      label: 'Done',
      value: 1
    },
    {
      label: 'In Progress',
      value: 0
    }
  ],
  filter (value, row) {
    return Number(row.done) != value
  }
})

const columns = reactive<DataTableColumns<TodoBriefVO>>([
  {
    key: 'name',
    title () {
      return getTitle('Name')
    },
    render (row) {
      return h(
        'span',
        {
          onClick: () => handleClick(row),
          style: {
            cursor: 'pointer'
          }
        },
        row.name
      )
    }
  },
  timeColumn,
  {
    key: 'action',
    title () {
      return getTitle('Action')
    },
    width: '100px',
    render (row) {
      return h(
        NButton,
        {
          text: true,
          onClick: () => {
            router.push({ name: 'concentrate', params: { timeId: row.id } })
          },
          style: {
            fontSize: '20px',
            padding: '5px 0 0 0'
          }
        },
        h(NIcon, null, { default: () => h(PlayIcon) })
      )
    }
  },
  doneColumn
])

const activeStyle = {
  'background-color': 'rgba(00, 14, 28, 0.1)',
  'box-shadow': '1px 1px 1px 1px rgba(00, 14, 28, 0.6) inset'
}

const getButtonStyle = computed(() => {
  return (buttonType: string) => {
    if (buttonType == 'expired') {
      if (timeColumn.filterOptionValue == 'onSchedule') {
        return activeStyle
      }
    }
    else if (buttonType == 'done') {
      if (doneColumn.filterOptionValue == 1) {
        return activeStyle
      }
    }
    return {}
  }
})

const filtExpired = () => {
  if (runtimeStore.homepage.timeFilterOptionValue == null) {
    runtimeStore.homepage.timeFilterOptionValue = 'onSchedule'
    timeColumn.filterOptionValue = 'onSchedule'
  }
  else if (runtimeStore.homepage.timeFilterOptionValue == 'onSchedule') {
    runtimeStore.homepage.timeFilterOptionValue = null
    timeColumn.filterOptionValue = null
  }
}

const filtDone = () => {
  if (runtimeStore.homepage.doneFilterOptionValue == null) {
    runtimeStore.homepage.doneFilterOptionValue = 1
    doneColumn.filterOptionValue = 1
  }
  else if (runtimeStore.homepage.doneFilterOptionValue == 1) {
    runtimeStore.homepage.doneFilterOptionValue = null
    doneColumn.filterOptionValue = null
  }
}

const rowClassName = (row) => {
  const classNameList: string[] = []
  if (row.done) {
    classNameList.push('row-done')
  }
  const _end = DateTime.fromISO(row.end).setZone(settingsStore.getValue('rrule.timeZone'))
  // tdy
  if (_end >= DateTime.now().setZone(settingsStore.getValue('rrule.timeZone')).startOf('day') && 
      _end <= DateTime.now().setZone(settingsStore.getValue('rrule.timeZone')).endOf('day')) {
    classNameList.push('row-tdy')
  }
  // tmr
  else if (_end >= DateTime.now().plus({ day: 1 }).setZone(settingsStore.getValue('rrule.timeZone')).startOf('day') && 
          _end <= DateTime.now().plus({ day: 1 }).setZone(settingsStore.getValue('rrule.timeZone')).endOf('day')) {
    classNameList.push('row-tmr')
  }
  // after tmr
  else if (_end > DateTime.now().plus({ day: 1 }).setZone(settingsStore.getValue('rrule.timeZone')).endOf('day')) {
    classNameList.push('row-after-tmr')
  }

  // expired
  if (_end < DateTime.now().setZone(settingsStore.getValue('rrule.timeZone'))) {
    classNameList.push('row-expired')
  }
  return classNameList.join(' ')
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;

  .tool-bar {
    padding: 0 0 1vh 0;
  }
}

:deep(.row-done span) {
  color: #ccc;
}

:deep(.row-expired span) {
  color: red !important;
}

:deep(.row-tdy span) {
  color: #f90;
}

:deep(.row-tmr span) {
  color: #000;
}

:deep(.row-after-tmr span) {
  color: #999;
}

.table-title {
  overflow: 'hidden';
  text-overflow: 'ellipsis';
  white-space: 'nowrap';
}
</style>