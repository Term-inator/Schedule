import { DateTime } from 'luxon'
import { datetime, RRule, Weekday } from 'rrule'
import { getTimeZoneAbbrMap, isValidTimeZone } from '../../utils/timeZone'
import { string2IntArray } from '../../utils/string'
import { getSettingsByKey } from './settingsService'
import { 
  EventType,
  DateRangeObject,
  TimeRangeObject, 
  TimeRange,
  FreqObject,
  ByObject,
  TimeCodeLex,
  TimeCodeSem,
  TimeCodeParseResult,
  TimeCodeDao,
  DateUnit
} from './timeCodeParserTypes'


const timeZoneAbbrMap = getTimeZoneAbbrMap()


export function parseDateRange(dateRange: string): DateRangeObject {
  function parseDate(date: string): { year: number | null, month: number | null, day: number | null } {
    /**
     * 日期格式：
     * yyyy/m/d
     * m/d
     * d
     */
    const dateList: (string | null)[] = date.split('/')
    if (dateList.length > 3 || dateList.length < 1) {
      throw new Error(`invalide date: ${date}`)
    }
    while (dateList.length < 3) {
      dateList.unshift(null)
    }
    const [year, month, day]: (number | null)[] = dateList.map((item): (number | null) => {
      if (item) {
        return parseInt(item)
      }
      return null
    })
    return { year, month, day }
  }

  if (dateRange?.includes('-')) {
    // 是日期范围
    const [dtstart, until] = dateRange.split('-').map((item) => parseDate(item))
    for (const key in until) {
      if (until[key] == null) {
        until[key] = dtstart[key]
      }
    }
    return { dtstart: dtstart as DateUnit, until: until as DateUnit }
  }
  else {
    const dtstart = parseDate(dateRange)
    return { dtstart: dtstart as DateUnit }
  }
}
  

export function parseTimeRange(timeRange: string): TimeRangeObject {
  function splitTime(time: string): string[] {
    /**
     * 时间格式：
     * hh:mm
     * hh
     */
    const timeList = time.split(':')
    if (timeList.length > 2 || timeList.length < 1) {
      throw new Error(`invalide time: ${time}`)
    }
    while (timeList.length < 2) {
      timeList.push('0')
    }
    return timeList
  }

  const res: TimeRangeObject = {} as TimeRangeObject
  let startMark = 0b11 // 1 表示有效，0 表示无效
  let endMark = 0b11
  if (timeRange.includes('-')) {
    // 是时间范围
    const [start, end] = timeRange.split('-')
    let [startHour, startMin] = splitTime(start)
    let [endHour, endMin] = splitTime(end)
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
      throw new Error(`invalide time range: ${timeRange}`)
    }
    if ((startMark | endMark) >> 1 == 0b1) {
      const start = { hour: parseInt(startHour), minute: parseInt(startMin) }
      const end = { hour: parseInt(endHour), minute: parseInt(endMin) }
      Object.assign(res, { start, end, startMark, endMark })
    }
    else {
      throw new Error(`invalide time range: ${timeRange}`)
    }
  }
  else {
    let [endHour, endMin] = splitTime(timeRange)
    if (endHour.includes('?') || endMin.includes('?')) {
      throw new Error(`invalide time: ${timeRange}`)
    }
    const end = { hour: parseInt(endHour), minute: parseInt(endMin) }
    Object.assign(res, { start: null, end, startMark, endMark })
  }
  // @ts-ignore
  // toString(2) 转换为二进制字符串，padStart(2, '0') 补齐两位
  res.startMark = res.startMark.toString(2).padStart(2, '0')
  // @ts-ignore
  res.endMark = res.endMark.toString(2).padStart(2, '0')
  return res
}


export function parseFreq(freqCode: string): FreqObject {
  let res: FreqObject = {} as FreqObject
  let freq: string
  if (freqCode.includes(',')) {
    // 是 freq + 参数
    const [_freq, ...args] = freqCode.split(',')
    freq = _freq
    for (const arg of args) {
      if (arg[0] == 'i') {
        // 是 interval
        const interval = parseInt(arg.substring(1))
        if (interval < 0 || Number.isNaN(interval)) {
          throw new Error(`invalide interval: ${arg}`)
        }
        Object.assign(res, { interval })
      }
      else if (arg[0] == 'c') {
        // 是 count
        const count = parseInt(arg.substring(1))
        if (count < 0 || Number.isNaN(count)) {
          throw new Error(`invalide count: ${arg}`)
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
      throw new Error(`invalid freq: ${freq}`)
  }

  Object.assign(res, { freq: rruleFreq })
  return res
}

export function getWeekdayOffset(): number {
  const weekdays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']
  return weekdays.indexOf(getSettingsByKey('wkst'))
}

export function parseBy(byCode: string): ByObject {
  const bys = ['month', 'weekno', 'yearday', 'monthday', 'day', 'setpos']
  const res: ByObject = {}
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
        if (byweekday[0] && byweekday.length > 0) {
          Object.assign(res, { byweekday })
        }
        else {
          throw new Error(`invalide byday ${value}`)
        }
      }
    }
  }
  return res
}

