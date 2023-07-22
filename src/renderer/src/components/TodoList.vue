<template>
  <div class="container">
    <n-button-group class="tool-bar">
      <n-button @click="filtExpired" :style="getButtonStyle('expired')">Not Expired</n-button>
      <n-button @click="filtDone" :style="getButtonStyle('done')">Not Done</n-button>
    </n-button-group>
    <n-data-table
      :columns="columns"
      :data="data"
      :row-class-name="rowClassName"
      :max-height="'76vh'"
      :min-height="'76vh'"
    >
    </n-data-table>
  </div>
</template>

<script setup lang="ts">
import { computed, h, reactive, Ref, ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useEventBusStore, Event } from '@renderer/store'
import { NButtonGroup, NButton, NCheckbox } from 'naive-ui'
import { NDataTable, DataTableColumns, DataTableBaseColumn } from 'naive-ui'
import { TodoBriefVO } from '@utils/vo'
import { DateTime } from 'luxon'

const router = useRouter()
const eventBusStore = useEventBusStore()

const handleClick = (row) => {
  router.push({ name: 'schedule', params: { id: row.scheduleId } })
}

const handleCheckChange = async (row) => {
  row.done = !row.done
  // @ts-ignore
  await window.api.updateDoneById({ id: row.id, done: row.done })
  // 这里对其他页面和组件没有影响，所以暂时不在 eventBus 上 publish
}

const timeColumn = reactive<DataTableBaseColumn<TodoBriefVO>>({
  title: 'Deadline',
  key: 'end',
  render (row) {
    return h(
      'span',
      {
        onClick: () => handleClick(row),
        style: {
          cursor: 'pointer'
        }
      },
      DateTime.fromJSDate(row.end).toFormat('yyyy-MM-dd HH:mm')
    )
  },
  sorter (rowA, rowB) {
    return rowA.end > rowB.end ? 1 : -1
  },
  sortOrder: 'ascend',
  filterMultiple: false,
  filterOptionValue: 'onSchedule',
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
    console.log(value, row)
    if (value == 'expired') {
      return DateTime.fromJSDate(row.end) < DateTime.now()
    }
    else if (value == 'onSchedule') {
      return DateTime.fromJSDate(row.end) > DateTime.now()
    }
    else {
      return true
    }
  }
})

const doneColumn = reactive<DataTableBaseColumn<TodoBriefVO>>({
  title: 'Done',
  key: 'done',
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
  filterOptionValue: 1,
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
    title: 'Name',
    key: 'name',
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
  if (timeColumn.filterOptionValue == null) {
    timeColumn.filterOptionValue = 'onSchedule'
  }
  else if (timeColumn.filterOptionValue == 'onSchedule') {
    timeColumn.filterOptionValue = null
  }
}

const filtDone = () => {
  if (doneColumn.filterOptionValue == null) {
    doneColumn.filterOptionValue = 1
  }
  else if (doneColumn.filterOptionValue == 1) {
    doneColumn.filterOptionValue = null
  }
}

const rowClassName = (row) => {
  if (row.done) {
    return 'row-done'
  }
  if (DateTime.fromJSDate(row.end) < DateTime.now()) {
    return 'row row-expired'
  }
  return 'row'
}

const data: Ref<TodoBriefVO[]> = ref([])
const getData = async () => {
  // @ts-ignore
  data.value = await window.api.findAllTodos()
}

const handleDataUpdate = () => {
  getData()
}

eventBusStore.subscribe(Event.DataUpdated, handleDataUpdate)
handleDataUpdate()

onBeforeUnmount(() => {
  eventBusStore.unsubscribe(Event.DataUpdated, handleDataUpdate)
})

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
  color: red;
}
</style>