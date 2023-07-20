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
          <n-button v-for="(value, key) in tabMap"
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
        <component 
          :is="currentTabComponent" 
          :days=settingsStore.value.days 
          :startTime="settingsStore.value.startTime">
        </component>
      </keep-alive>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useEventBusStore, Event, useSettingsStore } from '@renderer/store'
import { NLayout, NLayoutSider, NLayoutContent } from 'naive-ui'
import { NButtonGroup, NButton } from 'naive-ui'
import TodoList from '../components/TodoList.vue'
import ScheduleModal from '@renderer/components/ScheduleModal.vue'
import MonthView from '@renderer/components/MonthView.vue'
import WeekView from '@renderer/components/WeekView.vue'

const eventBusStore = useEventBusStore()
const settingsStore = useSettingsStore()

const tabMap = {
  'month': MonthView,
  'week': WeekView
}
const currentTabComponent = ref(tabMap[settingsStore.value.priority])
watch(() => settingsStore.value.priority, (newVal, oldVal) => {
  if (newVal === 'month') {
    currentTabComponent.value = MonthView
  } else if (newVal === 'week') {
    currentTabComponent.value = WeekView
  }
})

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
