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
      <template #header-extra>
        <n-popconfirm @positive-click="handleDeleteSchedule">
          <template #trigger>
            <n-button>Delete</n-button>
          </template>
          Delete the whole Scheldue?
        </n-popconfirm>
      </template>
      <div class="schedule-info">
        <div><span class="label">Name</span> {{ schedule?.name }}</div>
        <div><span class="label">Type</span><n-tag type="success"> {{ schedule?.type }} </n-tag></div>
        <div style="white-space: pre-line;"><span class="label">Comment</span> {{ schedule?.comment }}</div>
        <div style="white-space: pre-line;"><span class="label">rTime</span> {{ schedule?.rTimeCode.split(';').map(s => s + ';').join('\n') }} </div>
        <div style="white-space: pre-line;"><span class="label">exTime</span> {{ schedule?.exTimeCode == '' ? '' : schedule?.exTimeCode.split(';').map(s => s + ';').join('\n') }} </div>
        <!-- <div style="white-space: pre-line;"><span class="label">Rrules</span> {{ schedule?.rrules }} </div> -->
        <div><span class="label">Action</span> {{ schedule?.actionCode }} </div>
      </div>
    </n-card>
    <n-card :segmented="{ content: true }">
      <template #header><b>Times</b></template>
      <template #header-extra>
        <n-button>Add</n-button>
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
import { Ref, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NCard, NPageHeader, NTag, NButton, NPopconfirm } from 'naive-ui'
import { NDataTable, DataTableColumns, DataTableRowKey } from 'naive-ui'
import { Schedule, TimeType, RecordType, RowData } from '@utils/entity'
import { DateTime } from 'luxon'

const router = useRouter()
const route = useRoute()
const id = Number(route.params.id)

const handleBack = () => {
  router.back()
}

const createTimesColumns = (): DataTableColumns<TimeType> => {
  return [
    {
      type: 'selection',
    },
    {
      title: 'Start',
      key: 'start',
      render: (row) => {
        if (row.start) {
          return row.start.toLocaleString() // event
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
        return row.end.toLocaleString()
      }
    },
    {
      title: 'Weekday',
      key: 'weekday',
      render: (row) => {
        return DateTime.fromJSDate(row.start).weekdayLong
      }
    }
  ]
}

const rowKey = (row: RowData) => row.id
const checkedRowKeysRef = ref<DataTableRowKey[]>([])
const handleCheck = (rowKeys: DataTableRowKey[]) => {
  checkedRowKeysRef.value = rowKeys
}

const creatRecordsColumns = (): DataTableColumns<RecordType> => {
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

const schedule: Ref<Schedule> = ref()
const times: Ref<TimeType[]> = ref([])
const records: Ref<RecordType[]> = ref([])
const getData = async () => {
  schedule.value = await window.api.findScheduleById({id: id})
  times.value = await window.api.findTimesByScheduleId({scheduleId: id})
  records.value = await window.api.findRecordsByScheduleId({scheduleId: id})
}
getData()

const timesColumns = createTimesColumns()
const recordsColumns = creatRecordsColumns()


const handleDeleteSchedule = () => {
  window.api.deleteScheduleById({id: id})
}

const handleDeleteTimes = () => {
  for(const id of checkedRowKeysRef.value) {
    window.api.deleteTimeById({id: id})
  }
}


</script>

<style scoped lang="less">
.main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 5vh 8vw;
}

.schedule-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  div {
    display: flex;
    gap: 1rem;
    font-size: medium;
  }

  .label {
    display: inline-block;
    width: 5rem;
    text-align: left;
    font-weight: bold;
    margin: 0 1rem 0 0;
  }
}
</style>