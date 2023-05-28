<template>
  <n-data-table
    :columns="columns"
    :data="data"
  >

  </n-data-table>
</template>

<script setup lang="ts">
import { h, ref, Ref } from 'vue'
import { NDataTable, NCheckbox } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui'

type Todo = {
  id: number
  begin_time: number
  end_time: number
  name: string
  done: boolean
  create_time: number
  update_time: number
}

const createColumns = ({
  handleCheckChange
}: {
  handleCheckChange: (row: Todo) => void
}): DataTableColumns<Todo> => {
  return [
    {
      title: 'Name',
      key: 'name'
    },
    {
      title: 'Deadline',
      key: 'end_time'
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

const data: Ref<Todo[]> = ref([
  {
    id: 1,
    begin_time: 1,
    end_time: 1,
    name: '1',
    done: true,
    create_time: 1,
    update_time: 1
  },
  {
    id: 2,
    begin_time: 1,
    end_time: 2,
    name: '1',
    done: false,
    create_time: 1,
    update_time: 1
  }
])

const columns = createColumns({
  handleCheckChange (row) {
    data.value.map(todo => {
      if (todo.id === row.id) {
        todo.done = !todo.done
      }
      return todo
    })
  }
})
</script>