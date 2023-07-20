<template>
  <div class="main">
    <n-card v-for="group in groups"
      :segmented="{ content: true }"
    >
      <template #header><b>{{ group.name }}</b></template>
      <div class="settings">
        <div v-for="item in group.items">
          <span class="label">{{ item.label }}</span>
          <component :is="item.render"></component>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, h } from 'vue'
import { useSettingsStore } from '@renderer/store'
import { NCard, NSelect, SelectOption, SelectGroupOption, NRadioGroup, NRadio, NInputNumber } from 'naive-ui'
import { getTimeZoneAbbrMap } from '../../../utils/timeZone' // 用 @ 报错，原因未知

const settingsStore = useSettingsStore()

const timeZoneAbbrMap = getTimeZoneAbbrMap()
const getTimeZoneOptions = () => {
  const options: Array<SelectOption | SelectGroupOption> = []
  for (const abbr of timeZoneAbbrMap.keys()) {
    options.push({
      type: 'group',
      label: abbr,
      key: abbr,
      children: Array.from(timeZoneAbbrMap.get(abbr)).map((tz) => {
        return {
          label: tz,
          value: tz
        }
      })
    })
  }
  return options
}
const timeZoneOptions = getTimeZoneOptions()

const groups = reactive([
  {
    name: 'RRule',
    items: [
      {
        label: 'Time Zone',
        render: () => {
          return h(NSelect, {
            options: timeZoneOptions,
            filterable: true,
            value: settingsStore.value.timeZone,
            onUpdateValue: (value) => {
              settingsStore.setValue('timeZone', value)
            },
            style: {
              width: '10rem'
            }
          })
        }
      },
      {
        label: 'WKST',
        render: () => {
          return h(NRadioGroup, {
            value: settingsStore.value.wkst,
            onUpdateValue: (value) => {
              settingsStore.setValue('wkst', value)
            }
          }, [
            h(NRadio, { value: 'MO' }, { default: () => 'MO' }),
            h(NRadio, { value: 'TU' }, { default: () => 'TU' }),
            h(NRadio, { value: 'WE' }, { default: () => 'WE' }),
            h(NRadio, { value: 'TH' }, { default: () => 'TH' }),
            h(NRadio, { value: 'FR' }, { default: () => 'FR' }),
            h(NRadio, { value: 'SA' }, { default: () => 'SA' }),
            h(NRadio, { value: 'SU' }, { default: () => 'SU' }),
          ])
        }
      },
    ]
  },
  {
    name: 'Preferences',
    items: [
      {
        label: 'Priority',
        render: () => {
          return h(NRadioGroup, {
            value: settingsStore.value.priority,
            onUpdateValue: (value) => {
              settingsStore.setValue('priority', value)
            }
          }, [
            h(NRadio, { value: 'month' }, { default: () => 'MonthView' }),
            h(NRadio, { value: 'week' }, { default: () => 'WeekView' }),
          ])
        }
      },
      {
        label: 'Week View Days',
        render: () => {
          return h(NInputNumber, {
            min: 3,
            max: 7,
            value: settingsStore.value.days,
            onUpdateValue: (value) => {
              settingsStore.setValue('days', value)
            },
            style: {
              width: '10rem'
            }
          })
        }
      },
      {
        label: 'Week View Start Time',
        render: () => {
          return h('span', {
            style: {
              display: 'flex',
              gap: '0.5rem'
            }
          }, [
            h(NInputNumber, {
              min: 0,
              max: 23,
              value: settingsStore.value.startTime.hour,
              onUpdateValue: (value) => {
                settingsStore.setValue('startTime', { hour: value })
              },
              style: {
                width: '6rem'
              }
            }),
            h('span', { style: { lineHeight: '2rem' } }, ':'),
            h(NInputNumber, {
              min: 0,
              max: 59,
              value: settingsStore.value.startTime.minute,
              onUpdateValue: (value) => {
                settingsStore.setValue('startTime', { minute: value })
              },
              style: {
                width: '6rem'
              }
            })
          ])
        }
      }
    ]
  }
])
</script>

<style lang="less" scoped>
.main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 6vh 8vw;
}

.settings {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  div {
    display: flex;
    gap: 1rem;
    font-size: medium;
  }

  .label {
    display: inline-block;
    width: 12rem;
    text-align: left;
    font-weight: bold;
    margin: 0 1rem 0 0;
  }
}
</style>