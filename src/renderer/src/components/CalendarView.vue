<template>
  <n-calendar
    v-model:value="value"
    @update:value="handleUpdateValue"
    @panel-change="handlePanelChange"
    #="{ year, month, date }"
    style="height: 81vh;"
  >
    <div 
      v-for="eventBrief in getEventBriefsByDate(year, month, date)" 
      class="schedule-card"
      @click="handleClick(eventBrief)"
    >
      <span class="name"> {{ eventBrief.name }} </span>
      <span class="time"> {{ DateTime.fromJSDate(new Date(eventBrief.start)).toFormat('HH:mm') }} </span>
    </div>
  </n-calendar>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useEventBusStore, Event } from '@renderer/store';
import { NCalendar } from 'naive-ui';
import { DateTime } from 'luxon'
import { EventBriefVO } from '@utils/vo'

const router = useRouter()
const eventBusStore = useEventBusStore()

const eventBriefIndexed = reactive(new Map<string, EventBriefVO[]>())

const getData = async (start: Date, end: Date) => {
  const eventBriefs: EventBriefVO[] = await window.api.findEventsBetween(
    { start, end }
  )
  // console.log(start.toLocaleString(), end.toLocaleString())
  // console.log(eventBriefs)
  for (const eventBrief of eventBriefs) {
    const key = DateTime.fromJSDate(eventBrief.start).toFormat('yyyy/M/d')
    if (eventBriefIndexed.has(key)) {
      eventBriefIndexed.get(key).push(eventBrief)
    }
    else {
      eventBriefIndexed.set(key, [eventBrief])
    }
  }
  // console.log(eventBriefIndexed)
}

const handleDataUpdate = () => {
  getData(DateTime.now().startOf('month').minus({week: 1}).toJSDate(), 
          DateTime.now().endOf('month').plus({week: 1}).toJSDate())
}
eventBusStore.subscribe(Event.DataUpdated, handleDataUpdate)
handleDataUpdate()

onBeforeUnmount(() => {
  eventBusStore.unsubscribe(Event.DataUpdated, handleDataUpdate)
})

const getEventBriefsByDate = computed(() => {
  return (year, month, date) => {
    return eventBriefIndexed.get(`${year}/${month}/${date}`)
  }
})

const handlePanelChange = ({ year, month }: { year: number, month: number }) => {
  eventBriefIndexed.clear()
  getData(DateTime.fromObject({ year, month }).startOf('month').minus({week: 1}).toJSDate(), 
          DateTime.fromObject({ year, month }).endOf('month').plus({week: 1}).toJSDate())
}

const value = ref(new Date().valueOf())

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
</style>