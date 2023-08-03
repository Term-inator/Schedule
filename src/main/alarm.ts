import { prisma } from './client'
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
    if (getSettingsByPath('alarm.schedule.enable')) {
      findAllAlarms('schedule').then((alarms) => {
        this.alarms.push(...alarms)
      })
    }
  }

  debouncedUpdate() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(this.update.bind(this), 500)
  }

  polling() {
    const now = DateTime.now()
    const alarm: AlarmVO[] = this.alarms.filter((alarm: AlarmVO) => {
      const alarmTime = calAlarmTime(alarm.type, alarm.start ?? alarm.end)
      return now > DateTime.fromJSDate(alarmTime).minus({ second: this.seconds }) && now < DateTime.fromJSDate(alarmTime)
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

  const now = DateTime.now()
  // 最多提前1天提醒
  const date = DateTime.now().plus({day: 2})

  let times
  if (scheduleType == 'todo') {
    times = await prisma.time.findMany({
      where: {
        start: null,
        end: {
          gte: now.toJSDate(),
          lte: date.toJSDate()
        },
        done: false,
        deleted: false,
      }
    })
  }
  else {
    times = await prisma.time.findMany({
      where: {
        start: {
          not: null,
          gte: now.toJSDate(),
          lte: date.toJSDate()
        },
        done: false,
        deleted: false,
      }
    })
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

const calAlarmTime = (scheduleType: string, time: Date) => {
  return DateTime.fromJSDate(time)
                 .minus({ 
                    hour: getSettingsByPath(`alarm.${scheduleType}.before.hour`),
                    minute: getSettingsByPath(`alarm.${scheduleType}.before.minute`)
                  })
                 .toJSDate()
}

const notify = (alarm: AlarmVO) => {
  let body: string
  if (alarm.type == 'todo') {
    body = `${alarm.comment}\n${parseTimeWithUnknown(alarm.end, alarm.endMark)}`
  }
  else {
    body = `${alarm.comment}\n${parseTimeWithUnknown(alarm.start, alarm.startMark)}-${parseTimeWithUnknown(alarm.end, alarm.endMark)}`
  }
  new Notification({ title: `${alarm.type}: ${alarm.name}`, body: body }).show()
}