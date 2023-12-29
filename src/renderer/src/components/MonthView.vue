<template>
  <n-calendar
    v-model:value="value"
    @update:value="handleUpdateValue"
    @panel-change="handlePanelChange"
    #="{ year, month, date }"
    style="height: 81vh;"
  >
    <n-tooltip trigger="hover"
      v-for="eventBrief in getEventBriefsByDate(year, month, date)" 
    >
      <template #trigger>
        <div class="schedule-card" @click="handleClick(eventBrief)">
          <span class="name"> {{ eventBrief.name }} </span>
          <span class="time"> {{ parseTimeWithUnknown(eventBrief.start, eventBrief.startMark, settingsStore.getValue('rrule.timeZone')) }} </span>
        </div>
      </template>
      <template #header> {{ eventBrief.name }} </template>
      {{ month }}/{{ date }}
      {{ parseTimeWithUnknown(eventBrief.start, eventBrief.startMark, settingsStore.getValue('rrule.timeZone')) }} -
      {{ parseTimeWithUnknown(eventBrief.end, eventBrief.endMark, settingsStore.getValue('rrule.timeZone')) }}
      <template #footer>
        <div class="comment">
          {{ eventBrief.comment }}
        </div>
      </template>
    </n-tooltip>
  </n-calendar>
</template>

<script setup lang="ts">
import { reactive, computed, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useEventBusStore, Event, useSettingsStore } from '@renderer/store';
import { NCalendar, NTooltip, useNotification } from 'naive-ui';
import { DateTime } from 'luxon'
import { EventBriefVO } from '@utils/vo'
import { ipcHandler } from '@renderer/utils/utils'
import { parseTimeWithUnknown } from '../../../utils/unknownTime'

const router = useRouter()
const eventBusStore = useEventBusStore()
const settingsStore = useSettingsStore()
const notification = useNotification()

const eventBriefIndexed = reactive(new Map<string, EventBriefVO[]>())

const panelTime = reactive({
  year: DateTime.now().year,
  month: DateTime.now().month
})

const getData = async (start: string | null, end: string | null) => {
  if (!start || !end) {
    notification.error({
      title: 'Error',
      content: `Invalid time range: ${start} - ${end}`
    })
    return
  }

  eventBriefIndexed.clear()
  const eventBriefs: EventBriefVO[] = await ipcHandler({
      // @ts-ignore
    data: await window.api.findEventsBetween(
            { start, end }
          ),
    notification: {
      composable: notification,
      successNotification: false,
      failureNotification: true
    }
  })

  for (const eventBrief of eventBriefs) {
    const key = DateTime.fromISO(eventBrief.start!).setZone(settingsStore.getValue('rrule.timeZone')).toFormat('yyyy/M/d')
    if (eventBriefIndexed.has(key)) {
      eventBriefIndexed.get(key)!.push(eventBrief) // 一定不会是 undefined
    }
    else {
      eventBriefIndexed.set(key, [eventBrief])
    }
  }
}

const handleDataUpdate = () => {
  getData(DateTime.fromObject(panelTime).startOf('month').minus({week: 1}).toISO(), 
          DateTime.fromObject(panelTime).endOf('month').plus({week: 1}).toISO())
}
eventBusStore.subscribe(Event.DataUpdated, handleDataUpdate)
eventBusStore.subscribe(Event.TimeZoneUpdated, handleDataUpdate)
handleDataUpdate()

onBeforeUnmount(() => {
  eventBusStore.unsubscribe(Event.DataUpdated, handleDataUpdate)
  eventBusStore.unsubscribe(Event.TimeZoneUpdated, handleDataUpdate)
})

const getEventBriefsByDate = computed(() => {
  return (year, month, date) => {
    return eventBriefIndexed.get(`${year}/${month}/${date}`)
  }
})

const handlePanelChange = ({ year, month }: { year: number, month: number }) => {
  panelTime.year = year
  panelTime.month = month
  eventBriefIndexed.clear()
  handleDataUpdate()
}

const value = computed({
  get:() => {
    // Naive UI 的日历组件暂时不支持设置时区，且会自动将时间 (value) 转换为本地时间，所以需要自己计算时区的偏移量
    const now = DateTime.now()
    // 先将当前时区的时间转换为目标时区的时间，然后固定时间的数值，修改回当前的时区。二者的差值就是时区的偏移量
    const nowAtTargetTimeZone = now.setZone(settingsStore.getValue('rrule.timeZone')).setZone(now.zone, { keepLocalTime: true })
    const diff = nowAtTargetTimeZone.toMillis() - now.toMillis()
    return now.plus({millisecond: diff}).toMillis()
  },
  // @ts-ignore
  set: (value) => {
    // do nothing
  }
})

const handleUpdateValue = (
  _: number,
  { year, month, date }: { year: number; month: number; date: number }
) => {
  console.log(`${year}-${month}-${date}`)
}

const handleClick = (eventBrief: EventBriefVO) => {
  router.push({ name: 'schedule', params: { id: eventBrief.scheduleId } })
}

</script>

<style lang="less" scoped>
.schedule-card {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 4px;
  border: 1.5px solid #eee;
  border-radius: 4px;
  box-shadow: 0 0 4px #eee;

  &:hover {
    width: auto;
    border-width: 1.5px;
    border-color: rgba(24, 160, 88);
    background-color: white;
    transition: all 0.2s ease-in-out;
  }

  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .time:hover {
    color: rgba(24, 160, 88);
  }
}

.comment {
  max-width: 50vh;
  white-space: pre-line;
}
</style>