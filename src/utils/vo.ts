export type EventBriefVO = {
  id: string // timeId
  scheduleId: string
  name: string
  comment: string
  start: string | null
  end: string
  startMark: string
  endMark: string
}

export type TodoBriefVO = {
  id: string // timeId
  scheduleId: string
  name: string
  end: string
  done: boolean
}

export type ScheduleBriefVO = {
  id: string
  type: string
  name: string
  star: boolean
  deleted: boolean
  created: Date
  updated: Date
}

export type AlarmVO = {
  id: string // timeId
  scheduleId: string
  type: string
  name: string
  comment: string
  start: string | null
  end: string
  startMark: string
  endMark: string
}
