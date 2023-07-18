import { DateTime } from 'luxon'
import { datetime, RRule, RRuleSet } from 'rrule'
import { getTimeZoneAbbrMap, isValidTimeZone } from '../../utils/timeZone'
import { string2IntArray } from '../../utils/string'

// TODO: 从数据库中读取
const WKST = 'MO'
const timeZoneAbbrMap = getTimeZoneAbbrMap()


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

export function dateSugar(date: string) {
  date = date.replace(/tdy|tmr/g, (match) => {
    if (match == 'tdy') {
      const now = DateTime.now()
      return `${now.year}/${now.month}/${now.day}`
    }
    else {
      const tomorrow = DateTime.now().plus({days: 1})
      return `${tomorrow.year}/${tomorrow.month}/${tomorrow.day}`
    }
  })
  return date
}

export function parseTimeCodeLex(timeCode: string) {
  timeCode = timeCode.trim()
  // TODO 多个空格
  const codes = timeCode.split(' ')
  if (codes && codes.length >= 3 && codes.length <= 5) {
    let [date, time, timeZone, ...options] = codes

    date = dateSugar(date)
    console.log(codes)
    const newTimeCode = `${date} ${time} ${timeZone}` + (options.length > 0 ? ` ${options.join(' ')}` : '')
    
    // timeZone 对大小写敏感
    options.map((option) => option.toLowerCase())
    console.log(date, time, timeZone, options)

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
    if (!isValidTimeZone(timeZone)) {
      if (timeZoneAbbrMap.has(timeZone)) {
        timeZone = timeZoneAbbrMap.get(timeZone).values().next().value
      }
      else {
        throw new Error('invalide time zone')
      }
    }
    return {
      dateRangeObj,
      timeRangeObj,
      timeZone,
      freqCode,
      byCode,
      newTimeCode
    }
  }
  else {
    throw new Error('time code error')
  }
}

export function parseTimeCodeSem(dateRangeObj, timeRangeObj, timeZone, freqCode, byCode) {
  const times: any[] = []
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
  for (const t of rrule.all()) {
    // t 是 UTC 时区的，更改时区，但不改变时间的值
    const tAtTimeZone = DateTime.fromISO(t.toISOString()).setZone('UTC').setZone(timeZone, { keepLocalTime: true })
    let start = null
    if (timeRangeObj.start) {
      start = tAtTimeZone.set(timeRangeObj.start)
    }
    let end = tAtTimeZone.set(timeRangeObj.end)
    times.push({
      ...timeRangeObj,
      start: start ? start.toJSDate() : start,
      end: end.toJSDate()
    })
  }
  return {
    times,
    rruleObject: rrule,
  }
}

export function timeCodeParser(timeCodes: string) {
  const lines = timeCodes.split(';')
  
  const times = []
  let rruleObjects: RRule[] = []
  let newTimeCodes: string[] = []
  for (const line of lines) {
    if (line.length == 0) {
      continue
    }
    const { dateRangeObj, timeRangeObj, timeZone, freqCode, byCode, newTimeCode } = parseTimeCodeLex(line)

    newTimeCodes.push(newTimeCode)
    const { times: timesList, rruleObject } = parseTimeCodeSem(dateRangeObj, timeRangeObj, timeZone, freqCode, byCode)
    times.push(...timesList)
    rruleObjects.push(rruleObject)
  }
  return { times, rruleObjects, newTimeCodes }
}

export function parseTimeCodes(rTimeCodes: string, exTimeCodes: string) {
  let { times: rTimes, rruleObjects: rRruleObjects, newTimeCodes: rNewTimeCodes } = timeCodeParser(rTimeCodes)
  let { times: exTimes, rruleObjects: exRruleObjects, newTimeCodes: exNewTimeCodes } = timeCodeParser(exTimeCodes)

  const rruleStr = rRruleObjects.map(obj => obj.toString()).join(' ')
  console.log(rNewTimeCodes, exNewTimeCodes)

  // deleted: true，要去除的时间
  const intersection = [...rTimes].filter(x => exTimes.some(y => JSON.stringify(x) === JSON.stringify(y)))
  // deleted: false，不要去除的时间
  const difference = [...rTimes].filter(x => !exTimes.some(y => JSON.stringify(x) === JSON.stringify(y)))

  return {
    rTimes: difference,
    exTimes: intersection,
    rruleStr,
    rTimeCodes: rNewTimeCodes.join(';'),
    exTimeCodes: exNewTimeCodes.join(';')
  }
}
