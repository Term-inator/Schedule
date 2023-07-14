<template>
  <n-data-table
    :columns="columns"
    :data="data"
  >

  </n-data-table>
</template>

<script setup lang="ts">
import { h, Ref, ref } from 'vue'
import { NDataTable, NCheckbox } from 'naive-ui'
import { DataTableColumns } from 'naive-ui'
import { TodoBriefVO } from '@utils/vo'
import { DateTime } from 'luxon'


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
            style: {
              color: DateTime.fromJSDate(row.end) < DateTime.now() ? 'red' : 'black'
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
            style: {
              color: DateTime.fromJSDate(row.end) < DateTime.now() ? 'red' : 'black'
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