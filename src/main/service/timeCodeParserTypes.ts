import { RRule, Weekday } from 'rrule'

export enum EventType {
  Event = 'event',
  Todo = 'todo'
}

export type DateUnit = {
  year: number
  month: number
  day: number
}

export type DateRangeObject = {
  dtstart: DateUnit
  until?: DateUnit
  value: string // 保存完整的时间字符串，比如把 10/1 转换成 ${year}/10/1 存储到数据库
}

export type TimeUnit = {
  hour: number
  minute: number
}

export type TimeRangeObject = {
  start: TimeUnit | null
  end: TimeUnit
  startMark: string
  endMark: string
}

export type TimeRange = {
  start: string | null
  end: string
  startMark: string
  endMark: string
}

export type FreqObject = {
  freq: number
  interval?: number
  count?: number
}

export type ByObject = {
  bymonth?: number[]
  byweekno?: number[]
  byyearday?: number[]
  bymonthday?: number[]
  byweekday?: Weekday[]
  bysetpos?: number[]
}

export type TimeCodeLex = {
  eventType: EventType
  dateRangeObj: DateRangeObject
  timeRangeObj: TimeRangeObject
  timeZone: string
  freqCode: string | null
  byCode: string | null
  newTimeCode: string
}

export type TimeCodeSem = {
  times: TimeRange[]
  rruleObject: RRule
}

export type TimeCodeParseResult = {
  eventType: EventType
  times: TimeRange[]
  rruleObjects: RRule[]
  newTimeCodes: string[]
}

export type TimeCodeDao = {
  eventType: EventType
  rTimes: TimeRange[]
  exTimes: TimeRange[]
  rruleStr: string
  rTimeCodes: string
  exTimeCodes: string
}
