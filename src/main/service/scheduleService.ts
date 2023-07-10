import { PrismaClient } from '@prisma/client'
import { datetime, RRule, RRuleSet, rrulestr } from 'rrule'
import { utcToZonedTime } from 'date-fns-tz';

const prisma = new PrismaClient()

export async function getSchedules(params) {
  console.log(params)
  // ... you will write your Prisma Client queries here
  const schedules = await prisma.schedule.findMany()
  return schedules
}

function parseDateRange(dateRange: string) {
  function parseDate(date: string) {
    const [year, month, day] = date.split('/')
  return datetime(parseInt(year), parseInt(month) - 1, parseInt(day))
  }

  if (dateRange?.includes('-')) {
    // 是日期范围
    const [dtstart, until] = dateRange.split('-').map((item) => parseDate(item))
    return { dtstart, until }
  }
  else {
    const dtstart = parseDate(dateRange)
    return { dtstart }
  }
}
  

function parseTimeRange(timeRange: string) {
  const res = {}
  let startMark = 0b11 // 1 表示有效，0 表示无效
  let endMark = 0b11
  if (timeRange.includes('-')) {
    // 是时间范围
    const [start, end] = timeRange.split('-')
    let [startHour, startMin] = start.split(':')
    let [endHour, endMin] = end.split(':')
    if (startHour.includes('?')) {
      startMark &= 0b01
      startHour = '0'
    }
    if (startMin.includes('?')) {
      startMark &= 0b10
      startMin = '0'
    }
    if (endHour.includes('?')) {
      endMark &= 0b01
      endHour = '0'
    }
    if (endMin.includes('?')) {
      endMark &= 0b10
      endMin = '0'
    }
    if (startMark == 0b01 && endMark == 0b01) {
      throw new Error('invalide time range')
    }
    if ((startMark ^ endMark) >> 1 == 0b1) {
      const start = datetime(0, 0, 0, parseInt(startHour), parseInt(startMin))
      const end = datetime(0, 0, 0, parseInt(endHour), parseInt(endMin))
      Object.assign(res, { start, end, startMark, endMark })
    }
    else {
      throw new Error('invalide time range')
    }
  }
  else {
    let [endHour, endMin] = timeRange.split(':')
    if (endHour.includes('?')) {
      throw new Error('invalide time')
    }
    if (endMin.includes('?')) {
      endMin = '0'
      endMark = 0b10
    }
    const end = datetime(0, 0, 0, parseInt(endHour), parseInt(endMin))
    Object.assign(res, { start: null, end, startMark, endMark })
  }
  // @ts-ignore
  res.startMark = res.startMark.toString(2)
  // @ts-ignore
  res.endMark = res.endMark.toString(2)
  return res
}


function parseFreq(freqCode: string) {
  let res = {}
  let freq: string
  if (freqCode.includes(',')) {
    // 是 freq + 参数
    const [_freq, ...args] = freqCode.split(',')
    freq = _freq
    for (const arg of args) {
      if (arg.includes('i')) {
        // 是 interval
        Object.assign(res, { interval: parseInt(arg.substring(1)) })
      }
      else if (arg.includes('c')) {
        Object.assign(res, { count: parseInt(arg.substring(1)) })
      }
    }
  }
  else {
    // 是 freq
    freq = freqCode
  }
  
  let rruleFreq: number
  switch (freq) {
    case 'daily':
      rruleFreq = RRule.DAILY
      break
    case 'weekly':
      rruleFreq = RRule.WEEKLY
      break
    case 'monthly':
      rruleFreq = RRule.MONTHLY
      break
    case 'yearly':
      rruleFreq = RRule.YEARLY
      break
    default:
      throw new Error('Unknown freq')
  }

  Object.assign(res, { freq: rruleFreq })
  return res
}


function string2Array(str: string) {
  return str.split(',').map((item) => parseInt(item))
}


function parseBy(byCode: string) {
  const bys = ['month', 'weekno', 'yearday', 'monthday', 'day', 'setpos']
  const res = {}
  for (const by of bys) {
    const index = byCode.indexOf(by)
    if (index > -1) {
      const value = byCode.substring(index + by.length + 1, byCode.indexOf(']', index))
      Object.assign(res, { [`by${by}`]: string2Array(value) })
    }
  }
  return res
}

