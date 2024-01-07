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
        <n-button text
          :color="schedule?.star ? '#ffe742' : '#c2c2c2'" 
          style="font-size: 2.4vh; padding: 0 0.5vw 0 0;"
          @click="handleStar"
        >
          <n-icon>
            <star-icon />
          </n-icon>
        </n-button>
        <template v-if="!schedule?.deleted">
          <schedule-modal name="Edit" :model-value="getModelValue" @submit="handleSubmit"></schedule-modal>
          <n-popconfirm @positive-click="handleDeleteSchedule">
            <template #trigger>
              <n-button>Delete</n-button>
            </template>
            Delete the whole Scheldue?
          </n-popconfirm>
        </template>
      </template>
      <schedule-info :schedule="schedule"></schedule-info>
    </n-card>
    <n-card :segmented="{ content: true }">
      <template #header><b>Times</b></template>
      <template #header-extra v-if="!schedule?.deleted">
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
        :row-class-name="rowClassName"
        :pagination="pagination"
        @update:checked-row-keys="handleCheck"
      >
      </n-data-table>
      
    </n-card>
    <n-card v-if="schedule.type == 'todo'" :segmented="{ content: true }">
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
import { Ref, ref, computed, reactive, onBeforeUnmount, defineComponent, PropType, h, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useEventBusStore, Event, useSettingsStore, useRuntimeStore } from '@renderer/store'
import { NCard, NPageHeader, NButton, NIcon, NPopconfirm, useNotification, NInput } from 'naive-ui'
import { NDataTable, DataTableColumns, DataTableRowKey } from 'naive-ui'
import { Star as StarIcon } from '@vicons/ionicons5'
import ScheduleModal from '@renderer/components/ScheduleModal.vue'
import ScheduleInfo from '@renderer/components/ScheduleInfo.vue'
import { Schedule, Time, Record } from '@prisma/client'
import { parseTimeWithUnknown } from '../../../utils/unknownTime'
import { DateTime } from 'luxon'
import { apiHandler } from '@renderer/apis/scheduleController'


const router = useRouter()
const route = useRoute()
const id = route.params.id as string

const eventBusStore = useEventBusStore()
const runtimeStore = useRuntimeStore()
const settingsStore = useSettingsStore()
const notification = useNotification()

const handleBack = () => {
  router.back()
}

const handleStar = async () => {
  await apiHandler({
    name: 'updateStarById',
    params: { id, star :!schedule.value.star },
    notification: {
      composable: notification,
      successNotification: false,
      failureNotification: true
    }
  })
  schedule.value.star = !schedule.value.star
  // 这里对其他页面和组件没有影响，所以暂时不在 eventBus 上 publish
}

const ShowOrEdit = defineComponent({
  props: {
    value: {
      type: [String] as PropType<string>,
      required: true
    },
    onUpdateValue: {
      type: [Function] as PropType<(value: string) => void>,
      required: true
    }
  },
  setup (props) {
    const isEdit = ref(false)
    const inputRef = ref<HTMLInputElement | null>(null)
    const inputValue = ref<string>(props.value)

    function handleOnDoubleClick () {
      isEdit.value = true
      nextTick(() => {
        inputRef.value?.focus()
      })
    }
    function handleChange () {
      props.onUpdateValue(inputValue.value)
      isEdit.value = false
    }
    return () =>
      h(
        'div',
        {
          style: {
            minHeight: '22px',
            width: '100%',
            cursor: 'pointer'
          },
          onDblclick: handleOnDoubleClick
        },
        isEdit.value
          ? h(NInput, {
            ref: inputRef,
            value: inputValue.value,
            onUpdateValue: (value) => {
              inputValue.value = value
            },
            onChange: handleChange,
            onBlur: () => {
              isEdit.value = false
            }
          })
          : props.value
      )
  }
})

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
          const start = DateTime.fromISO(row.start)
          const h_m = parseTimeWithUnknown(row.start, row.startMark, settingsStore.getValue('rrule.timeZone'))
          return `${start.year}/${start.month}/${start.day} ${h_m}`
        }
        else {
          return '-' // todo 类型没有 start
        }
      }
    },
    {
      title: 'End',
      key: 'end',
      render: (row) => {
        const end = DateTime.fromISO(row.end)
        const h_m = parseTimeWithUnknown(row.end, row.endMark, settingsStore.getValue('rrule.timeZone'))
        return `${end.year}/${end.month}/${end.day} ${h_m}`
      }
    },
    {
      title: 'Weekday',
      key: 'weekday',
      render: (row) => {
        if (row.start) {
          return DateTime.fromISO(row.start).setZone(settingsStore.getValue('rrule.timeZone')).weekdayLong
        }
        else {
          return DateTime.fromISO(row.end).setZone(settingsStore.getValue('rrule.timeZone')).weekdayLong
        }
      }
    },
    {
      title: 'Comment',
      key: 'comment',
      render: (row) => {
        return h(ShowOrEdit, {
          value: row.comment,
          onUpdateValue: (v) => {
            row.comment = v
            handleUpdateTimeComment(row)
          }
        
        })
      }
    }
  ]
}

const rowKey = (row: Time) => row.id
const checkedRowKeysRef = ref<DataTableRowKey[]>([])
const handleCheck = (rowKeys: DataTableRowKey[]) => {
  checkedRowKeysRef.value = rowKeys
}

