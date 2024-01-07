<template>
  <div class="main">
    <n-card :segmented="{ content: true }">
      <template #header>
        <b>Database</b>
      </template>
      <div class="wrapper">
        <div class="filter">
          <n-input 
            size="large" 
            v-model:value="runtimeStore.database.conditions.search" 
            placeholder="Search Name or Comment..."
            clearable
            :on-input="debouncedUpdateValue"
          />
          <n-date-picker 
            size="large"
            v-model:value="runtimeStore.database.conditions.dateRange"
            type="daterange" 
            clearable
            :on-update-value="debouncedUpdateValue"
          >
          </n-date-picker>
          <n-select 
            size="large"
            v-model:value="runtimeStore.database.conditions.type"
            placeholder="Type"
            :options="[
              {
                label: 'todo',
                value: 'todo'
              },
              {
                label: 'event',
                value: 'event'
              }
            ]"
            clearable
            :style="{ width: '12rem' }"
            :on-update-value="debouncedUpdateValue"
          >
          </n-select>
          <n-button text 
            :color="runtimeStore.database.conditions.star ? '#ffe742' : '#c2c2c2'"
            style="font-size: 2.4vh;"
            @click="() => {
              if (runtimeStore.database.conditions.star) {
                runtimeStore.database.conditions.star = null
              }
              else {
                runtimeStore.database.conditions.star = true
              }
              debouncedUpdateValue()
            }"
          >
            <n-icon>
              <star-icon />
            </n-icon>
          </n-button>
        </div>
        <n-data-table
          remote
          :columns="columns"
          :data="data"
          :pagination="pagination"
          :bordered="false"
          :size="'large'"
          :row-props="rowProps"
        />
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, Ref, ref, h, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useEventBusStore, Event, useRuntimeStore } from '@renderer/store'
import { NCard, NInput, NTag, NDatePicker, NSelect, NButton, NIcon, useNotification } from 'naive-ui'
import { NDataTable, DataTableColumns } from 'naive-ui'
import { Star as StarIcon } from '@vicons/ionicons5'
import { ScheduleBriefVO } from '@utils/vo'
import { useDebounce } from '../utils/utils'
import { apiHandler } from '@renderer/apis/scheduleController'

const router = useRouter()
const eventBusStore = useEventBusStore()
const runtimeStore = useRuntimeStore()
const notification = useNotification()

const pagination = reactive({
  page: runtimeStore.database.page,
  pageSize: 10,
  pageCount: 1,
  itemCount: 0,
  prefix ({ itemCount }) {
    return `Total is ${itemCount}.`
  },
  onUpdatePage (page) {
    pagination.page = page
    runtimeStore.database.page = page
    getData()
  },
})

const data: Ref<ScheduleBriefVO[]> = ref([])
const getData = async () => {
  const { data: _data, total } = await apiHandler({
    group: 'schedule',
    name: 'findAllSchedules',
    params:{
      conditions: JSON.parse(JSON.stringify(runtimeStore.database.conditions)), // Proxy 对象不能直接传递
      page: runtimeStore.database.page, 
      pageSize: pagination.pageSize
    },
    notification: {
      composable: notification,
      successNotification: false,
      failureNotification: true
    }
  })
  data.value = _data

  pagination.pageCount = Math.ceil(total / pagination.pageSize)
  pagination.itemCount = total
}

const handleDataUpdate = () => {
  getData()
}
handleDataUpdate()
eventBusStore.subscribe(Event.DataUpdated, handleDataUpdate)

onBeforeUnmount(() => {
  eventBusStore.unsubscribe(Event.DataUpdated, handleDataUpdate)
})

const handleUpdateValue = () => {
  pagination.page = 1
  runtimeStore.database.page = 1
  getData()
}
const debouncedUpdateValue = useDebounce(handleUpdateValue, 500)

const columns: DataTableColumns<ScheduleBriefVO> = reactive([
  {
    title: 'ID',
    key: 'id',
    width: '8rem',
    ellipsis: true
  },
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Deleted',
    key: 'deleted',
    width: '6rem',
    render (row) {
      return row.deleted ? h(NTag, { type: 'success' }, 'True') : h(NTag, { type: 'error' }, 'False')
    }
  },
  {
    title: 'Created',
    key: 'created',
    width: '14rem',
    render (row) {
      return row.created.toLocaleString()
    }
  },
  {
    title: 'Updated',
    key: 'updated',
    width: '14rem',
    render (row) {
      return row.updated.toLocaleString()
    }
  },
  {
    title: 'Type',
    key: 'type',
    width: '6rem',
    render (row) {
      return h(NTag, { type: 'success' }, { default: () => row.type })
    }
  },
  {
    title: 'Star',
    key: 'star',
    width: '6rem',
    render (row) {
      return h(NIcon, {
        color: row.star ? '#ffe742' : '#c2c2c2',
        size: 20,
      }, { default: () => h(StarIcon) })
    }
  }
])

const rowProps = (row: ScheduleBriefVO) => {
  return {
    onClick: () => {
      router.push({ name: 'schedule', params: { id: row.id } })
    },
    style: {
      cursor: 'pointer'
    }
  }
}
</script>

<style scoped lang="less">
.main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 6vh 8vw 4vh 8vw;
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .filter {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>