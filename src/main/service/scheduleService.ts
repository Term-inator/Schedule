import { PrismaClient } from '@prisma/client'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { parseTimeCode } from './timeCodeParser'
import { EventBriefVO, TodoBriefVO } from '../../utils/vo'

const prisma = new PrismaClient()

export async function createSchedule(name: string, timeCode: string, comment: string, actionCode: string) {
  const { times, rruleStrs } = parseTimeCode(timeCode)

  const schedule = await prisma.schedule.create({
    data: {
      uid: uuidv4(),
      type: times[0].start ? 'event' : 'todo',
      name: name,
      rrules: rruleStrs.join(';'),
      times: {
        create: times
      },
      timeCode: timeCode,
      comment: comment,
      actionCode: actionCode,
    }
  })
  return schedule
}

export async function findEventsBetween(start: Date, end: Date) {
  const times = await prisma.time.findMany({
    where: {
      start: {
        not: null,
        gte: start,
        lte: end,
      },
      done: false,
      deleted: false,
    },
  })
  const res: EventBriefVO[] = []
  for (const time of times) {
    const event = await prisma.schedule.findUnique({
      where: {
        type: 'event',
        id: time.scheduleId,
        done: false,
        deleted: false,
      }
    })
    res.push({
      id: time.id,
      scheduleId: time.scheduleId,
      name: event.name,
      start: time.start,
      end: time.end
    })
  }
  return res
}

export async function findAllTodos() {
  const todos = await prisma.schedule.findMany({
    where: {
      type: 'todo',
      done: false,
      deleted: false,
    },
  })
  const res: TodoBriefVO[] = []
  for (const todo of todos) {
    const time = await prisma.time.findFirst({
      where: {
        scheduleId: todo.id,
        done: false,
        end: {
          gte: DateTime.now().startOf('day').toJSDate()
        },
        deleted: false,
      },
      orderBy: {
        end: 'asc'
      }
    })
    if (time) {
      res.push({
        id: time.id,
        scheduleId: todo.id,
        name: todo.name,
        end: time.end,
        done: time.done
      })
    }
  }
  return res
}

export async function findScheduleById(id: number) {
  const schedule = await prisma.schedule.findUnique({
    where: {
      id: id
    }
  })
  return schedule
}

export async function findTimesByScheduleId(scheduleId: number) {
  const times = await prisma.time.findMany({
    where: {
      scheduleId: scheduleId,
      deleted: false,
    }
  })
  return times
}

export async function findRecordsByScheduleId(scheduleId: number) {
  const records = await prisma.record.findMany({
    where: {
      scheduleId: scheduleId,
      deleted: false,
    }
  })
  return records
}
