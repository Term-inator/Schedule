export type EventBriefVO = {
  id: number // timeId
  scheduleId: number
  name: string
  comment: string
  start: string | null
  end: string
  startMark: string
  endMark: string
}

export type TodoBriefVO = {
  id: number // timeId
  scheduleId: number
  name: string
  end: string
  done: boolean
}

export type ScheduleBriefVO = {
  id: number
  type: string
  name: string
  star: boolean
  deleted: boolean
  created: Date
  updated: Date
}

export type AlarmVO = {
  id: number // timeId
  scheduleId: number
  type: string
  name: string
  comment: string
  start: string | null
  end: string
  startMark: string
  endMark: string
}
