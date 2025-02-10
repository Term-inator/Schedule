import moment from 'moment-timezone'
import { DateTime } from 'luxon'

export function getTimeZoneAbbrMap() {
  const res = new Map()
  for (const tz of moment.tz.names()) {
    const abbr = moment.tz(tz).format('z')
    res.get(abbr)?.add(tz) || res.set(abbr, new Set([tz]))
  }
  return res
}

export function isValidTimeZone(timeZone: string) {
  return moment.tz.names().includes(timeZone)
}

export function removeTimeZone(date: DateTime) {
  date.setZone('utc', { keepLocalTime: true })
  const fmt = 'yyyy-MM-ddTHH:mm'
  DateTime.fromFormat(date.toFormat(fmt), fmt, { zone: 'utc' })
}
