export type EventBriefVO = {
  id: number // timeId
  name: string
  start: Date
  end: Date
}

export type TodoBriefVO = {
  id: number // timeId
  name: string
  end: Date
  done: boolean
}