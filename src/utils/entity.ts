class BaseEntity {
  id: number
  done: boolean
  deleted: boolean
  created: Date
  updated: Date

  constructor (data: Partial<BaseEntity>) {
    Object.assign(this, data)
  }
}

export class Schedule extends BaseEntity {
  uid: string
  type: string
  title: string
  name: string
  rrules: string
  times: Object[]
  comment: string
  actionCode: string

  constructor (data: Partial<Schedule>) {
    super(data)
  }
}

export class Time extends BaseEntity {
  scheduleId: number
  start: Date
  end: Date
  startMark: string
  endMark: string

  constructor (data: Partial<Time>) {
    super(data)
  }
}