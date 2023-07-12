import { PrismaClient } from '@prisma/client'
import moment from 'moment-timezone'
import { datetime, RRule } from 'rrule'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()
// TODO: 从数据库中读取
const WKST = 'MO'

export function getTimeZoneAbbrMap() {
  const res = new Map()
  for (const tz of moment.tz.names()) {
    const abbr = moment.tz(tz).format('z')
    res.get(abbr)?.add(tz) || res.set(abbr, new Set([tz]))
  }
  return res
}

const timeZoneAbbrMap = getTimeZoneAbbrMap()

export async function getSchedules(params) {
  console.log(params)
  // ... you will write your Prisma Client queries here
  const schedules = await prisma.schedule.findMany()
  return schedules
}

export function parseDateRange(dateRange: string) {
  function parseDate(date: string) {
    const [year, month, day] = date.split('/').map((item) => parseInt(item))
    return { year, month, day }
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
  

export function parseTimeRange(timeRange: string) {
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
    if (startMark == 0b01 || endMark == 0b01) {
      throw new Error('invalide time range')
    }
    if ((startMark | endMark) >> 1 == 0b1) {
      const start = { hour: parseInt(startHour), minute: parseInt(startMin) }
      const end = { hour: parseInt(endHour), minute: parseInt(endMin) }
      Object.assign(res, { start, end, startMark, endMark })
    }
    else {
      throw new Error('invalide time range')
    }
  }
  else {
    let [endHour, endMin] = timeRange.split(':')
    if (endHour.includes('?') || endMin.includes('?')) {
      throw new Error('invalide time')
    }
    const end = { hour: parseInt(endHour), minute: parseInt(endMin) }
    Object.assign(res, { start: null, end, startMark, endMark })
  }
  // @ts-ignore
  res.startMark = res.startMark.toString(2).padStart(2, '0')
  // @ts-ignore
  res.endMark = res.endMark.toString(2).padStart(2, '0')
  return res
}


export function parseFreq(freqCode: string) {
  let res = {}
  let freq: string
  if (freqCode.includes(',')) {
    // 是 freq + 参数
    const [_freq, ...args] = freqCode.split(',')
    freq = _freq
    for (const arg of args) {
      if (arg.includes('i')) {
        // 是 interval
        const interval = parseInt(arg.substring(1))
        if (interval < 0) {
          throw new Error('invalide interval')
        }
        Object.assign(res, { interval })
      }
      else if (arg.includes('c')) {
        // 是 count
        const count = parseInt(arg.substring(1))
        if (count < 0) {
          throw new Error('invalide count')
        }
        Object.assign(res, { count })
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


export function string2IntArray(str: string) {
  return str.split(',').map((item) => parseInt(item))
}

export function getWeekdayOffset() {
  const weekdays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']
  return weekdays.indexOf(WKST)
}

export function parseBy(byCode: string) {
  const bys = ['month', 'weekno', 'yearday', 'monthday', 'day', 'setpos']
  const res = {}
  for (const by of bys) {
    const index = byCode.indexOf(by)
    if (index > -1) {
      const value = byCode.substring(index + by.length + 1, byCode.indexOf(']', index))
      if (by != 'day') {
        Object.assign(res, { [`by${by}`]: string2IntArray(value) })
      }
      else {
        // rrule 库只接受 byweekday
        const weekdays = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA, RRule.SU]
        const choices = string2IntArray(value)
        const offset = getWeekdayOffset()
        const byweekday = choices.map((choice) => weekdays[choice - 1 + offset])
        Object.assign(res, { byweekday })
      }
    }
  }
  return res
}

function getMomentAtTimeZone(date: Date, timeZone: string): moment.Moment {
  const dateFormat = moment(date).format('YYYY-MM-DDTHH:mm:ss')
  return moment.tz(dateFormat, timeZone)
}

export function dateSugar(date: string) {
  date = date.replace(/tdy|tmr/g, (match) => {
    if (match == 'tdy') {
      return moment().format('YYYY/MM/DD')
    }
    else {
      return moment().add(1, 'days').format('YYYY/MM/DD')
    }
  })
  return date
}

export function parseTimeCode(timeCode: string) {
  const lines = timeCode.split(';')
  
  const times: any[] = []
  let rruleStrs: string[] = []
  for (const line of lines) {
    if (line.length == 0) {
      continue
    }
    const codes = line.split(' ')
    if (codes && codes.length >= 3 && codes.length <= 5) {
      let [date, time, timeZone, ...options] = codes
      // timeZone 对大小写敏感
      options.map((option) => option.toLowerCase())
      console.log(date, time, timeZone, options)
      date = dateSugar(date)

      const freq = ['daily', 'weekly', 'monthly', 'yearly']
      const optionsMark = {freq: 0, by: 0} // 记录每个可选项的出现次数
      let freqCode: string | null = null
      let byCode: string | null = null
      while (options.length > 0) {
        const code = options.shift()
        if (code?.includes('by[')) {
          // 是 by 函数
          optionsMark.by++
          byCode = code
        }
        // @ts-ignore
        else if (code?.includes(',') || freq.includes(code)) {
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
      // 时区
      if (!moment.tz.names().includes(timeZone)) {
        if (timeZoneAbbrMap.has(timeZone)) {
          timeZone = timeZoneAbbrMap.get(timeZone).values().next().value
        }
        else {
          throw new Error('invalide time zone')
        }
      }

      
      const rruleConfig = {}
      const dtstart = datetime(dateRangeObj.dtstart.year, dateRangeObj.dtstart.month, dateRangeObj.dtstart.day)
      Object.assign(rruleConfig, { dtstart })
      let until;
      if (dateRangeObj.until) {
        until = datetime(dateRangeObj.until.year, dateRangeObj.until.month, dateRangeObj.until.day)
        Object.assign(rruleConfig, { until })
      }
      // 默认 Daily
      Object.assign(rruleConfig, { freq: RRule.DAILY })
      // until == null 时默认 count: 1
      if (!dateRangeObj.until) {
        Object.assign(rruleConfig, { count: 1 })
      }
      
      if (freqCode && dateRangeObj.until) {
        const freqObj = parseFreq(freqCode)
        Object.assign(rruleConfig, freqObj)
      }
      if (byCode && dateRangeObj.until) {
        const byObj = parseBy(byCode)
        Object.assign(rruleConfig, byObj)
      }

      // rrule
      const rrule = new RRule(rruleConfig)
      rruleStrs.push(rrule.toString())
      for (const t of rrule.all()) {
        // t 是 UTC 时区的
        const tWithoutTimeZoneOffset = t.toISOString().substring(0, 19)
        // 改成 timeZone 对应的时区
        let start = null
        let end = moment.tz(tWithoutTimeZoneOffset, timeZone)
        if (timeRangeObj.start) {
          start = moment.tz(tWithoutTimeZoneOffset, timeZone)
          start.hour(timeRangeObj.start.hour)
          start.minute(timeRangeObj.start.minute)
        }
        end.hour(timeRangeObj.end.hour)
        end.minute(timeRangeObj.end.minute)
        times.push({
          ...timeRangeObj,
          start: start ? start.toDate() : start,
          end: end.toDate()
        })
      }
      
      // else {
      //   let start = null
      //   let end = getMomentAtTimeZone(
      //     new Date(dateRangeObj.until.year, dateRangeObj.until.month - 1, dateRangeObj.until.day), 
      //     timeZone)
      //   if (timeRangeObj.start) {
      //     start = getMomentAtTimeZone(
      //       new Date(dateRangeObj.until.year, dateRangeObj.until.month - 1, dateRangeObj.until.day), 
      //       timeZone)
      //     start.hour(timeRangeObj.start.hour)
      //     start.minute(timeRangeObj.start.minute)
      //   }
      //   end.hour(timeRangeObj.end.hour)
      //   end.minute(timeRangeObj.end.minute)
        
      //   times.push({
      //     ...timeRangeObj,
      //     start: start ? start.toDate() : start,
      //     end: end.toDate()
      //   })
      // }
    }
    else {
      throw new Error('time code error')
    }
  }
  return { times, rruleStrs }
}


export async function createSchedule(name: string, timeCode: string, comment: string, actionCode: string) {
  const { times, rruleStrs } = parseTimeCode(timeCode)

  const schedule = await prisma.schedule.create({
    data: {
      uid: uuidv4(),
      type: times[0].start ? 'event' : 'todo',
      name: name,
      rrules: rruleStrs.join(';'),
      time: {
        create: times
      },
      comment: comment,
      actionCode: actionCode,
    }
  })
  return schedule
}
