<template>
  <n-data-table
    :columns="columns"
    :data="data"
  >

  </n-data-table>
</template>

<script setup lang="ts">
import { h, ref, Ref, onMounted } from 'vue'
import { useStore } from '@renderer/store/index'
import { NDataTable, NCheckbox } from 'naive-ui';
import { DataTableColumns } from 'naive-ui'
import { Todo } from '@renderer/utils/entity'
import { DateTime } from 'luxon';

const store = useStore()

const createColumns = ({
  handleCheckChange
}: {
  handleCheckChange: (row: Todo) => void
}): DataTableColumns<Todo> => {
  return [
    {
      title: 'Name',
      key: 'name',
      render (row) {
        return h(
          'span',
          {
            style: {
              color: row.end < Date.now() ? 'red' : 'black'
            }
          },
          store.scheduleData.get(row.scheduleId).name
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
              color: row.end < Date.now() ? 'red' : 'black'
            }
          },
          DateTime.fromJSDate(new Date(row.end)).toFormat('yyyy-MM-dd HH:mm')
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

const data: Ref<Todo[]> = store.timeData //ref([])


const columns = createColumns({
  handleCheckChange (row) {
    store.timeData.get(row.id).done = !store.timeData.get(row.id).done
  }
})
</script>