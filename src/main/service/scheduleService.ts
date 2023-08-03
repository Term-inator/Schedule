import { prisma } from '../client'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { parseTimeCodes } from './timeCodeParser'
import { EventBriefVO, TodoBriefVO, ScheduleBriefVO } from '../../utils/vo'
import { difference, union } from '../../utils/utils'
import { TimeRange } from './timeCodeParserTypes'
import { Time } from '@prisma/client'


export async function createSchedule(name: string, timeCodes: string, comment: string, exTimeCodes: string) {
  const { eventType, rTimes, exTimes, rruleStr, rTimeCodes: code, exTimeCodes: exCode } = parseTimeCodes(timeCodes, exTimeCodes)

  const schedule = await prisma.schedule.create({
    data: {
      uid: uuidv4(),
      type: eventType,
      name: name,
      rrules: rruleStr,
      rTimeCode: code,
      exTimeCode: exCode,
      comment: comment,
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

export async function updateSchedule(id: number, name: string, timeCodes: string, comment: string, exTimeCodes: string) {
  let oldSchedule = await prisma.schedule.findUniqueOrThrow({
    where: {
      id: id
    }
  })

  if (oldSchedule.deleted) {
    throw new Error('try to update a deleted schedule')
  }

  const {eventType, rTimes, exTimes, rruleStr, rTimeCodes: code, exTimeCodes: exCode} = parseTimeCodes(timeCodes, exTimeCodes)
  
  if (oldSchedule.type !== eventType) {
    throw new Error('try to change schedule type')
  }

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
    }
  })

  // 如果时间片没有变化，直接返回
  if (oldSchedule.rTimeCode == code && oldSchedule.exTimeCode == exCode) {
    return schedule
  }

  // 获取所有时间
  const times = await prisma.time.findMany({
    where: {
      scheduleId: id,
    }
  })

  const equal = (time1: TimeRange | Time, time2: TimeRange | Time) => { 
    /**
     * 两个时间片相等的条件
     */
    if (time1.start != null && time2.start != null) {
      if (time1.start.getTime() - time2.start.getTime() !== 0) {
        return false
      }
    }
    if (time1.end.getTime() - time2.end.getTime() !== 0) {
      return false
    }
    if (time1.startMark !== time2.startMark) {
      return false
    }
    if (time1.endMark !== time2.endMark) {
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
          id: time!.id // 一定不会是 null
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
          id: time!.id // 一定不会是 null
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
  for (const time of toDel as Time[]) {
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
    const event = await prisma.schedule.findUniqueOrThrow({
      where: {
        type: 'event',
        id: time.scheduleId,
        deleted: false,
      }
    })
    res.push({
      id: time.id,
      scheduleId: time.scheduleId,
      name: event.name,
      comment: event.comment,
      start: time.start,
      end: time.end,
      startMark: time.startMark,
      endMark: time.endMark
    })
  }
  return res
}

export async function findAllTodos() {
  const firstTodos: TodoBriefVO[] = [] // 如果是 todo 有多个时间片，只取第一个
  const todayTodos: TodoBriefVO[] = [] // 如果是今天的 todo，即使有多个时间片，也都取出来
  const todos = await prisma.schedule.findMany({
    where: {
      type: 'todo',
      deleted: false,
    },
  })
  for (const todo of todos) {
    const time = await prisma.time.findFirst({
      where: {
        scheduleId: todo.id,
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
      firstTodos.push({
        id: time.id,
        scheduleId: todo.id,
        name: todo.name,
        end: time.end,
        done: time.done
      })
    }
  }

  const times = await prisma.time.findMany({
    where: {
      schedule: {
        type: 'todo',
        deleted: false,
      },
      end: {
        gte: DateTime.now().startOf('day').toJSDate(),
        lte: DateTime.now().endOf('day').toJSDate()
      },
      deleted: false,
    },
    orderBy: {
      end: 'asc'
    }
  })

  for (const time of times) {
    const todo = await prisma.schedule.findUniqueOrThrow({
      where: {
        id: time.scheduleId
      }
    })
    todayTodos.push({
      id: time.id,
      scheduleId: todo.id,
      name: todo.name,
      end: time.end,
      done: time.done
    })
  }

  const res = union(firstTodos, todayTodos, (a, b) => a.id == b.id)

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
      },
      records: {
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
      deleted: true
    }
  })

  let startTime: DateTime
  const endTime = DateTime.fromJSDate(time.end).setZone('UTC')
  const endHour = time.endMark[0] == '1' ? endTime.hour : '?'
  const endMinute = time.endMark[1] == '1' ? endTime.minute : '?'
  let exTimeCode: string
  if (time.start) {
    startTime = DateTime.fromJSDate(time.start).setZone('UTC')
    const startHour = time.startMark[0] == '1' ? startTime.hour : '?'
    const startMinute = time.startMark[1] == '1' ? startTime.minute : '?'
    exTimeCode = `${startTime.toFormat('yyyy/M/d')} ${startHour}:${startMinute}-${endHour}:${endMinute} UTC`
  }
  else {
    exTimeCode = `${endTime.toFormat('yyyy/M/d')} ${endHour}:${endMinute} UTC`
  }

  const schedule = await prisma.schedule.findUniqueOrThrow({
    where: {
      id: time.scheduleId
    }
  })

  await prisma.schedule.update({
    where: {
      id: time.scheduleId
    },
    data: {
      exTimeCode: schedule.exTimeCode == '' ? schedule.exTimeCode + exTimeCode : schedule.exTimeCode + ';' + exTimeCode
    }
  })

  return time
}

export async function deleteTimeByIds(ids: number[]) {
  for (const id of ids) {
    await deleteTimeById(id)
  }
}

export async function findAllSchedules(
  conditions: { 
    search: string, 
    dateRange: [number, number] | null,
    type: string | null,
    star: true | null,
  }, 
  page: number, pageSize: number
) {
  console.log(conditions)
  const where = {
    OR: [
      { name: { contains: conditions.search } },
      { comment: { contains: conditions.search } },
    ],
    AND: [
      conditions.dateRange ? {
        times: {
          some: {
            OR: [
              {
                start: null,
                end: {
                  gte: new Date(conditions.dateRange[0]),
                  lte: DateTime.fromMillis(conditions.dateRange[1]).endOf('day').toJSDate()
                }
              },
              { 
                start: {
                  gte: new Date(conditions.dateRange[0]),
                  lte: DateTime.fromMillis(conditions.dateRange[1]).endOf('day').toJSDate()
                },
                end: {
                  gte: new Date(conditions.dateRange[0]),
                  lte: DateTime.fromMillis(conditions.dateRange[1]).endOf('day').toJSDate()
                }
              },
            ],
            deleted: false
          }
        }
      } : {},
      conditions.type ? { type: { equals: conditions.type } } : {},
      conditions.star ? { star: { equals: conditions.star } } : {}
    ]
  }

  const count = await prisma.schedule.count({
    where
  })

  const schedules = await prisma.schedule.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
  })

  const res: ScheduleBriefVO[] = []
  for (const schedule of schedules) {
    res.push({
      id: schedule.id,
      type: schedule.type,
      name: schedule.name,
      deleted: schedule.deleted,
      created: schedule.created,
      updated: schedule.updated,
    })
  }

  return {
    data: res,
    total: count
  }
}

export function updateDoneById(id: number, done: boolean) {
  return prisma.time.update({
    where: {
      id: id
    },
    data: {
      done: done
    }
  })
}

export function updateStarById(id: number, star: boolean) {
  return prisma.schedule.update({
    where: {
      id: id
    },
    data: {
      star: star
    }
  })
}

export async function createRecord(scheduleId: number, startTime: Date, endTime: Date) {
  const record = await prisma.record.create({
    data: {
      scheduleId: scheduleId,
      start: startTime,
      end: endTime,
    }
  })
  return record
}
