<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :row-class-name="rowClassName"
  >
  </n-data-table>
</template>

<script setup lang="ts">
import { h, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { NDataTable, NCheckbox } from 'naive-ui'
import { DataTableColumns } from 'naive-ui'
import { TodoBriefVO } from '@utils/vo'
import { DateTime } from 'luxon'

const router = useRouter()

const handleClick = (row) => {
  console.log(row)
  router.push({ name: 'schedule', params: { id: row.scheduleId } })
}

const createColumns = ({
  handleCheckChange
}: {
  handleCheckChange: (row: TodoBriefVO) => void
}): DataTableColumns<TodoBriefVO> => {
  return [
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
    {
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
      }
    },
    {
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
      }
    }
  ]
}

const rowClassName = (row) => {
  if (DateTime.fromJSDate(row.end) < DateTime.now()) {
    return 'row row-expired'
  }
  if (row.done) {
    return 'row-done'
  }
  return 'row'
}

const data: Ref<TodoBriefVO[]> = ref([])
const getData = async () => {
  data.value = await window.api.findAllTodos()
  console.log(data.value)
}
getData()

const columns = createColumns({
  handleCheckChange (row) {
    row.done = !row.done
  }
})
</script>

<style scoped>
:deep(.row-done span) {
  color: #ccc;
}

:deep(.row-expired) {
  color: red;
}
</style>