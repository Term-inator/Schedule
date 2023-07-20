<template>
  <n-layout has-sider style="height: 100%;">
    <n-layout-sider
      bordered 
      show-trigger
      collapse-mode="width"
      :collapsed-width="0"
      :width="'30vw'"
      :native-scrollbar="false"
      content-style="padding: 2vh 1vw 2vh 1vw;"
    >
      <TodoList></TodoList>
    </n-layout-sider>
    <n-layout-content 
      bordered 
      :native-scrollbar="false"
      content-style="padding: 2vh 3vw 2vh 3vw;"
    > 
      <div class="tool-bar">
        <n-button-group>
          <n-button v-for="(value, key) in tabs"
            :key="key"
            :style="getButtonStyle(value)"
            type="default"
            @click="handleTabClick(value)"
          >
            {{ key }}
          </n-button>
        </n-button-group>
        <schedule-modal type="primary" name="Add" @submit="handleSubmit"></schedule-modal>
      </div>
      <keep-alive>
        <component :is="currentTabComponent" :days="5" :startTime="{hour: 4, minute: 0}"></component>
      </keep-alive>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEventBusStore, Event } from '@renderer/store'
import { NLayout, NLayoutSider, NLayoutContent } from 'naive-ui'
import { NButtonGroup, NButton } from 'naive-ui'
import TodoList from '../components/TodoList.vue'
import ScheduleModal from '@renderer/components/ScheduleModal.vue'
import MonthView from '@renderer/components/MonthView.vue'
import WeekView from '@renderer/components/WeekView.vue'

const eventBusStore = useEventBusStore()

const currentTabComponent = ref(MonthView)
const tabs = {
  MonthView,
  WeekView
}
const handleTabClick = (component) => {
  currentTabComponent.value = component
  if (component === MonthView) {
    currentTabComponent.value = MonthView
  } else if (component === WeekView) {
    currentTabComponent.value = WeekView
  }
}

const getButtonStyle = computed(() => {
  return (component) => {
    if (component.__name === currentTabComponent.value.__name) {
      return {
        'background-color': 'rgba(00, 14, 28, 0.1)',
        'box-shadow': '1px 1px 1px 1px rgba(00, 14, 28, 0.6) inset'
      }
    } else {
      return {}
    }
  }
})

const handleSubmit = async (data) => {
  await window.api.createSchedule({...data})
  eventBusStore.publish(Event.DataUpdated)
}
</script>

<style lang="less" scoped>
.tool-bar {
  display: flex;
  padding: 0 0 1vh 0;
  gap: 1vw;
}
</style>
