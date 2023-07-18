import { PrismaClient } from '@prisma/client'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { parseTimeCodes } from './timeCodeParser'
import { EventBriefVO, TodoBriefVO } from '../../utils/vo'
import { difference } from '../../utils/utils'

const prisma = new PrismaClient()

export async function createSchedule(name: string, timeCodes: string, comment: string, actionCode: string, exTimeCodes: string) {
  const { rTimes, exTimes, rruleStr, rTimeCodes: code, exTimeCodes: exCode } = parseTimeCodes(timeCodes, exTimeCodes)

  const schedule = await prisma.schedule.create({
    data: {
      uid: uuidv4(),
      type: rTimes[0].start ? 'event' : 'todo',
      name: name,
      rrules: rruleStr,
      rTimeCode: code,
      exTimeCode: exCode,
      comment: comment,
      actionCode: actionCode,
    }
  })

  for (const time of rTimes) {
    await prisma.time.create({
      data: {
        scheduleId: schedule.id,
        start: time.start,
        end: time.end,
        startMark: time.startMark,
        endMark: time.endMark,
        done: false,
        deleted: false,
      }
    })
  }

  for (const time of exTimes) {
    await prisma.time.create({
      data: {
        scheduleId: schedule.id,
        start: time.start,
        end: time.end,
        startMark: time.startMark,
        endMark: time.endMark,
        done: false,
        deleted: true,
      }
    })
  }

  return schedule
}

export async function updateSchedule(id: number, name: string, timeCodes: string, comment: string, actionCode: string, exTimeCodes: string) {
  const { rTimes, exTimes, rruleStr, rTimeCodes: code, exTimeCodes: exCode } = parseTimeCodes(timeCodes, exTimeCodes)

  const schedule = await prisma.schedule.update({
    where: {
      id: id
    },
    data: {
      name: name,
      rrules: rruleStr,
      rTimeCode: code,
      exTimeCode: exCode,
      comment: comment,
      actionCode: actionCode,
    }
  })

  // 获取所有时间
  const times = await prisma.time.findMany({
    where: {
      scheduleId: id,
    }
  })

  const equal = (time, timeRangeObject) => { 
    /**
     * time - time
     * timeRangeObject - timeRangeObject
     * time - timeRangeObject
     * timeRangeObject - time
     * 都适用
     */
    if (timeRangeObject.start - time.start !== 0) {
      return false
    }
    if (timeRangeObject.end - time.end !== 0) {
      return false
    }
    if (timeRangeObject.startMark !== time.startMark) {
      return false
    }
    if (timeRangeObject.endMark !== time.endMark) {
      return false
    }
    return true
  }

  for (const t of rTimes) {
    // 如果以前有一样，恢复 deleted 为 false
    if (times.some(y => equal(t, y))) {
      const time = times.find(y => equal(t, y))
      await prisma.time.update({
        where: {
          id: time.id
        },
        data: {
          deleted: false
        }
      })
    }
    // 如果以前没有一样的，就创建
    else {
      await prisma.time.create({
        data: {
          scheduleId: schedule.id,
          start: t.start,
          end: t.end,
          startMark: t.startMark,
          endMark: t.endMark,
          done: false,
          deleted: false,
        }
      })
    }
  }

  for (const t of exTimes) {
    // 如果有一样的，将 deleted 改为 true
    if (times.some(y => equal(t, y))) {
      const time = times.find(y => equal(t, y))
      await prisma.time.update({
        where: {
          id: time.id
        },
        data: {
          deleted: true
        }
      })
    }
    // 如果没有一样的，就创建
    else {
      await prisma.time.create({
        data: {
          scheduleId: schedule.id,
          start: t.start,
          end: t.end,
          startMark: t.startMark,
          endMark: t.endMark,
          done: false,
          deleted: true,
        }
      })
    }
  }

  // 不包括在 rTimes 和 exTimes 的内容要彻底删除
  const toDel = difference(times, [...rTimes, ...exTimes], equal)

  // 需要删除的时间片
  for (const time of toDel) {
    await prisma.time.delete({
      where: {
        id: time.id
      }
    })
  }
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

export async function deleteScheduleById(id: number) {
  const schedule = await prisma.schedule.update({
    where: {
      id: id
    },
    data: {
      deleted: true,
      times: {
        updateMany: {
          where: {
            deleted: false
          },
          data: {
            deleted: true
          }
        }
      }
    }
  })
  return schedule
}

export async function deleteTimeById(id: number) {
  const time = await prisma.time.update({
    where: {
      id: id
    },
    data: {
      deleted: false
    }
  })

  const startTime = DateTime.fromJSDate(time.start).setZone('UTC')
  const endTime = DateTime.fromJSDate(time.end).setZone('UTC')
  const exTimeCode = `${startTime.toFormat('yyyy/M/d hh:mm')}-${endTime.toFormat('T')} UTC;`

  const schedule = await prisma.schedule.findUnique({
    where: {
      id: time.scheduleId
    }
  })

  await prisma.schedule.update({
    where: {
      id: time.scheduleId
    },
    data: {
      exTimeCode: schedule.exTimeCode + exTimeCode
    }
  })

  return time
}

