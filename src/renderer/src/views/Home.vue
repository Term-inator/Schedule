<template>
  <n-layout has-sider style="height: 100%;">
    <n-layout-sider
      bordered 
      show-trigger
      collapse-mode="width"
      :collapsed-width="0"
      :width="'30vw'"
      :native-scrollbar="false"
      content-style="padding: 0 1vw 0 1vw;"
    >
      <TodoList></TodoList>
    </n-layout-sider>
    <n-layout-content 
      bordered 
      :native-scrollbar="false"
      content-style="padding: 0 3vw 0 3vw;"
    >
      <n-calendar
        v-model:value="value"
        v-slot="{ year, month, date }"
        @update:value="handleUpdateValue"
      >
        <div style="height: 11vh">
          content
        </div>
      </n-calendar>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NLayout, NLayoutSider, NLayoutContent } from 'naive-ui'
import TodoList from '../components/TodoList.vue'
import { NCalendar } from 'naive-ui'
import { addDays } from 'date-fns/esm'


const value = ref(addDays(Date.now(), 0).valueOf())

const handleUpdateValue = (
  _: number,
  { year, month, date }: { year: number; month: number; date: number }
) => {
  console.log(`${year}-${month}-${date}`)
}
</script>

<style lang="less" scoped>

</style>
