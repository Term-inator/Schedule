<template>
  <div class="container">
    <div v-for="i in props.days" 
      class="day-card"
    >
      <div class="title">
        {{ DateTime.now().plus({day: i - 1}).toFormat('yyyy/M/d') }}
      </div>
      <template v-if="getEventBriefsByOffset(i)">
        <div v-for="event in getEventBriefsByOffset(i)" 
          :style="stateMap.get(event.id)?.styleObject"
          @click="handleClick(event)"
          @mouseover="handleMouseOver(event)"
          @mouseleave="handleMouseLeave(event)"
          @dragstart="handleDragStart($event, event)"
          @dragend="handleDragEnd($event, event)"
          draggable="true"
          class="event-card"
        >
          {{ event.name }}
          {{ parseTimeWithUnknown(event.start, event.startMark) }} -
          {{ parseTimeWithUnknown(event.end, event.endMark) }}
        </div>
      </template>
      <template v-else>
        <n-empty 
          size="large" 
          description="No Events" 
          show-description
          style="padding-top: 140%;"
        >
        </n-empty>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onBeforeUnmount, StyleValue } from 'vue'
import { useRouter } from 'vue-router'
import { useEventBusStore, Event } from '@renderer/store'
import { NEmpty } from 'naive-ui'
import { DateTime } from 'luxon'
import { EventBriefVO } from '@utils/vo'
import { toPx } from '@renderer/utils/css'
import { parseTimeWithUnknown, getStartAndDuration } from '@renderer/utils/unknownTime'

type Props = {
  days?: number
  startTime?: {
    hour: number
    minute: number
  }
}

const props = withDefaults(defineProps<Props>(), 
  { days: 5, startTime: () => ({ hour: 0, minute: 0 }) })

const router = useRouter()
const eventBusStore = useEventBusStore()

type State = {
  isHover: boolean
  mouseOffsetY: number
  dragOffsetY: number
  styleObject: StyleValue
}
const stateMap = reactive(new Map<number, State>()) // timeId -> State

const eventBriefIndexed = reactive(new Map<string, EventBriefVO[]>())
const getData = async (start: Date, end: Date) => {
  // @ts-ignore
  const eventBriefs: EventBriefVO[] = await window.api.findEventsBetween(
    { start, end }
  )
  for (const eventBrief of eventBriefs) {
    const key = DateTime.fromJSDate(eventBrief.start!).toFormat('yyyy/M/d') // 一定不会是 null
    if (eventBriefIndexed.has(key)) {
      eventBriefIndexed.get(key)!.push(eventBrief) // 一定不会是 undefined
    }
    else {
      eventBriefIndexed.set(key, [eventBrief])
    }
    // 初始化
    if (!stateMap.has(eventBrief.id)) {
      stateMap.set(eventBrief.id, {
        isHover: false,
        mouseOffsetY: 0,
        dragOffsetY: 0,
        styleObject: {}
      })
      stateMap.get(eventBrief.id)!.styleObject = getEventStyle(eventBrief) // 一定不会是 undefined
    }
  }
}

const handleDataUpdate = () => {
  getData(DateTime.now().startOf('day').toJSDate(), 
          DateTime.now().plus({day: props.days}).endOf('day').toJSDate())
}
eventBusStore.subscribe(Event.DataUpdated, handleDataUpdate)
handleDataUpdate()

onBeforeUnmount(() => {
  eventBusStore.unsubscribe(Event.DataUpdated, handleDataUpdate)
})

const getEventBriefsByOffset = computed(() => {
  return (offset: number) => {
    return eventBriefIndexed.get(DateTime.now().plus({day: offset - 1}).toFormat('yyyy/M/d'))
  }
})

const colors = [
  '#f56c6c', '#e6a23c', '#409eff', '#67c23a', '#909399',
  '#FFC0CB', '#E6E6FA', '#00BFFF', '#FF7F50', '#98FB98', 
  '#87CEEB', '#FFFF00', '#800080', '#FFB6C1', '#808000'
]
const colorMap = new Map<number, number>() // scheduleId -> colorIndex

