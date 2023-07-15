export type EventBriefVO = {
  id: number // timeId
  scheduleId: number
  name: string
  start: Date
  end: Date
  coment: string
}

export type TodoBriefVO = {
  id: number // timeId
  scheduleId: number
  name: string
  end: Date
  done: boolean
}