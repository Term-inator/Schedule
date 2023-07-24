<template>
  <div class="main">
    <n-page-header
      title="Schedule"
      @back="handleBack"
      :show-breadcrumb="false"
      :show-title-separator="false"
    >
    </n-page-header>
    <n-card :segmented="{ content: true }">
      <template #header><b>Info</b></template>
      <template #header-extra v-if="!schedule?.deleted">
        <schedule-modal name="Edit" :model-value="getModelValue" @submit="handleSubmit"></schedule-modal>
        <n-popconfirm @positive-click="handleDeleteSchedule">
          <template #trigger>
            <n-button>Delete</n-button>
          </template>
          Delete the whole Scheldue?
        </n-popconfirm>
      </template>
      <schedule-info :schedule="schedule"></schedule-info>
    </n-card>
    <n-card :segmented="{ content: true }">
      <template #header><b>Times</b></template>
      <template #header-extra  v-if="!schedule?.deleted">
        <n-popconfirm @positive-click="handleDeleteTimes">
          <template #trigger>
            <n-button>Delete</n-button>
          </template>
          Delete seleted times?
        </n-popconfirm>
      </template>
      <n-data-table
        :data="times"
        :columns="timesColumns"
        :row-key="rowKey"
        @update:checked-row-keys="handleCheck"
      >
      </n-data-table>
      
    </n-card>
    <n-card :segmented="{ content: true }">
      <template #header><b>Records</b></template>
      <n-data-table
        :data="records"
        :columns="recordsColumns"
      >
      </n-data-table>
      
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, computed, reactive, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useEventBusStore, Event } from '@renderer/store'
import { 
  NCard, NPageHeader, NButton, NPopconfirm } from 'naive-ui'
import { NDataTable, DataTableColumns, DataTableRowKey } from 'naive-ui'
import ScheduleModal from '@renderer/components/ScheduleModal.vue'
import ScheduleInfo from '@renderer/components/ScheduleInfo.vue'
import { Schedule, Time, Record } from '@prisma/client'
import { parseTimeWithUnknown } from '@renderer/utils/unknownTime'
import { DateTime } from 'luxon'


const router = useRouter()
const route = useRoute()
const id = Number(route.params.id)

const eventBusStore = useEventBusStore()

const handleBack = () => {
  router.back()
}

const createTimesColumns = (): DataTableColumns<Time> => {
  return [
    {
      type: 'selection',
    },
    {
      title: 'Start',
      key: 'start',
      render: (row) => {
        if (row.start) {
          // event
          const h_m = parseTimeWithUnknown(row.start, row.startMark)
          return `${row.start.getFullYear()}/${row.start.getMonth() + 1}/${row.start.getDate()} ${h_m}`
        }
        else {
          return '-' // todo
        }
      }
    },
    {
      title: 'End',
      key: 'end',
      render: (row) => {
        const h_m = parseTimeWithUnknown(row.end, row.endMark)
        return `${row.end.getFullYear()}/${row.end.getMonth() + 1}/${row.end.getDate()} ${h_m}`
      }
    },
    {
      title: 'Weekday',
      key: 'weekday',
      render: (row) => {
        if (row.start) {
          return DateTime.fromJSDate(row.start).weekdayLong
        }
        else {
          return DateTime.fromJSDate(row.end).weekdayLong
        }
      }
    }
  ]
}

const rowKey = (row: Time) => row.id
const checkedRowKeysRef = ref<DataTableRowKey[]>([])
const handleCheck = (rowKeys: DataTableRowKey[]) => {
  checkedRowKeysRef.value = rowKeys
}

const creatRecordsColumns = (): DataTableColumns<Record> => {
  return [
    {
      title: 'Start',
      key: 'start',
      render: (row) => {
        return row.start.toLocaleString()
      }
    },
    {
      title: 'End',
      key: 'end',
      render: (row) => {
        return row.end.toLocaleString()
      }
    },
  ]
}

const schedule: Ref<Schedule> = ref({} as Schedule)
const times: Ref<Time[]> = ref([])
const records: Ref<Record[]> = ref([])
const getData = async () => {
  // @ts-ignore
  schedule.value = await window.api.findScheduleById({id: id})
  schedule.value.rTimeCode = schedule.value.rTimeCode == '' ? '' : 
                             schedule.value.rTimeCode.split(';').join(';\n')
  schedule.value.exTimeCode = schedule.value.exTimeCode == '' ? '' : 
                              schedule.value.exTimeCode.split(';').join(';\n')
  // @ts-ignore
  times.value = await window.api.findTimesByScheduleId({scheduleId: id})
  // @ts-ignore
  records.value = await window.api.findRecordsByScheduleId({scheduleId: id})
}

const handleDataUpdate = () => {
  getData()
}
eventBusStore.subscribe(Event.DataUpdated, handleDataUpdate)
handleDataUpdate()

onBeforeUnmount(() => {
  eventBusStore.unsubscribe(Event.DataUpdated, handleDataUpdate)
})

const timesColumns = createTimesColumns()
const recordsColumns = creatRecordsColumns()


const handleDeleteSchedule = async () => {
  // @ts-ignore
  await window.api.deleteScheduleById({id: id})
  eventBusStore.publish(Event.DataUpdated)
}

const handleDeleteTimes = async () => {
  for(const id of checkedRowKeysRef.value) {
    // @ts-ignore
    await window.api.deleteTimeById({id: id})
  }
  eventBusStore.publish(Event.DataUpdated)
}

const getModelValue = computed(() => {
  return reactive({
    name: schedule.value?.name,
    rTime: schedule.value?.rTimeCode,
    comment: schedule.value?.comment,
    action: schedule.value?.actionCode,
    exTime: schedule.value?.exTimeCode
  })
})

const handleSubmit = async (data) => {
  // @ts-ignore
  await window.api.updateSchedule({id: schedule.value?.id, ...data})
  eventBusStore.publish(Event.DataUpdated)
}
</script>

<style scoped lang="less">
.main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 6vh 8vw;
}
</style>