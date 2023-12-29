import { prisma } from './client'
import { Time } from '@prisma/client'
import { AlarmVO } from '../utils/vo'
import { parseTimeWithUnknown } from '../utils/unknownTime'
import { DateTime } from 'luxon'
import { Notification } from 'electron'
import { getSettingsByPath } from './service/settingsService'


class AlarmObserver {
  private alarms: AlarmVO[] = []
  private seconds: number = 30 // 多少秒检查一次是否有提醒
  private timer: NodeJS.Timeout | null = null // 防抖

  constructor() {
    this.update()
    // 每 30 秒检查一次是否有提醒
    setInterval(this.polling().bind(this), 1000 * this.seconds)
  }

  private update() {
    this.alarms = []
    if (getSettingsByPath('alarm.todo.enable')) {
      findAllAlarms('todo').then((alarms) => {
        this.alarms.push(...alarms)
      })
    }
    if (getSettingsByPath('alarm.event.enable')) {
      findAllAlarms('event').then((alarms) => {
        this.alarms.push(...alarms)
      })
    }
  }

  debouncedUpdate() {
    // 在 createSchedule 和 updateSchedule 时调用，防止频繁更新
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(this.update.bind(this), 500)
  }

  polling() {
    const now = DateTime.now().setZone(getSettingsByPath('rrule.timeZone'))
    const alarm: AlarmVO[] = this.alarms.filter((alarm: AlarmVO) => {
      const alarmTime = calAlarmTime(alarm.type, alarm.start ?? alarm.end)
      if (!alarmTime) {
        console.error(`alarmTime is null, alarm: ${JSON.stringify(alarm)}`)
        return false
      }
      return now > DateTime.fromISO(alarmTime).minus({ second: this.seconds }) && now < DateTime.fromISO(alarmTime)
    })

    if (alarm) {
      for (const a of alarm) {
        notify(a)
      }
    }
    return this.polling
  }
}

// 保证只有一个实例
const globalForAlarmObserver = globalThis as unknown as { alarmObserver: AlarmObserver }
export const alarmObserver = globalForAlarmObserver.alarmObserver || new AlarmObserver()
globalForAlarmObserver.alarmObserver = alarmObserver


async function findAllAlarms(scheduleType: string) {
  const res: AlarmVO[] = []

  const now = DateTime.now().setZone('UTC')
  const date = DateTime.now().plus({day: 2}).setZone('UTC') // 最多提前1天提醒

  let times: Time[]
  if (scheduleType == 'todo') {
    times = await prisma.time.findMany({
      where: {
        start: null,
        end: {
          gte: now.toISO()!, // 一定合法，所以不会是 null
          lte: date.toISO()! // 一定合法，所以不会是 null
        },
        done: false,
        deleted: false,
      }
    })
  }
  else if (scheduleType == 'event') {
    times = await prisma.time.findMany({
      where: {
        start: {
          not: null,
          gte: now.toISO()!, // 一定合法，所以不会是 null
          lte: date.toISO()! // 一定合法，所以不会是 null
        },
        done: false,
        deleted: false,
      }
    })
  }
  else {
    console.error(`Invalid scheduleType: ${scheduleType}`)
    times = []
  }

  // 根据 deleteScheduleById 的实现，scheudle 被删除时，其 time 也会被删除，所以这里不需要判断 schedule 是否 deleted
  for (const time of times) {
    const schedule = await prisma.schedule.findUniqueOrThrow({
      where: {
        id: time.scheduleId
      }
    })
    res.push({
      id: time.id,
      scheduleId: time.scheduleId,
      type: scheduleType,
      name: schedule.name,
      comment: schedule.comment,
      start: time.start,
      end: time.end,
      startMark: time.startMark,
      endMark: time.endMark
    })
  }
  return res
}

const calAlarmTime = (scheduleType: string, time: string): string | null => {
  return DateTime.fromISO(time).setZone(getSettingsByPath('rrule.timeZone'))
                 .minus({ 
                    hour: getSettingsByPath(`alarm.${scheduleType}.before.hour`),
                    minute: getSettingsByPath(`alarm.${scheduleType}.before.minute`)
                  })
                 .toISO()
}

const notify = (alarm: AlarmVO) => {
  let body: string
  if (alarm.type == 'todo') {
    body = `${alarm.comment}\n${parseTimeWithUnknown(alarm.end, alarm.endMark, getSettingsByPath('rrule.timeZone'))}`
  }
  else {
    body = `${alarm.comment}\n${parseTimeWithUnknown(alarm.start, alarm.startMark, getSettingsByPath('rrule.timeZone'))}-${parseTimeWithUnknown(alarm.end, alarm.endMark, getSettingsByPath('rrule.timeZone'))}`
  }
  new Notification({ title: `${alarm.type}: ${alarm.name}`, body: body }).show()
}