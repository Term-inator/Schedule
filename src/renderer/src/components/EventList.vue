<template>
  <MonthView v-if="props.priority === 'month'" />
  <WeekView v-else-if="props.priority === 'week'" 
    :days="settingsStore.getValue('preferences.days')"
    :startTime="{
      hour: settingsStore.getValue('preferences.startTime.hour'),
      minute: settingsStore.getValue('preferences.startTime.minute')  
    }"
  />
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useSettingsStore } from '@renderer/store'
import MonthView from './MonthView.vue'
import WeekView from './WeekView.vue'

const settingsStore = useSettingsStore()

const props = withDefaults(defineProps<{
  priority: string
}>(), {
  priority: 'month'
})

</script>