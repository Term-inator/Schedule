<template>
  <div class="container" ref="dayCardContainerRef">
    <div v-for="i in props.days" 
      class="day-card"
    >
      <div class="title">
        {{ DateTime.now().plus({day: i - 1}).toFormat('yyyy/M/d') }}
      </div>
      <template v-if="getEventBriefsByOffset(i)">
        <div v-for="event in getEventBriefsByOffset(i)" 
          :style="getEventStyle(event)"
          @mouseover="handleMouseOver(event)"
          @mouseleave="handleMouseLeave(event)"
          @dragstart="handleDragStart($event, event)"
          @dragend="handleDragEnd($event, event)"
          draggable="true"
          class="event-card"
        >
          {{ event.name }}
          {{ DateTime.fromJSDate(event.start).toFormat('HH:mm') }} -
          {{ DateTime.fromJSDate(event.end).toFormat('HH:mm') }}
        </div>
      </template>
      <template v-else>
        <n-empty description="No Events">
          <template #extra>
            <n-button size="small">
              Add
            </n-button>
          </template>
        </n-empty>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive, computed, ref } from 'vue'
import { NEmpty, NButton } from 'naive-ui'
import { DateTime } from 'luxon'
import { EventBriefVO } from '@utils/vo'

const props = withDefaults(defineProps<
  { days: number, startTime: { hour: number, minute: number } }>(), { startTime: { hour: 0, minute: 0 } })
const dayCardContainerRef = ref(null)

type State = {
  isHover: boolean
  mouseOffsetY: number
  dragOffsetY: number
}
const stateMap = reactive(new Map<number, State>()) // timeId -> State

const eventBriefIndexed = reactive(new Map<string, EventBriefVO[]>())
const getData = async (start: Date, end: Date) => {
  const eventBriefs: EventBriefVO[] = await window.api.findEventsBetween(
    { start, end }
  )
  for (const eventBrief of eventBriefs) {
    const key = DateTime.fromJSDate(eventBrief.start).toFormat('yyyy/M/d')
    if (eventBriefIndexed.has(key)) {
      eventBriefIndexed.get(key).push(eventBrief)
    }
    else {
      eventBriefIndexed.set(key, [eventBrief])
    }
    // 初始化
    if (!stateMap.has(eventBrief.id)) {
      stateMap.set(eventBrief.id, {
        isHover: false,
        mouseOffsetY: 0,
        dragOffsetY: 0
      })
    }
  }
}

getData(DateTime.now().startOf('day').toJSDate(), 
        DateTime.now().plus({day: props.days}).endOf('day').toJSDate())

const getEventBriefsByOffset = computed(() => {
  return (offset: number) => {
    return eventBriefIndexed.get(DateTime.now().plus({day: offset - 1}).toFormat('yyyy/M/d'))
  }
})

const heightRatio = 100 / 1440
const colors = [
  '#f56c6c', '#e6a23c', '#409eff', '#67c23a', '#909399',
  '#FFC0CB', '#E6E6FA', '#00BFFF', '#FF7F50', '#98FB98', 
  '#87CEEB', '#FFFF00', '#800080', '#FFB6C1', '#808000'
]
const colorMap = new Map<number, number>() // scheduleId -> colorIndex

const handleMouseOver = (event: EventBriefVO) => {
  stateMap.get(event.id).isHover = true
}

const handleMouseLeave = (event: EventBriefVO) => {
  stateMap.get(event.id).isHover = false
}

const getEventStyle = computed(() => {
  return (event: EventBriefVO) => {
    const start = DateTime.fromJSDate(event.start)
    const end = DateTime.fromJSDate(event.end)
    const duration = end.diff(start, 'minutes').minutes
    const top = start.diff(start.startOf('day').set(props.startTime), 'minutes').minutes * heightRatio
    const height = duration * heightRatio
    let colorIndex = 0
    if (colorMap.has(event.scheduleId)) {
      colorIndex = colorMap.get(event.scheduleId)
    }
    else {
      colorIndex = Math.floor(Math.random() * colors.length)
      colorMap.set(event.scheduleId, colorIndex)
    }
    const dragOffset = stateMap.get(event.id).dragOffsetY
    const styleObject =  {
      top: `${top / 100 * dayCardContainerRef.value.clientHeight + dragOffset}px`,
      height: `${height / 100 * dayCardContainerRef.value.clientHeight}px`,
      lineHeight: `${height / 100 * dayCardContainerRef.value.clientHeight}px`,
      backgroundColor: `${colors[colorIndex]}${65}`,
      border: `1.5px solid ${colors[colorIndex]}`,
    }
    if (stateMap.get(event.id).isHover) {
      styleObject['z-index'] = 999
      styleObject['background-color'] = `${colors[colorIndex]}${90}`
      styleObject['box-shadow'] = '5px 5px 10px #eee'
    }
    return styleObject
  }
})

const handleDragStart = (event, eventBrief: EventBriefVO) => {
  stateMap.get(eventBrief.id).mouseOffsetY = event.offsetY
}

const handleDragEnd = (event, eventBrief: EventBriefVO) => {
  stateMap.get(eventBrief.id).dragOffsetY += (event.offsetY - stateMap.get(eventBrief.id).mouseOffsetY)
}

</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-wrap: nowrap;
  height: 76vh;
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
    height: 4.8vh;
    line-height: 4.8vh;
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