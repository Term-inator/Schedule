<template>
  <div v-if="props.show" class="overlay" @show="handleShow" @hide="handleHide">
    <n-spin :size="128" :show="props.show" stroke="#3498db" class="loader">
      <template #description>
        <div class="info">{{ props.info }} {{ pending }}</div>
      </template>
    </n-spin>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { NSpin } from 'naive-ui'
// TODO
// removeListener
// ban mouse actions
type Props = {
  info?: string
  show?: boolean
}

const props = withDefaults(defineProps<Props>(), { info: 'Loading', show: false })

const emit = defineEmits(['show', 'hide'])

const disableMouseEvent = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
}

type MouseEventType =
  | 'click'
  | 'mousedown'
  | 'mouseup'
  | 'dblclick'
  | 'contextmenu'
  | 'mouseover'
  | 'mouseout'
  | 'mouseenter'
  | 'mouseleave'
  | 'mousemove'
const mouseEvents: MouseEventType[] = [
  'click',
  'mousedown',
  'mouseup',
  'dblclick',
  'contextmenu',
  'mouseover',
  'mouseout',
  'mouseenter',
  'mouseleave',
  'mousemove'
]
const disableMouseEvents = () => {
  mouseEvents.forEach((eventName) => {
    document.addEventListener(eventName, disableMouseEvent, true)
  })
}

const enableMouseEvents = () => {
  mouseEvents.forEach((eventName) => {
    document.removeEventListener(eventName, disableMouseEvent, true)
  })
}

const pending = ref('')
let interval: NodeJS.Timeout
const handleShow = () => {
  interval = setInterval(() => {
    if (pending.value.length >= 3) {
      pending.value = ''
    }
    pending.value += '.'
  }, 500)
  disableMouseEvents()
}

const handleHide = () => {
  if (interval) {
    clearInterval(interval)
  }
  enableMouseEvents()
}

watch(
  () => props.show,
  (newVal, _) => {
    if (newVal) {
      handleShow()
      console.log('show')
      emit('show')
    } else {
      handleHide()
      console.log('hide')
      emit('hide')
    }
  }
)
</script>

<style lang="less" scoped>
.overlay {
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.info {
  font-size: 1.8rem;
  color: white;
}
</style>
