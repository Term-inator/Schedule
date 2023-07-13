<template>
  <n-calendar
    v-model:value="value"
    @update:value="handleUpdateValue"
    #="{ year, month, date }"
  >
    <div>
      <div v-for="item in timeData[`${year}/${month}/${date}`]"  class="event-card">
        <div>
          {{ scheduleData[item.scheduleId]["name"] }}
        </div>
        {{ DateTime.fromJSDate(new Date(item.start)).toFormat('HH:mm') }} - {{ DateTime.fromJSDate(new Date(item.end)).toFormat('HH:mm')}}
      </div>
    </div>
  </n-calendar>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NCalendar } from 'naive-ui';
import { DateTime } from 'luxon'

const timeData = ref({})
const scheduleData = ref({})

const getData = async () => {
  const time = await window.api.readTime({
    where: {
      done: false,
      deleted: false
    }
  })
  const scheduleIds = new Set()
  for (const item of time) {
    const dt = DateTime.fromJSDate(new Date(item.start))
    if (!timeData.value[`${dt.year}/${dt.month}/${dt.day}`]) {
      timeData.value[`${dt.year}/${dt.month}/${dt.day}`] = []
    }
    timeData.value[`${dt.year}/${dt.month}/${dt.day}`].push(item)
    scheduleIds.add(item.scheduleId)
  }

  const schedule = await window.api.readSchedule({
    where: {
      id: {
        in: [...scheduleIds]
      }
    }
  })
  console.log(schedule)
  for (const item of schedule) {
    scheduleData.value[item.id] = item
  }
  console.log(scheduleData.value)
}

onMounted(() => {
  console.log('mounted')
  getData()
})

const value = ref(new Date().valueOf())

const handleUpdateValue = (
  _: number,
  { year, month, date }: { year: number; month: number; date: number }
) => {
  console.log(`${year}-${month}-${date}`)
}

const handlePanelChange = async (
  {year, month}: {year: number, month: number
}) => {
  const time = await window.api.readTime({
    where: {
      done: false
    }
  })
  console.log(time)
}
</script>

<style scoped>
.event-card {
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 0 0 4px #eee;
}

.event-card + .event-card {
  margin-top: 8px;
}

.event-card:hover {
  border-width: 2px;
  border-color: rgba(24, 160, 88);
  background-color: white;
  transition: all 0.2s ease-in-out;
}
</style>