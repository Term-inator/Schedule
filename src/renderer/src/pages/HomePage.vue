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
          <n-button v-for="(value, key) in tabList"
            :key="key"
            :style="getButtonStyle(value)"
            type="default"
            @click="handleTabClick(value)"
          >
            {{ value }}
          </n-button>
        </n-button-group>
        <schedule-modal type="primary" name="Add" @submit="handleSubmit"></schedule-modal>
        <n-button v-if="userStore.isLogin" text size="large" @click="syncData">
          <n-icon>
            <sync-icon></sync-icon>
          </n-icon>
        </n-button>
      </div>
      <EventList :priority="runtimeStore.homepage.priority"></EventList>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useEventBusStore, Event, useRuntimeStore, useUserStore } from '@renderer/store'
import { NLayout, NLayoutSider, NLayoutContent } from 'naive-ui'
import { NButtonGroup, NButton, NIcon, useNotification } from 'naive-ui'
import { SyncOutline as SyncIcon } from '@vicons/ionicons5'
import TodoList from '../components/TodoList.vue'
import EventList from '../components/EventList.vue'
import ScheduleModal from '@renderer/components/ScheduleModal.vue'
import { apiHandler } from '@renderer/apis/scheduleController'

const eventBusStore = useEventBusStore()
const runtimeStore = useRuntimeStore()
const userStore = useUserStore()
const notification = useNotification()

const tabList: string[] = ['month', 'week']

const handleTabClick = (tabName: string) => {
  runtimeStore.homepage.priority = tabName
}

const getButtonStyle = computed(() => {
  return (tabName: string) => {
    if (tabName === runtimeStore.homepage.priority) {
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
  await apiHandler({
    group: 'schedule',
    name: 'createSchedule',
    params: {...data},
    notification: {
      composable: notification,
      successNotification: true,
      failureNotification: true
    }
  })
  eventBusStore.publish(Event.DataUpdated) 
}

const syncData = async () => {
  await userStore.sync()
}
</script>

<style lang="less" scoped>
.tool-bar {
  display: flex;
  padding: 0 0 1vh 0;
  gap: 1vw;
}
</style>