const pagination = reactive({
  page: 1,
  pageSize: runtimeStore.schedule.timesPageSize,
  showSizePicker: true,
  pageSizes: [5, 10, 15, 20],
  onChange: (page: number) => {
    pagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    runtimeStore.schedule.timesPageSize = pageSize
    pagination.page = 1
  }
})

const creatRecordsColumns = (): DataTableColumns<Record> => {
  return [
    {
      title: 'Start',
      key: 'start',
      render: (row) => {
        return DateTime.fromISO(row.start).setZone(settingsStore.getValue('rrule.timeZone')).toFormat('yyyy/M/d HH:mm:ss')
      }
    },
    {
      title: 'End',
      key: 'end',
      render: (row) => {
        return DateTime.fromISO(row.end).setZone(settingsStore.getValue('rrule.timeZone')).toFormat('yyyy/M/d HH:mm:ss')
      }
    },
    {
      title: 'Duration',
      key: 'duration',
      render: (row) => {
        return DateTime.fromISO(row.end).diff(DateTime.fromISO(row.start)).toFormat('hh:mm:ss')
      }
    }
  ]
}

const schedule: Ref<Schedule> = ref({} as Schedule)
const times: Ref<Time[]> = ref([])
const records: Ref<Record[]> = ref([])
const getData = async () => {
  checkedRowKeysRef.value.splice(0, checkedRowKeysRef.value.length) // = [] 不生效，原因未知
  schedule.value = await apiHandler({
    name: 'findScheduleById', 
    params: {id: id},
    notification: {
      composable: notification,
      successNotification: false,
      failureNotification: true
    }
  })

  schedule.value.rTimeCode = schedule.value.rTimeCode == '' ? '' : 
                             schedule.value.rTimeCode.split(';').join(';\n')
  schedule.value.exTimeCode = schedule.value.exTimeCode == '' ? '' : 
                              schedule.value.exTimeCode.split(';').join(';\n')
  times.value = await apiHandler({
    name: 'findTimesByScheduleId',
    params: {scheduleId: id},
    notification: {
      composable: notification,
      successNotification: false,
      failureNotification: true
    }
  })

  times.value.sort((a, b) => {
    let aTime: DateTime
    let bTime: DateTime

    if (a.start && b.start) { // event 类型
      aTime = DateTime.fromISO(a.start)
      bTime = DateTime.fromISO(b.start)
    }
    else { // todo 类型
      aTime = DateTime.fromISO(a.end)
      bTime = DateTime.fromISO(b.end)
    }
    
    const tdy = DateTime.now().setZone(settingsStore.getValue('rrule.timeZone')).startOf('day')
    const aIsBeforeTdy = aTime.setZone(settingsStore.getValue('rrule.timeZone')) < tdy
    const bIsBeforeTdy = bTime.setZone(settingsStore.getValue('rrule.timeZone')) < tdy

    if (aIsBeforeTdy && bIsBeforeTdy) {
      // a 和 b 都在今天之前，小的排在前
      return aTime < bTime ? -1 : 1
    }
    else if (aIsBeforeTdy && !bIsBeforeTdy) {
      // a 在今天之前，b 在今天之后, b 排在前
      return 1
    }
    else if (!aIsBeforeTdy && bIsBeforeTdy) {
      // a 在今天之后，b 在今天之前, a 排在前
      return -1
    }
    else {
      // a 和 b 都在今天之后，小的排在前
      return aTime < bTime ? -1 : 1
    }
  })

  records.value = await apiHandler({
    name: 'findRecordsByScheduleId', 
    params: {scheduleId: id},
    notification: {
      composable: notification,
      successNotification: false,
      failureNotification: true
    }
  })
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
  await apiHandler({
    name: 'deleteScheduleById', 
    params: {id: id},
    notification: {
      composable: notification,
      successNotification: true,
      failureNotification: true
    }
  })
  eventBusStore.publish(Event.DataUpdated)
}

const handleDeleteTimes = async () => {
  await apiHandler({
    name: 'deleteTimeByIds',
    params: {ids: checkedRowKeysRef.value.map(item => Number(item))},
    notification: {
      composable: notification,
      successNotification: true,
      failureNotification: true
    }
  })
  eventBusStore.publish(Event.DataUpdated)
}

const getModelValue = computed(() => {
  return reactive({
    name: schedule.value?.name,
    rTime: schedule.value?.rTimeCode,
    comment: schedule.value?.comment,
    exTime: schedule.value?.exTimeCode
  })
})

const handleSubmit = async (data) => {
  await apiHandler({
    name: 'updateScheduleById', 
    params: {id: schedule.value?.id, ...data},
    notification: {
      composable: notification,
      successNotification: true,
      failureNotification: true
    }
  })
  eventBusStore.publish(Event.DataUpdated)
}

const handleUpdateTimeComment = async (row) => {
  await apiHandler({
    name: 'updateTimeCommentById', 
    params: {id: row.id, comment: row.comment},
    notification: {
      composable: notification,
      successNotification: true,
      failureNotification: true
    }
  })
}

const rowClassName = (row) => {
  const classNameList: string[] = []
  const _end = DateTime.fromISO(row.end).setZone(settingsStore.getValue('rrule.timeZone'))
  // before tdy
  if (_end < DateTime.now().setZone(settingsStore.getValue('rrule.timeZone')).startOf('day')) {
    classNameList.push('row-before-tdy')
  }
  return classNameList.join(' ')
}

</script>

<style scoped lang="less">
.main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 6vh 8vw;
}

:deep(.row-before-tdy td) {
  color: #ccc;
}
</style>