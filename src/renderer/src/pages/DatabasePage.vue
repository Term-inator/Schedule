<template>
  <div class="main">
    <n-card :segmented="{ content: true }">
      <template #header>
        <b>Database</b>
      </template>
      <div class="wrapper">
        <div class="filter">
          <n-input 
            :size="'large'" 
            v-model:value="search" 
            placeholder="Search Name..."
            clearable
            :on-input="debouncedInput"
          />
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
import { useEventBusStore, Event } from '@renderer/store'
import { NCard, NInput, NTag } from 'naive-ui'
import { NDataTable, DataTableColumns } from 'naive-ui'
import { ScheduleBriefVO } from '@utils/vo'
import { useDebounce } from '../utils/utils'

const router = useRouter()
const eventBusStore = useEventBusStore()

const pagination = reactive({
  page: 1,
  pageSize: 10,
  pageCount: 1,
  prefix ({ itemCount }) {
    return `Total is ${itemCount}.`
  },
  onUpdatePage (page) {
    pagination.page = page
    getData()
  },
})

const search = ref('')
const data: Ref<ScheduleBriefVO[]> = ref([])
const getData = async () => {
  // @ts-ignore
  const { data: _data, total } = await window.api.findAllSchedules({
    search: search.value, 
    page: pagination.page, 
    pageSize: pagination.pageSize
  })
  data.value = _data
  console.log(data.value)
  pagination.pageCount = Math.ceil(total / pagination.pageSize)
}

const handleDataUpdate = () => {
  getData()
}
handleDataUpdate()
eventBusStore.subscribe(Event.DataUpdated, handleDataUpdate)

onBeforeUnmount(() => {
  eventBusStore.unsubscribe(Event.DataUpdated, handleDataUpdate)
})

const handleInput = () => {
  pagination.page = 1
  getData()
}
const debouncedInput = useDebounce(handleInput, 500)

const columns: DataTableColumns<ScheduleBriefVO> = reactive([
  {
    title: 'ID',
    key: 'id',
    width: '8rem',
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
    width: '16rem',
    render (row) {
      return row.created.toLocaleString()
    }
  },
  {
    title: 'Updated',
    key: 'updated',
    width: '16rem',
    render (row) {
      return row.updated.toLocaleString()
    }
  },
  {
    title: 'Type',
    key: 'type',
    width: '10rem',
    render (row) {
      return h(NTag, { type: 'success' }, { default: () => row.type })
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