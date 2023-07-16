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
      <div class="schedule-info">
        <div><span class="label">Name</span> {{ schedule?.name }}</div>
        <div><span class="label">Type</span><n-tag type="success"> {{ schedule?.type }} </n-tag></div>
        <div style="white-space: pre-line;"><span class="label">Comment</span> {{ schedule?.comment }}</div>
        <div style="white-space: pre-line;"><span class="label">Time</span> {{ schedule?.timeCode }} </div>
        <div style="white-space: pre-line;"><span class="label">Rrules</span> {{ schedule?.rrules }} </div>
        <div><span class="label">Action</span> {{ schedule?.actionCode }} </div>
      </div>
    </n-card>
    <n-card :segmented="{ content: true }">
      <template #header><b>Times</b></template>
      <n-data-table
        :data="times"
        :columns="timesColumns"
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
import { Ref, h, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NCard, NPageHeader, NTag, NButton } from 'naive-ui'
import { NDataTable, DataTableColumns } from 'naive-ui'
import { Schedule, TimeType, RecordType } from '@utils/entity'

const router = useRouter()
const route = useRoute()
const id = Number(route.params.id)

const handleBack = () => {
  router.back()
}

const createTimesColumns = (): DataTableColumns<TimeType> => {
  return [
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
      title: 'Actions',
      key: 'actions',
      render: (row) => {
        return h(
          NButton,
          {
            onClick: () => {
              console.log(row)
            }
          },
          'Delete'
        )
      }
    }
  ]
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
  console.log(schedule.value)
  console.log(times.value)
  console.log(records.value)
}
getData()

const timesColumns = createTimesColumns()
const recordsColumns = creatRecordsColumns()
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