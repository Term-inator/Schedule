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
import { reactive, h, defineAsyncComponent } from 'vue'
import { useEventBusStore, Event, useSettingsStore, useRuntimeStore } from '@renderer/store'
import { NSpace, NCard, NSelect, SelectOption, SelectGroupOption, NRadioGroup, NRadio, NInputNumber, NSwitch } from 'naive-ui'
import { getTimeZoneAbbrMap } from '../../../utils/timeZone' // 用 @ 报错，原因未知
import { apiHandler } from '@renderer/apis/scheduleController'

const eventBusStore = useEventBusStore()
const settingsStore = useSettingsStore()
const runtimeStore = useRuntimeStore()
const InputTimeAsync = defineAsyncComponent(() => import('@renderer/components/InputTime.vue'))

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
            value: settingsStore.getValue('rrule.timeZone'),
            onUpdateValue: (value) => {
              settingsStore.setValue('rrule.timeZone', value)
              eventBusStore.publish(Event.TimeZoneUpdated)
            },
            style: {
              width: '15rem'
            }
          })
        }
      },
      {
        label: 'WKST',
        render: () => {
          return h(NRadioGroup, {
            value: settingsStore.getValue('rrule.wkst'),
            onUpdateValue: (value) => {
              settingsStore.setValue('rrule.wkst', value)
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
    name: 'Alarm',
    items: [
      {
        label: 'Todo',
        render: () => {
          return h(NSpace, {
            size: 'large'
          }, [
            h(NSwitch, {
              value: settingsStore.getValue('alarm.todo.enable'),
              onUpdateValue: (value) => {
                settingsStore.setValue('alarm.todo.enable', value)
              },
            }),
            h(InputTimeAsync as any, {
              value: {
                hour: settingsStore.getValue('alarm.todo.before.hour'),
                minute: settingsStore.getValue('alarm.todo.before.minute')
              },
              disabled: !settingsStore.getValue('alarm.todo.enable'),
              'onUpdate:value': (value) => {
                settingsStore.setValue('alarm.todo.before.hour', value.hour)
                settingsStore.setValue('alarm.todo.before.minute', value.minute)
              },
              style: {
                width: '6rem'
              }
            })
          ])
        }
      },
      {
        label: 'Event',
        render: () => {
          return h(NSpace, {
            size: 'large'
          }, [
            h(NSwitch, {
              value: settingsStore.getValue('alarm.event.enable'),
              onUpdateValue: (value) => {
                settingsStore.setValue('alarm.event.enable', value)
              },
            }),
            h(InputTimeAsync as any, {
              value: {
                hour: settingsStore.getValue('alarm.event.before.hour'),
                minute: settingsStore.getValue('alarm.event.before.minute')
              },
              disabled: !settingsStore.getValue('alarm.event.enable'),
              'onUpdate:value': (value) => {
                settingsStore.setValue('alarm.event.before.hour', value.hour)
                settingsStore.setValue('alarm.event.before.minute', value.minute)
              },
              style: {
                width: '6rem'
              }
            })
          ])
        }
      }
    ]
  },
  {
    name: 'Preferences',
    items: [
      {
        label: 'Priority',
        render: () => {
          return h(NRadioGroup, {
            value: settingsStore.getValue('preferences.priority'),
            onUpdateValue: (value) => {
              settingsStore.setValue('preferences.priority', value)
              runtimeStore.homepage.priority = value
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
            value: settingsStore.getValue('preferences.days'),
            onUpdateValue: (value) => {
              settingsStore.setValue('preferences.days', value)
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
          return h(NSpace, null, [
            h(NInputNumber, {
              min: 0,
              max: 23,
              value: settingsStore.getValue('preferences.startTime.hour'),
              onUpdateValue: (value) => {
                settingsStore.setValue('preferences.startTime.hour', value)
              },
              style: {
                width: '6rem'
              }
            }),
            h('span', { style: { lineHeight: '2rem' } }, ':'),
            h(NInputNumber, {
              min: 0,
              max: 59,
              value: settingsStore.getValue('preferences.startTime.minute'),
              onUpdateValue: (value) => {
                settingsStore.setValue('preferences.startTime.minute', value)
              },
              style: {
                width: '6rem'
              }
            })
          ])
        }
      },
      {
        label: 'Open At Login',
        render: () => {
          return h(NSwitch, {
            value: settingsStore.getValue('preferences.openAtLogin'),
            onUpdateValue: (value) => {
              settingsStore.setValue('preferences.openAtLogin', value)
            }
          })
        }
      }
    ]
  },
  {
    name: 'Pomodoro',
    items: [
      {
        label: 'Focus Time',
        render: () => {
          return h(InputTimeAsync as any, {
            value: {
              hour: settingsStore.getValue('pomodoro.focus.hour'),
              minute: settingsStore.getValue('pomodoro.focus.minute')
            },
            'onUpdate:value': (value) => {
              settingsStore.setValue('pomodoro.focus.hour', value.hour)
              settingsStore.setValue('pomodoro.focus.minute', value.minute)
            },
            style: {
              width: '6rem'
            }
          })
        }
      },
      {
        label: 'Small Break',
        render: () => {
          return h(InputTimeAsync as any, {
            value: {
              hour: settingsStore.getValue('pomodoro.smallBreak.hour'),
              minute: settingsStore.getValue('pomodoro.smallBreak.minute')
            },
            'onUpdate:value': (value) => {
              settingsStore.setValue('pomodoro.smallBreak.hour', value.hour)
              settingsStore.setValue('pomodoro.smallBreak.minute', value.minute)
            },
            style: {
              width: '6rem'
            }
          })
        }
      },
      {
        label: 'Big Break',
        render: () => {
          return h(InputTimeAsync as any, {
            value: {
              hour: settingsStore.getValue('pomodoro.bigBreak.hour'),
              minute: settingsStore.getValue('pomodoro.bigBreak.minute')
            },
            'onUpdate:value': (value) => {
              settingsStore.setValue('pomodoro.bigBreak.hour', value.hour)
              settingsStore.setValue('pomodoro.bigBreak.minute', value.minute)
            },
            style: {
              width: '6rem'
            }
          })
        }
      }
    ]
  },
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