import {describe, expect, test } from 'vitest'
import { datetime, RRule } from 'rrule'
import * as scheduleService from '../main/service/scheduleService'

const parseDateRange = scheduleService.parseDateRange
const parseTimeRange = scheduleService.parseTimeRange
const parseFreq = scheduleService.parseFreq
const string2IntArray = scheduleService.string2IntArray
const parseBy = scheduleService.parseBy
const parseTimeCode = scheduleService.parseTimeCode

describe('scheduleService', () => {
  test('parseDate', () => {
    expect(parseDateRange('2021/10/1')).toEqual({ dtstart: datetime(2021, 10, 1) })
  });
  test('parseDateRange', () => {
    expect(parseDateRange('2021/10/1-2021/10/2')).toEqual({ 
      dtstart: datetime(2021, 10, 1), until: datetime(2021, 10, 2) 
    })
  })

  test('parseTime', () => {
    expect(parseTimeRange('20:30')).toEqual({ 
      start: null, end: datetime(0, 0, 0, 20, 30), startMark: '11', endMark: '11' 
    })
  })
  test('parseTimeRange', () => {
    expect(parseTimeRange('20:30-21:30')).toEqual({ 
      start: datetime(0, 0, 0, 20, 30), 
      end: datetime(0, 0, 0, 21, 30), 
      startMark: '11', endMark: '11'  
    })
  })
  test('parseTimeRangeStartUnknown', () => {
    expect(parseTimeRange('?:?-21:00')).toEqual({ start: datetime(0, 0, 0, 0), end: datetime(0, 0, 0, 21), startMark: '00', endMark: '11'  })
  })
  test('parseTimeRangeStartHourUnknown', () => {
    expect(() => parseTimeRange('?:30-21:00')).toThrow()
  })
  test('parseTimeRangeStartMinUnknown', () => {
    expect(parseTimeRange('20:?-21:00')).toEqual({
      start: datetime(0, 0, 0, 20, 0),
      end: datetime(0, 0, 0, 21, 0),
      startMark: '10', endMark: '11'
    })
  })
  test('parseTimeRangeEndUnkown', () => {
    expect(parseTimeRange('20:30-?:?')).toEqual({ 
      start: datetime(0, 0, 0, 20, 30), 
      end: datetime(0, 0, 0, 0, 0, 0), 
      startMark: '11', endMark: '00'  
    })
  })
  test('parseTimeRangeEndHourUnkown', () => {
    expect(() => parseTimeRange('20:30-?:30')).toThrow()
  })
  test('parseTimeRangeEndMinUnknown', () => {
    expect(parseTimeRange('20:30-21:?')).toEqual({ 
      start: datetime(0, 0, 0, 20, 30), 
      end: datetime(0, 0, 0, 21, 0), 
      startMark: '11', endMark: '10'  
    })
  })
  test('parseTimeRangeStartEndHourUnknown', () => {
    expect(() => parseTimeRange('?:30-?:30')).toThrow()
  })
  test('parseTimeRangeStartEndMinUnknown', () => {
    expect(parseTimeRange('20:?-21:?')).toEqual({ 
      start: datetime(0, 0, 0, 20, 0), 
      end: datetime(0, 0, 0, 21, 0), 
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
    expect(parseBy('by[day[1,2,3]]')).toEqual({ byday: [1, 2, 3] })
  })
  test('parseByDayMonth', () => {
    expect(parseBy('by[day[1,2,3],month[1,2,3]]')).toEqual({ byday: [1, 2, 3], bymonth: [1, 2, 3] })
  })

  test('parseTimeCode', () => {
    console.log(parseTimeCode('2023/7/10 22:00 Asia/Shanghai;'))
  })
})