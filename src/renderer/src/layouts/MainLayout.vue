<template>
  <n-layout position="absolute">
    <n-layout-header bordered :inverted="true" style="padding: 0.5vh 0 0.5vh 0;">
      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" :inverted="true"/>
    </n-layout-header>
    <n-layout position="absolute" :native-scrollbar="false" content-style="height: 100%;" style="top: 52.96px; bottom: 5vh;">
      <router-view></router-view>
    </n-layout>
    <n-layout-footer position="absolute" bordered :inverted="true" style="height: 5vh;">
      <div style="text-align: center">© 2023</div>
    </n-layout-footer>
  </n-layout>
</template>
//margin: 3vh 0 3vh 0;
<script setup lang="ts">
import { h, ref, onBeforeUnmount, Ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { NLayout, NLayoutHeader, NLayoutFooter, NMenu, MenuOption, useNotification } from 'naive-ui'
import {
  HomeOutline as HomeIcon,
  SettingsOutline as SettingsIcon,
  HelpCircleOutline as HelpIcon
} from '@vicons/ionicons5'
import {
  Database as DatabaseIcon
} from '@vicons/tabler'
import { renderIcon, ipcHandler } from '@renderer/utils/utils'
import { AlarmVO } from '@utils/vo'
import { useSettingsStore, useEventBusStore, Event } from '@renderer/store'
import { DateTime } from 'luxon'
import { parseTimeWithUnknown } from '@renderer/utils/unknownTime'

const router = useRouter()
const eventBusStore = useEventBusStore()
const settingsStore = useSettingsStore()
const notification = useNotification()

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/home',
          class: 'menu-item'
        },
        'Home'
      ),
    key: 'home',
    icon: renderIcon(HomeIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/database',
          class: 'menu-item'
        },
        'Database'
      ),
    key: 'database',
    icon: renderIcon(DatabaseIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/settings',
          class: 'menu-item'
        },
        'Settings'
      ),
    key: 'settings',
    icon: renderIcon(SettingsIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/help',
          class: 'menu-item'
        },
        'Help'
      ),
    key: 'help',
    icon: renderIcon(HelpIcon)
  }
]

const activeKey = ref('home')

const handleKeyboardEvent = (e: KeyboardEvent) => {
  // ctrl + right 向右切换
  if (e.ctrlKey && e.key === 'ArrowRight') {
    const index = menuOptions.findIndex((option) => option.key === activeKey.value)
    if (index !== -1) {
      const nextIndex = (index + 1) % menuOptions.length
      activeKey.value = menuOptions[nextIndex].key as string
      router.push({ name: activeKey.value })
    }
  }
  // ctrl + left 向左切换
  else if (e.ctrlKey && e.key === 'ArrowLeft') {
    const index = menuOptions.findIndex((option) => option.key === activeKey.value)
    if (index !== -1) {
      const nextIndex = (index - 1 + menuOptions.length) % menuOptions.length
      activeKey.value = menuOptions[nextIndex].key as string
      router.push({ name: activeKey.value })
    }
  }
}

window.addEventListener('keydown', handleKeyboardEvent)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyboardEvent)
})

const alarms: Ref<AlarmVO[]> = ref([])
const getAlarms = async () => {
  const res: AlarmVO[] = []
  if (settingsStore.getValue('alarm.todo.enable')) {
    const todos: AlarmVO[] = await ipcHandler({
      // @ts-ignore
      data: await window.api.findAllAlarms({ scheduleType: 'todo' }),
      notification: {
        composable: notification,
        successNotification: false,
        failureNotification: true
      }
    })
    res.push(...todos)
  }
  if (settingsStore.getValue('alarm.event.enable')) {
    const events: AlarmVO[] = await ipcHandler({
      // @ts-ignore
      data: await window.api.findAllAlarms({ scheduleType: 'event' }),
      notification: {
        composable: notification,
        successNotification: false,
        failureNotification: true
      }
    })
    res.push(...events)
  }
  alarms.value = res
}
const handleDataUpdated = () => {
  getAlarms()
}
handleDataUpdated()
eventBusStore.subscribe(Event.DataUpdated, handleDataUpdated)
eventBusStore.subscribe(Event.AlarmUpdated, handleDataUpdated)

onBeforeUnmount(() => {
  eventBusStore.unsubscribe(Event.DataUpdated, handleDataUpdated)
  eventBusStore.unsubscribe(Event.AlarmUpdated, handleDataUpdated)
})

const calAlarmTime = (scheduleType: string, time: Date) => {
  return DateTime.fromJSDate(time)
                 .minus({ 
                    hour: settingsStore.getValue(`alarm.${scheduleType}.before.hour`),
                    minute: settingsStore.getValue(`alarm.${scheduleType}.before.minute`)
                  })
                 .toJSDate()
}

const notify = (alarm: AlarmVO) => {
  new Notification(`${alarm.type}:${alarm.name}`, { 
    body: `${alarm.comment}\n${parseTimeWithUnknown(alarm.start, alarm.startMark)}-${parseTimeWithUnknown(alarm.end, alarm.endMark)}` })
    .onclick = () => {
      router.push({ name: 'schedule', params: { id: alarm.scheduleId }})
    }
}

const seconds = 30 // 多少秒检查一次是否有提醒
const polling = () => {
  const now = DateTime.now()
  const alarm: AlarmVO[] = alarms.value.filter((alarm: AlarmVO) => {
    const alarmTime = calAlarmTime(alarm.type, alarm.start ?? alarm.end)
    return now > DateTime.fromJSDate(alarmTime).minus({ second: seconds }) && now < DateTime.fromJSDate(alarmTime)
  })
  if (alarm) {
    for (const a of alarm) {
      notify(a)
    }
  }
  return polling
}

// 每 30 秒检查一次是否有提醒
setInterval(polling(), 1000 * seconds)

</script>

<style lang="less" scoped>
:deep(.menu-item) {
  font-size: large;
}
</style>