function parseTimeCode(timeCode: string) {
  // TODO 一些类似 today 的特殊时间
  const lines = timeCode.toLowerCase().split(';')
  
  const times: any[] = []
  for (const line of lines) {
    if (line.length == 0) {
      continue
    }
    const codes = line.split(' ')
    if (codes && codes.length >= 3 && codes.length <= 5) {
      const [date, time, timeZone, ...options] = codes
      console.log(date, time, timeZone, options)
      const freq = ['daily', 'weekly', 'monthly', 'yearly']
      const optionsMark = {freq: 0, by: 0} // 记录每个可选项的出现次数
      let freqCode: string | null = null
      let byCode: string | null = null
      while (options.length > 0) {
        const code = codes.shift()
        if (code?.includes('by[')) {
          // 是 by 函数
          optionsMark.by++
          byCode = code
        }
        // @ts-ignore
        else if (code?.includes[','] || freq.includes(code)) {
          // 是 freq + 参数 或 freq
          optionsMark.freq++
          // @ts-ignore
          freqCode = code
        }
        else {
          // 是非法内容
          throw new Error('invalide time code options')
        }
        // 如果有超过两次的
        if (Object.values(optionsMark).some((value) => value > 1)) {
          throw new Error('invalide time code options')
        }
      }

      // 开始解析每个部分
      const dateRangeObj = parseDateRange(date)
      const timeRangeObj = parseTimeRange(time)
      Object.assign(timeRangeObj, { tzid: timeZone })

      if (date.includes('-')) {
        const rruleConfig = {}
        Object.assign(rruleConfig, dateRangeObj)
        // TODO time zone
        Object.assign(rruleConfig, { tzid: timeZone })
        if (freqCode) {
          const freqObj = parseFreq(freqCode)
          Object.assign(rruleConfig, freqObj)
        }
        else {
          // 默认 Daily
          Object.assign(rruleConfig, { freq: RRule.DAILY })
        }
        if (byCode) {
          const byObj = parseBy(byCode)
          Object.assign(rruleConfig, byObj)
        }

        console.log(rruleConfig)
        // rrule
        const rrule = new RRule(rruleConfig)
        for (let t of rrule.all()) {
          let start: Date = new Date(t)
          let end: Date = new Date(t)
          if (timeRangeObj.start) {
            start.setHours(timeRangeObj.start.getHours(), timeRangeObj.start.getMinutes())
            timeRangeObj.start = start
          }
          end.setHours(timeRangeObj.end.getHours(), timeRangeObj.end.getMinutes())
          timeRangeObj.end = end
          times.push({
            timeRangeObj
          })
        }
      }
      else {
        let start = new Date(dateRangeObj.dtstart)
        let end = new Date(dateRangeObj.dtstart)
        console.log(start, end)
        if (timeRangeObj.start) {
          start.setHours(timeRangeObj.start.getHours(), timeRangeObj.start.getMinutes())
          timeRangeObj.start = start
        }
        end.setHours(timeRangeObj.end.getHours(), timeRangeObj.end.getMinutes())
        console.log(new Date(datetime(2023, 7, 10, 23, 30).setHours(20)))
        timeRangeObj.end = end
        times.push({
          timeRangeObj
        })
      }
    }
    else {
      throw new Error('time code error')
    }
  }
  return times
}


export async function createSchedule(name: string, timeCode: string, comment: string, actionCode: string) {
  const times = parseTimeCode(timeCode)
  console.log({
    data: {
      uid: '1',
      type: '1',
      name: name,
      timeCode: timeCode,
      time: {
        create: times
      },
      comment: comment,
      actionCode: actionCode,
    }
  })
  console.log(times)
  // const schedule = await prisma.schedule.create({
  //   data: {
  //     uid: '1',
  //     type: '1',
  //     name: name,
  //     timeCode: timeCode,
  //     time: {
  //       create: times
  //     },
  //     comment: comment,
  //     actionCode: actionCode,
  //   }
  // })
  // return schedule
}
