import { DateTime } from "luxon"


export function getStartAndDuration(start: DateTime, startMark: string, end: DateTime, endMark: string) {
  switch (startMark) {
    case '00':
      start = end.minus({ hour: 1 })
      break
    case '10':
      if (start.hour == end.hour) {
        start = end.minus({ hour: 1 })
      }
      else {
        start = start.set({ minute: end.minute })
      }
      break
  }

  switch (endMark) {
    case '00':
      end = start.plus({ hour: 1 })
      break
    case '10':
      if (start.hour == end.hour) {
        end = start.plus({ hour: 1 })
      }
      else {
        end = end.set({ minute: start.minute })
      }
      break
  }

  return {
    start: start,
    duration: end.diff(start, 'minutes').minutes
  }
}

export function parseTimeWithUnknown(time: Date, mark: string) {
  const hour = String(time.getHours()).padStart(2, '0')
  const minute = String(time.getMinutes()).padStart(2, '0')
  if (mark == '11') {
    return `${hour}:${minute}`
  }
  else if (mark == '10') {
    return `${hour}:?`
  }
  else if (mark == '00') {
    return `?:?`
  }
}