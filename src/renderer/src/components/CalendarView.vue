<template>
  <n-calendar
    v-model:value="value"
    @update:value="handleUpdateValue"
    #="{ year, month, date }"
  >
    <div 
      v-for="time in store.getTimeData(`${year}/${month}/${date}`)" 
      :key="time.id"
      class="schedule-card"
    >
      <span class="name"> {{ store.getScheduleData(time.scheduleId)?.name }} </span>
      <span class="time"> {{ DateTime.fromJSDate(new Date(time.start)).toFormat('HH:mm') }} </span>
    </div>
  </n-calendar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@renderer/store/index'
import { NCalendar, NGrid, NGi } from 'naive-ui';
import { DateTime } from 'luxon'

const store = useStore()

const value = ref(new Date().valueOf())

const handleUpdateValue = (
  _: number,
  { year, month, date }: { year: number; month: number; date: number }
) => {
  console.log(`${year}-${month}-${date}`)
}
</script>

<style lang="less" scoped>
.schedule-card {
  // padding: 8px;
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