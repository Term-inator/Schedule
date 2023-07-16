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
      <div class="tool-bar" style="justify-content: flex-end;">
        <add-modal></add-modal>
      </div>
      <TodoList></TodoList>
    </n-layout-sider>
    <n-layout-content 
      bordered 
      :native-scrollbar="false"
      content-style="padding: 0 3vw 0 3vw;"
    > 
      <div class="tool-bar">
        <n-button-group>
          <n-button v-for="(value, key) in tabs"
          :key="key"
          type="default"
          @click="handleTabClick(value)"
          >
            {{ key }}
          </n-button>
        </n-button-group>
      </div>
      <keep-alive>
        <component :is="currentTabComponent" :days="5" :startTime="{hour: 4, minute: 0}"></component>
      </keep-alive>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NLayout, NLayoutSider, NLayoutContent } from 'naive-ui'
import { NButtonGroup, NButton } from 'naive-ui'
import TodoList from '../components/TodoList.vue'
import AddModal from '@renderer/components/AddModal.vue'
import CalendarView from '@renderer/components/CalendarView.vue'
import WeekView from '@renderer/components/WeekView.vue'

const currentTabComponent = ref(CalendarView)
const tabs = {
  CalendarView,
  WeekView
}
const handleTabClick = (component) => {
  currentTabComponent.value = component
}
</script>

<style lang="less" scoped>
.tool-bar {
  display: flex;
  padding: 0 0 1vh 0;
}
</style>
