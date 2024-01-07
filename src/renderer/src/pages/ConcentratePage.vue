<template>
  <div class="main">
    <n-config-provider :theme="darkTheme">
      <n-page-header
        @back="handleBack"
        :show-breadcrumb="false"
        :show-title-separator="false"
      >
        <template #title>
          <n-select 
            v-model:value="todo.id" 
            :options="todoNameOptions"
            style="width: 20vw;"
            @update:value="handleTodoChange"
          />
        </template>
      </n-page-header>
      <div style="display: flex; justify-content: center; padding: 20vh 0 0 0;">
        <div style="display: flex; flex-direction: column;">
          <div>
            <div class="watch-strap watch-strap-bottom"></div>
            <div class="watch-strap watch-strap-top"></div>
            <div class="watch-panel"></div>
            <n-progress type="multiple-circle"
              :circle-gap="1"
              :percentage="percentage"
            >
              <span style="text-align: center; font-size: 3.6vh;">
                <n-countdown 
                  :duration="duration[period[curPeriod]]" 
                  :active="active"
                  :render="renderCountdown"
                />
              </span>
            </n-progress>
          </div>
          <div style="font-size: 3vh ;text-align: center; color: white; padding: 7.2vh 0 1.6vh 0; z-index: 1;">
            {{ periodTitle[period[curPeriod]] }}
          </div>
          <div style="font-size: 1.4vh ;text-align: center; color: #001428; z-index: 1;">
            {{ totalTime.toFormat('hh:mm:ss') }}
          </div>
        </div>
      </div>
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDataStore, useSettingsStore } from '@renderer/store'
import { darkTheme, NPageHeader, NSelect, NProgress, NCountdown, NConfigProvider, useNotification } from 'naive-ui'
import { CountdownProps } from 'naive-ui'
import { TodoBriefVO } from '@utils/vo'
import { DateTime } from 'luxon'
import { apiHandler } from '@renderer/apis/scheduleController'

const router = useRouter()
const route = useRoute()
const timeId = route.params.timeId as string

const dataStore = useDataStore()
const settingsStore = useSettingsStore()
const notification = useNotification()

const handleBack = () => {
  router.back()
}

let todo: Ref<TodoBriefVO> = ref(dataStore.getTodoByTimeId(timeId))

// 整个页面的开始时间
const startTime = DateTime.now()
// todo 的开始时间
const todoTime = ref(DateTime.now())

const calTotalTime = () => {
  const endTime = DateTime.now()
  const duration = endTime.diff(startTime, 'milliseconds')
  return duration
}
const totalTime = ref(calTotalTime())

const createRecord = async () => {
  // 不足 1 分钟不记录
  if (DateTime.now().diff(todoTime.value, 'milliseconds').as('minutes') < 1) {
    return
  }
  const scheduleId = todo.value.scheduleId
  const record = {
    scheduleId: scheduleId,
    startTime: todoTime.value.toISO(),
    endTime: DateTime.now().toISO(),
  }
  await apiHandler({
    group: 'schedule',
    name: 'createRecord', 
    params: record,
    notification: {
      composable: notification,
      successNotification: false,
      failureNotification: true
    }
  })
  // 只有 Schedule Page 需要 Record，Schedule Page 打开时会主动获取新数据，所以不需要 publish
}

onBeforeUnmount(() => {
  createRecord()
})

const todoNameOptions = dataStore.getTodoNames().map((item) => {
  return {
    label: item.name,
    value: item.timeId
  }
})

const handleTodoChange = (value: string) => {
  createRecord().then(() => {
    todoTime.value = DateTime.now()
    todo.value = dataStore.getTodoByTimeId(value)
  })
}

const duration = {
  'focus': (settingsStore.getValue('pomodoro.focus.hour')*3600 + settingsStore.getValue('pomodoro.focus.minute')*60)*1000,
  'smallBreak': (settingsStore.getValue('pomodoro.smallBreak.hour')*3600 + settingsStore.getValue('pomodoro.smallBreak.minute')*60)*1000,
  'bigBreak': (settingsStore.getValue('pomodoro.bigBreak.hour')*3600 + settingsStore.getValue('pomodoro.bigBreak.minute')*60)*1000
}

const periodTitle = {
  'focus': 'Focusing',
  'smallBreak': 'Take A Break',
  'bigBreak': 'Take A Break'
}
const period = ['focus', 'smallBreak', 'focus', 'smallBreak', 'focus', 'smallBreak', 'focus', 'bigBreak']
const curPeriod = ref(0)

const percentage = ref([0])
const active = ref(true)

const renderCountdown: CountdownProps['render'] = ({
  hours,
  minutes,
  seconds
}) => {
  percentage.value[0] = 
    Math.floor((duration[period[curPeriod.value]] - (hours*60*60 + minutes*60 + seconds)*1000) / 
    duration[period[curPeriod.value]] * 100)

    totalTime.value = calTotalTime()
  
  if (hours === 0 && minutes === 0 && seconds === 0) {
    curPeriod.value = (curPeriod.value + 1) % period.length
    
    if (period[curPeriod.value] === 'focus') {
      new Notification(`Time to Focus`).onclick = () => {}
    }
    else if (period[curPeriod.value].includes('Break')) {
      new Notification(`Take a Break`).onclick = () => {}
    }
  }

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

</script>

<style scoped lang="less">
.main {
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 1rem;
  padding: 6vh 8vw;
  background-color: #001428;
  box-sizing: border-box;
}

.watch-panel {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #001428;
  z-index: 0;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3), -5px -5px 10px rgba(255, 255, 255, 0.8);
}

@watch-strap-width: 98px;
@watch-strap-height: 340px;
// @watch-strap-color: #1f3142;
@watch-strap-color: #304c66;
.watch-strap {
  position: absolute;
  width: @watch-strap-width;
  height: @watch-strap-height;
  background-color: @watch-strap-color;
  z-index: 0;
}

.watch-strap::after {
  content: '';
  display: block;
  position: absolute;
  width: @watch-strap-width; /* 半圆的宽度，与手表带宽度相同 */
  height: (@watch-strap-width / 2); /* 半圆的高度，是手表带宽度的一半 */
  background-color: @watch-strap-color;
  border-radius: 50%;
  bottom: -20px; /* 负值为半圆高度的一半，使得半圆和矩形无缝连接 */
  left: 0;
}

.watch-strap-top {
  left: 50%; /* 水平居中 */
  top: -196px;
  transform: translateX(-50%); /* 水平居中 */
  transform-origin: center bottom; /* 设置旋转的原点为中心底部 */
  transform: translateX(-50%) rotate(-180deg); /* 水平居中并旋转180度 */
}

.watch-strap-bottom {
  left: 50%; /* 水平居中 */
  top: 480px;
  transform: translateX(-50%); /* 水平居中 */
}
</style>