const handleMouseOver = (event: EventBriefVO) => {
  if (stateMap.has(event.id)) {
    // @ts-ignore
    stateMap.get(event.id).isHover = true // 一定不会是 undefined
    // @ts-ignore
    stateMap.get(event.id).styleObject = getEventStyle(event) // 一定不会是 undefined
  }
}

const handleMouseLeave = (event: EventBriefVO) => {
  if (stateMap.has(event.id)) {
    // @ts-ignore
    stateMap.get(event.id).isHover = false // 一定不会是 undefined
    // @ts-ignore
    stateMap.get(event.id).styleObject = getEventStyle(event) // 一定不会是 undefined
  }
}

const titleHeight = '4.8vh'
const dayCardContainerHeight = '81vh'

const getEventStyle = (event: EventBriefVO) => {
  const minutePerDay = 1440
  const dayCardHeight = toPx(dayCardContainerHeight) - toPx(titleHeight)
  const pxPerMinute = dayCardHeight / minutePerDay
  const start = DateTime.fromJSDate(event.start!) // 一定不会是 null
  const end = DateTime.fromJSDate(event.end)
  const { start: _start, duration } = getStartAndDuration(start, event.startMark, end, event.endMark)
  const top = (_start.diff(_start.startOf('day').set(props.startTime), 'minutes').minutes + minutePerDay) % minutePerDay * pxPerMinute + toPx(titleHeight)
  const height = duration * pxPerMinute
  let colorIndex = 0
  if (colorMap.has(event.scheduleId)) {
    colorIndex = colorMap.get(event.scheduleId)! // 一定不会是 undefined
  }
  else {
    colorIndex = Math.floor(Math.random() * colors.length)
    colorMap.set(event.scheduleId, colorIndex)
  }
  let styleObject: StyleValue = {}
  if (stateMap.has(event.id)) {
    const dragOffset = stateMap.get(event.id)!.dragOffsetY // 一定不会是 undefined
    styleObject =  {
      top: `${top + dragOffset}px`,
      height: `${height}px`,
      lineHeight: `${height}px`,
      backgroundColor: `${colors[colorIndex]}${65}`,
      border: `1.5px solid ${colors[colorIndex]}`,
    }
    if (stateMap.get(event.id)!.isHover) { // 一定不会是 undefined
      styleObject['z-index'] = 999
      styleObject['background-color'] = `${colors[colorIndex]}${90}`
      styleObject['box-shadow'] = '5px 5px 10px #eee'
    }
  }
  return styleObject
}

const handleClick = (event: EventBriefVO) => {
  router.push({ name: 'schedule', params: { id: event.scheduleId } })
}

const handleDragStart = (event, eventBrief: EventBriefVO) => {
  if (stateMap.has(eventBrief.id)) {
    stateMap.get(eventBrief.id)!.mouseOffsetY = event.offsetY // 一定不会是 undefined
  }
}

const handleDragEnd = (event, eventBrief: EventBriefVO) => {
  if (stateMap.has(eventBrief.id)) {
    stateMap.get(eventBrief.id)!.dragOffsetY += 
    (event.offsetY - stateMap.get(eventBrief.id)!.mouseOffsetY) // 一定不会是 undefined
  }
}

</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-wrap: nowrap;
  height: v-bind(dayCardContainerHeight);
}

.day-card {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  text-align: center; 
  border: 1px solid #eee;
  border-radius:  4px;
  box-sizing: border-box;
  word-break: break-word;

  .title {
    height: v-bind(titleHeight);
    line-height: v-bind(titleHeight);
    border-bottom: 1px solid #eee;
    background-color: #fafafc;
  }

  .event-card {
    position: absolute;
    left: 0;
    width: 100%;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
  }
}
</style>