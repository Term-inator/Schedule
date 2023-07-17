class BaseEntity {
  id: number
  deleted: boolean
  created: Date
  updated: Date

  constructor (data: Partial<BaseEntity>) {
    Object.assign(this, data)
  }
}

interface Donable {
  done: boolean
}

export class Schedule extends BaseEntity implements Donable {
  uid: string
  type: string
  name: string
  rrules: string
  times: Object[]
  rTimeCode: string
  exTimeCode: string
  comment: string
  actionCode: string
  done: boolean
  records: Object[]

  constructor (data: Partial<Schedule>) {
    super(data)
  }
}

interface TimeSlot {
  start: Date
  end: Date
}

export class Time extends BaseEntity implements Donable, TimeSlot {
  scheduleId: number
  startMark: string
  endMark: string
  start: Date
  end: Date

  constructor (data: Partial<Time>) {
    super(data)
  }
}

export class Record extends BaseEntity implements TimeSlot {
  scheduleId: number
  start: Date
  end: Date

  constructor (data: Partial<Record>) {
    super(data)
  }
}

export type ScheduleType = typeof Schedule & BaseEntity & Donable
export type TimeType = typeof Time & BaseEntity & Donable & TimeSlot
export type RecordType = typeof Record & BaseEntity & TimeSlot