export function dateSugar(date: string): string {
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

export function parseTimeCodeLex(timeCode: string): TimeCodeLex {
  timeCode = timeCode.trim()
  const codes = timeCode.split(' ').filter((item) => item.length > 0) // 解决多个空格的问题
  if (codes && codes.length >= 2 && codes.length <= 5) {
    let [date, time, ...options] = codes
 
    date = dateSugar(date)
    
    console.log(date, time, options)

    const freq = ['daily', 'weekly', 'monthly', 'yearly']
    const optionsMark = {timeZone: 0, freq: 0, by: 0} // 记录每个可选项的出现次数
    let timeZone = getSettingsByKey('timeZone') // 默认值是设置中的时区
    let freqCode: string | null = null
    let byCode: string | null = null
    while (options.length > 0) {
      const code: string = options.shift()! // 不可能为 null
      if (code?.includes('by[')) {
        // 是 by 函数
        optionsMark.by++
        byCode = code
      }
      else if (code?.includes(',') || freq.includes(code)) {
        // 是 freq + 参数 或 freq
        optionsMark.freq++
        // @ts-ignore
        freqCode = code
      }
      else {
        // 是时区
        if (isValidTimeZone(code)) {
          optionsMark.timeZone++
          timeZone = code
        }
        else {
          // 是时区缩写
          if (timeZoneAbbrMap.has(code)) {
            // 从缩写转换为完整的时区，直接选第一个
            timeZone = timeZoneAbbrMap.get(code).values().next().value
          }
          // 是非法内容
          else {
            throw new Error(`invalide time code options: ${code}`)
          }
        } 
      }
      // 如果有超过两次的
      if (Object.values(optionsMark).some((value) => value > 1)) {
        throw new Error('invalide time code options')
      }
    }

    const newTimeCode = `${date} ${time} ${timeZone}${freqCode ? ' ' + freqCode : ''}${byCode ? ' ' + byCode : ''};`

    // 开始解析每个部分
    const dateRangeObj = parseDateRange(date)
    console.log(dateRangeObj)
    const timeRangeObj = parseTimeRange(time)
    let eventType = EventType.Event
    if (timeRangeObj.start == null) {
      eventType = EventType.Todo
    }
    
    return {
      eventType,
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

function getWKST(): Weekday {
  const weekStart = getSettingsByKey('wkst')
  switch (weekStart) {
    case 'MO':
      return RRule.MO
    case 'TU':
      return RRule.TU
    case 'WE':
      return RRule.WE
    case 'TH':
      return RRule.TH
    case 'FR':
      return RRule.FR
    case 'SA':
      return RRule.SA
    case 'SU':
      return RRule.SU
    default:
      throw new Error('Unknown wkst')
  }
}

export function parseTimeCodeSem(
  dateRangeObj: DateRangeObject, 
  timeRangeObj: TimeRangeObject, 
  timeZone: string, 
  freqCode: string | null, 
  byCode: string | null
): TimeCodeSem {
  const times: TimeRange[] = []
  const rruleConfig = {}
  const dtstart = datetime(dateRangeObj.dtstart.year, dateRangeObj.dtstart.month, dateRangeObj.dtstart.day)
  Object.assign(rruleConfig, { dtstart })
  let until: Date | null = null
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
  // wkst
  Object.assign(rruleConfig, { wkst: getWKST() })

  // rrule
  const rrule = new RRule(rruleConfig)
  for (const t of rrule.all()) {
    // t 是 UTC 时区的，更改时区，但不改变时间的值
    const tAtTimeZone = DateTime.fromISO(t.toISOString()).setZone('UTC').setZone(timeZone, { keepLocalTime: true })
    let start: DateTime | null = null
    let end = tAtTimeZone.set(timeRangeObj.end)
    if (timeRangeObj.start) {
      // 如果 start.hour > end.hour，说明跨天了
      if (timeRangeObj.start.hour > timeRangeObj.end.hour) {
        end = tAtTimeZone.plus({ days: 1 }).set(timeRangeObj.end)
      }
      start = tAtTimeZone.set(timeRangeObj.start)
    }
    
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

export function timeCodeParser(timeCodes: string): TimeCodeParseResult {
  const lines = timeCodes.split(';')
  
  let eventType: EventType | null = null
  const times: TimeRange[] = []
  let rruleObjects: RRule[] = []
  let newTimeCodes: string[] = []
  for (const line of lines) {
    if (line.length == 0) {
      continue
    }
    const { eventType: t, dateRangeObj, timeRangeObj, timeZone, freqCode, byCode, newTimeCode } = parseTimeCodeLex(line)

    if (eventType && eventType != t) {
      throw new Error('invalide time code')
    }
    eventType = t
    newTimeCodes.push(newTimeCode)
    const { times: timesList, rruleObject } = parseTimeCodeSem(dateRangeObj, timeRangeObj, timeZone, freqCode, byCode)
    times.push(...timesList)
    rruleObjects.push(rruleObject)
  }
  return { 
    eventType: eventType! // 一定不为 null
    , times, 
    rruleObjects, 
    newTimeCodes 
  }
}

export function parseTimeCodes(rTimeCodes: string, exTimeCodes: string): TimeCodeDao {
  let { eventType: rEventType, times: rTimes, rruleObjects: rRruleObjects, newTimeCodes: rNewTimeCodes } = timeCodeParser(rTimeCodes)
  let { eventType: exEventType, times: exTimes, newTimeCodes: exNewTimeCodes } = timeCodeParser(exTimeCodes)

  if (exEventType && rEventType != exEventType) {
    throw new Error('invalide exTime code')
  }

  const rruleStr = rRruleObjects.map(obj => obj.toString()).join(' ')
  console.log(rNewTimeCodes, exNewTimeCodes)

  // deleted: true，要去除的时间
  const intersection = [...rTimes].filter(x => exTimes.some(y => JSON.stringify(x) === JSON.stringify(y)))
  // deleted: false，不要去除的时间
  const difference = [...rTimes].filter(x => !exTimes.some(y => JSON.stringify(x) === JSON.stringify(y)))

  return {
    eventType: rEventType,
    rTimes: difference,
    exTimes: intersection,
    rruleStr,
    rTimeCodes: rNewTimeCodes.join(';'),
    exTimeCodes: exNewTimeCodes.join(';')
  }
}
