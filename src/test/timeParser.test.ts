import {describe, expect, test } from 'vitest'
import { RRule } from 'rrule'
import { 
  parseDateRange, parseTimeRange, parseFreq, parseBy, parseTimeCodes
} from '../main/service/timeCodeParser'
import { getTimeZoneAbbrMap } from '../utils/timeZone'
import { string2IntArray } from '../utils/string'
import moment from 'moment-timezone'
import { DateTime } from "luxon"


describe('scheduleService', () => {
  test('getTimeZoneAbbrMap', () => {
    const map = getTimeZoneAbbrMap()
    expect(map.get('CDT').has('America/Chicago')).toBe(true)
  })

  test('parseDate', () => {
    expect(parseDateRange('2021/10/1')).toEqual({ dtstart: { year: 2021, month: 10, day: 1 } })
    
  })
  test('parseDateRange', () => {
    expect(parseDateRange('2021/10/1-2021/10/2')).toEqual({ 
      dtstart: { year: 2021, month: 10, day: 1 }, until: { year: 2021, month: 10, day: 2 } 
    })
  })

  test('parseTime', () => {
    expect(parseTimeRange('20:30')).toEqual({ 
      start: null, end: { hour: 20, minute: 30 }, startMark: '11', endMark: '11' 
    })
  })
  test('parseTimeRange', () => {
    expect(parseTimeRange('20:30-21:30')).toEqual({ 
      start: { hour: 20, minute: 30 },
      end: { hour: 21, minute: 30 },
      startMark: '11', endMark: '11'  
    })
  })
  test('parseTimeRangeStartUnknown', () => {
    expect(parseTimeRange('?:?-21:00')).toEqual({ 
      start: { hour: 0, minute: 0 },
      end: { hour: 21, minute: 0 },
      startMark: '00', endMark: '11'
    })
  })
  test('parseTimeRangeStartHourUnknown', () => {
    expect(() => parseTimeRange('?:30-21:00')).toThrow()
  })
  test('parseTimeRangeStartMinUnknown', () => {
    expect(parseTimeRange('20:?-21:00')).toEqual({
      start: { hour: 20, minute: 0 },
      end: { hour: 21, minute: 0 },
      startMark: '10', endMark: '11'
    })
  })
  test('parseTimeRangeEndUnkown', () => {
    expect(parseTimeRange('20:30-?:?')).toEqual({ 
      start: { hour: 20, minute: 30 },
      end: { hour: 0, minute: 0 },
      startMark: '11', endMark: '00'  
    })
  })
  test('parseTimeRangeEndHourUnkown', () => {
    expect(() => parseTimeRange('20:30-?:30')).toThrow()
  })
  test('parseTimeRangeEndMinUnknown', () => {
    expect(parseTimeRange('20:30-21:?')).toEqual({ 
      start: { hour: 20, minute: 30 },
      end: { hour: 21, minute: 0 },
      startMark: '11', endMark: '10'  
    })
  })
  test('parseTimeRangeStartEndHourUnknown', () => {
    expect(() => parseTimeRange('?:30-?:30')).toThrow()
  })
  test('parseTimeRangeStartEndMinUnknown', () => {
    expect(parseTimeRange('20:?-21:?')).toEqual({ 
      start: { hour: 20, minute: 0 },
      end: { hour: 21, minute: 0 }, 
      startMark: '10', endMark: '10'  
    })
  })
  test('parseTimeRangeAllUnknown', () => {
    expect(() => parseTimeRange('?:?-?:?')).toThrow()
  })

  test('parseFreq', () => {
    expect(parseFreq('daily')).toEqual({ freq: RRule.DAILY })
  })
  test('parseFreqWithInterval', () => {
    expect(parseFreq('weekly,i2')).toEqual({ freq: RRule.WEEKLY, interval: 2 })
  })
  test('parseFreqWithCount', () => {
    expect(parseFreq('monthly,c2')).toEqual({ freq: RRule.MONTHLY, count: 2 })
  })
  test('parseFreqWithIntervalAndCount', () => {
    expect(parseFreq('daily,i10,c20')).toEqual({ freq: RRule.DAILY, interval: 10, count: 20 })
    expect(parseFreq('yearly,c0,i1')).toEqual({ freq: RRule.YEARLY, interval: 1, count: 0 })
  })

  test('string2IntArray', () => {
    expect(string2IntArray('20,21,22')).toEqual([20,21,22])
  })

  test('parseBy', () => {
    expect(parseBy('by[day[1,2,3]]')).toEqual({ byweekday: [RRule.MO, RRule.TU, RRule.WE] })
  })
  test('parseByDayMonth', () => {
    expect(parseBy('by[day[1,2,3],month[1,2,3]]')).toEqual({ byweekday: [RRule.MO, RRule.TU, RRule.WE], bymonth: [1, 2, 3] })
  })

  test('parseTimeCode', () => {
    const { rTimes: times } = parseTimeCodes('2023/7/10 22:00 America/Chicago;', '')
    for (const time of times) {
      const tEnd = moment.tz(time.end, 'UTC').tz('America/Chicago')
      expect(tEnd.format('YYYY/MM/DD HH:mm')).toEqual('2023/07/10 22:00')
    }
  })
  test('parseTimeCodeAbbr', () => {
    // 同属于 CDT 的地区，时间可能会不同
    const { rTimes: times } = parseTimeCodes('2023/7/10 22:00 CDT;', '')
    for (const time of times) {
      const tEnd = moment.tz(time.end, 'UTC').tz('America/Chicago')
      expect(tEnd.format('YYYY/MM/DD HH:mm')).toEqual('2023/07/10 22:00')
    }
  })
  test('paseTimeCodeSugar', () => {
    const { rTimes: times } = parseTimeCodes('tdy 22:00 America/Chicago;', '')
    for (const time of times) {
      const tEnd = moment.tz(time.end, 'UTC').tz('America/Chicago')
      expect(tEnd.format('YYYY/MM/DD HH:mm')).toEqual(moment().format('YYYY/MM/DD 22:00'))
    }
  })
  test('paseTimeCodeSugar', () => {
    const { rTimes: times } = parseTimeCodes('tmr 22:00 America/Chicago;', '')
    for (const time of times) {
      const tEnd = moment.tz(time.end, 'UTC').tz('America/Chicago')
      expect(tEnd.format('YYYY/MM/DD HH:mm')).toEqual(moment().add(1, 'day').format('YYYY/MM/DD 22:00'))
    }
  })
  test('parseTimeCodeDateRangeTime', () => {
    const { rTimes: times } = parseTimeCodes('2023/7/10-2023/7/11 22:00 America/Chicago;', '')
    let day = 10
    for (const time of times) {
      const tEnd = moment.tz(time.end, 'UTC').tz('America/Chicago')
      expect(tEnd.format('YYYY/MM/DD HH:mm')).toEqual(`2023/07/${day++} 22:00`)
    }
  })
  test('parseTimeCodeDateTimeRange', () => {
    const { rTimes: times } = parseTimeCodes('2023/7/10 21:00-22:00 America/Chicago;', '')
    let day = 10
    for (const time of times) {
      const tStart = moment.tz(time.start, 'UTC').tz('America/Chicago')
      const tEnd = moment.tz(time.end, 'UTC').tz('America/Chicago')
      expect(tStart.format('YYYY/MM/DD HH:mm')).toEqual(`2023/07/${day} 21:00`)
      expect(tEnd.format('YYYY/MM/DD HH:mm')).toEqual(`2023/07/${day} 22:00`)
      ++day
    }
  })
  test('parseTimeCodeDateRangeTimeRange', () => {
    const { rTimes: times } = parseTimeCodes('2023/7/10-2023/7/12 21:00-22:00 America/Chicago;', '')
    let day = 10
    for (const time of times) {
      const tStart = moment.tz(time.start, 'UTC').tz('America/Chicago')
      const tEnd = moment.tz(time.end, 'UTC').tz('America/Chicago')
      expect(tStart.format('YYYY/MM/DD HH:mm')).toEqual(`2023/07/${day} 21:00`)
      expect(tEnd.format('YYYY/MM/DD HH:mm')).toEqual(`2023/07/${day} 22:00`)
      ++day
    }
  })
  test('parseTimeCodeDateRangeTimeRangeFreq', () => {
    const { rTimes: times } = parseTimeCodes('2023/7/10-2023/7/15 21:00-22:00 America/Chicago daily,i2;', '')
    let day = 10
    for (const time of times) {
      const tStart = moment.tz(time.start, 'UTC').tz('America/Chicago')
      const tEnd = moment.tz(time.end, 'UTC').tz('America/Chicago')
      expect(tStart.format('YYYY/MM/DD HH:mm')).toEqual(`2023/07/${day} 21:00`)
      expect(tEnd.format('YYYY/MM/DD HH:mm')).toEqual(`2023/07/${day} 22:00`)
      day += 2
    }
  })
  test('parseTimeCodeDateRangeTimeRangeFreq2', () => {
    const { rTimes: times } = parseTimeCodes('2023/7/10-2023/7/15 21:00-22:00 America/Chicago daily,i2,c2;', '')
    let day = 10
    expect(times.length).toEqual(2)
    for (const time of times) {
      const tStart = moment.tz(time.start, 'UTC').tz('America/Chicago')
      const tEnd = moment.tz(time.end, 'UTC').tz('America/Chicago')
      expect(tStart.format('YYYY/MM/DD HH:mm')).toEqual(`2023/07/${day} 21:00`)
      expect(tEnd.format('YYYY/MM/DD HH:mm')).toEqual(`2023/07/${day} 22:00`)
      day += 2
    }
  })
  test('parseTimeCodeDateRangeTimeRangeByDay', () => {
    const { rTimes: times } = parseTimeCodes('2023/7/10-2023/7/15 21:00-22:00 America/Chicago by[day[2,3]];', '')
    let day = 11
    expect(times.length).toEqual(2)
    for (const time of times) {
      const tStart = moment.tz(time.start, 'UTC').tz('America/Chicago')
      const tEnd = moment.tz(time.end, 'UTC').tz('America/Chicago')
      expect(tStart.format('YYYY/MM/DD HH:mm')).toEqual(`2023/07/${day} 21:00`)
      expect(tEnd.format('YYYY/MM/DD HH:mm')).toEqual(`2023/07/${day} 22:00`)
      ++day
    }
  })
  test('parseTimeCodeDateRangeTimeRangeByMonth', () => {
    const { rTimes: times } = parseTimeCodes('2023/7/10-2023/7/12 21:00-22:00 America/Chicago by[month[6,7]];', '')
    let day = 10
    for (const time of times) {
      const tStart = moment.tz(time.start, 'UTC').tz('America/Chicago')
      const tEnd = moment.tz(time.end, 'UTC').tz('America/Chicago')
      expect(tStart.format('YYYY/MM/DD HH:mm')).toEqual(`2023/07/${day} 21:00`)
      expect(tEnd.format('YYYY/MM/DD HH:mm')).toEqual(`2023/07/${day} 22:00`)
      ++day
    }
  })

  test('luxon', () => {
    const t = DateTime.fromISO('2023-07-10T21:00:00.000Z')
    const timeZone = 'America/Chicago'
    const tAtTimeZone = DateTime.fromISO(t.toISO()).setZone('UTC').setZone(timeZone, { keepLocalTime: true })
    expect(tAtTimeZone.toISO()).toEqual('2023-07-10T21:00:00.000-05:00')
  })
})
