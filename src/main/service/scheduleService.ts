import { prisma } from '../client'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { parseTimeCodes } from './timeCodeParser'
import { EventBriefVO, TodoBriefVO, ScheduleBriefVO } from '../../utils/vo'
import { difference, union } from '../../utils/utils'
import { TimeRange } from './timeCodeParserTypes'
import { Time } from '@prisma/client'
import { getSettingByPath } from './settingsService'


export async function createSchedule(name: string, timeCodes: string, comment: string, exTimeCodes: string) {
  return prisma.$transaction(async (tx) => {
    const { eventType, rTimes, exTimes, rruleStr, rTimeCodes: code, exTimeCodes: exCode } = parseTimeCodes(timeCodes, exTimeCodes)

    const schedule = await tx.schedule.create({
      data: {
        id: uuidv4(),
        type: eventType,
        name: name,
        rrules: rruleStr,
        rTimeCode: code,
        exTimeCode: exCode,
        comment: comment,
      }
    })

    const allTimes: { [key: string]: TimeRange[] } = {
      rTimes: rTimes,
      exTimes: exTimes
    }

    for (const key in allTimes) {
      // 遍历 rTimes 和 exTimes
      for (const time of allTimes[key as keyof typeof allTimes]) {
        await tx.time.create({
          data: {
            id: uuidv4(),
            scheduleId: schedule.id,
            excluded: key == 'rTimes' ? false : true,
            start: time.start,
            end: time.end,
            startMark: time.startMark,
            endMark: time.endMark,
          }
        })
      }
    }

    return schedule
  })
}

export async function updateScheduleById(id: string, name: string, timeCodes: string, comment: string, exTimeCodes: string) {
  return prisma.$transaction(async (tx) => {
    let oldSchedule = await tx.schedule.findUniqueOrThrow({
      where: {
        id: id
      },
      select: {
        type: true,
        rTimeCode: true,
        exTimeCode: true,
        deleted: true
      }
    })

    if (oldSchedule.deleted) {
      throw new Error('try to update a deleted schedule')
    }

    const {eventType, rTimes, exTimes, rruleStr, rTimeCodes: code, exTimeCodes: exCode} = parseTimeCodes(timeCodes, exTimeCodes)
    
    if (oldSchedule.type !== eventType) {
      throw new Error('try to change schedule type')
    }

    const schedule = await tx.schedule.update({
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

    // 获取所有和该 Schedule 相关的时间片
    const times = await tx.time.findMany({
      where: {
        scheduleId: id
      },
      select: {
        id: true,
        start: true,
        end: true,
        startMark: true,
        endMark: true,
      }
    })

    const equal = (time1: TimeRange | Time, time2: TimeRange | Time) => { 
      /**
       * 两个时间片相等的条件
       */
      if (time1.start != null && time2.start != null) {
        if (DateTime.fromISO(time1.start).toMillis() !== DateTime.fromISO(time2.start).toMillis()) {
          return false
        }
      }
      if (DateTime.fromISO(time1.end).toMillis() !== DateTime.fromISO(time2.end).toMillis()) {
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

    const allTimes: { [key: string]: TimeRange[] } = {
      rTimes: rTimes,
      exTimes: exTimes
    }

    for (const key in allTimes) {
      // 遍历 rTimes 和 exTimes
      for (const time of allTimes[key as keyof typeof allTimes]) {
        // 如果曾创建过一样的时间片，恢复 deleted 为 false
        if (times.some(y => equal(time, y))) {
          const t = times.find(y => equal(time, y))
          await tx.time.update({
            where: {
              id: t!.id // 一定不会是 null
            },
            data: {
              excluded: key == 'rTimes' ? false : true,
              deleted: false,
            }
          })
        }
        // 如果以前没创建过一样的，就创建
        else {
          await tx.time.create({
            data: {
              id: uuidv4(),
              scheduleId: schedule.id,
              excluded: key == 'rTimes' ? false : true,
              start: time.start,
              end: time.end,
              startMark: time.startMark,
              endMark: time.endMark,
              done: false,
            }
          })
        }
      }
    }

    // 不包括在 rTimes 和 exTimes 的内容 deleted 设为 true
    const toDel = difference(times, [...rTimes, ...exTimes], equal)

    // 需要删除的时间片
    for (const time of toDel as Time[]) {
      await tx.time.update({
        where: {
          id: time.id
        },
        data: {
          deleted: true,
        }
      })
    }
    return schedule
  })
}

export async function findEventsBetween(start: string, end: string) {
  const times = await prisma.time.findMany({
    where: {
      excluded: false,
      start: {
        not: null,
        gte: DateTime.fromISO(start).setZone('UTC').toISO()!, // 一定合法，所以不会是 null
        lte: DateTime.fromISO(end).setZone('UTC').toISO()! // 一定合法，所以不会是 null
      },
      done: false,
      deleted: false,
    },
    orderBy: {
      start: 'asc'
    },
    select: {
      id: true,
      scheduleId: true,
      start: true,
      end: true,
      startMark: true,
      endMark: true,
    }
  })
  const res: EventBriefVO[] = []
  for (const time of times) {
    const event = await prisma.schedule.findUniqueOrThrow({
      where: {
        type: 'event',
        id: time.scheduleId,
        deleted: false,
      },
      select: {
        name: true,
        comment: true,
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
    select: {
      id: true,
      name: true,
    }
  })
  for (const todo of todos) {
    const time = await prisma.time.findFirst({
      where: {
        scheduleId: todo.id,
        excluded: false,
        end: {
          gte: DateTime.now()
          .startOf('day')
          .minus({ days: 1 })
          .plus({ 
            hours: getSettingByPath('preferences.startTime.hour'), 
            minutes: getSettingByPath('preferences.startTime.minute') 
          }) // 每天的 start time 作为逻辑上的次日开始时间，未达次日 start time 就过期的 todo 显示 expired，而不是直接消失
          .setZone('UTC').toISO()!, // 一定合法，所以不会是 null
        },
        deleted: false,
      },
      orderBy: {
        end: 'asc'
      },
      select: {
        id: true,
        end: true,
        done: true,
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
      excluded: false,
      end: {
        gte: DateTime.now().startOf('day')
        .minus({ days: 1 })
        .plus({ 
          hours: getSettingByPath('preferences.startTime.hour'), 
          minutes: getSettingByPath('preferences.startTime.minute') 
        }) // 每天的 start time 作为逻辑上的次日开始时间，未达次日 start time 就过期的 todo 显示 expired，而不是直接消失
        .setZone('UTC').toISO()!, // 一定合法，所以不会是 null
        lte: DateTime.now().endOf('day')
        .plus({ 
          hours: getSettingByPath('preferences.startTime.hour'), 
          minutes: getSettingByPath('preferences.startTime.minute') 
        }) // 每天的 end time 作为逻辑上的当日结束时间，超过当日 end time 的 todo 显示 expired，而不是直接消失
        .setZone('UTC').toISO()! // 一定合法，所以不会是 null
      },
      deleted: false,
    },
    orderBy: {
      end: 'asc'
    },
    select: {
      id: true,
      scheduleId: true,
      end: true,
      done: true,
    }
  })

  for (const time of times) {
    const todo = await prisma.schedule.findUniqueOrThrow({
      where: {
        id: time.scheduleId  // 上面已经保证 deleted 为 false
      },
      select: {
        id: true,
        name: true,
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

export async function findScheduleById(id: string) {
  const schedule = await prisma.schedule.findUnique({
    where: {
      id: id
    }
  })
  return schedule
}

export async function findTimesByScheduleId(scheduleId: string) {
  const times = await prisma.time.findMany({
    where: {
      scheduleId: scheduleId,
      excluded: false,
      deleted: false,
    }
  })
  return times
}

export async function findRecordsByScheduleId(scheduleId: string) {
  const records = await prisma.record.findMany({
    where: {
      scheduleId: scheduleId,
      deleted: false,
    }
  })
  return records
}

// 嵌套写入就是事务
export async function deleteScheduleById(id: string) {
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

export async function deleteTimeById(id: string) {
  return prisma.$transaction(async (tx) => {
    const time = await tx.time.update({
      where: {
        id: id
      },
      data: {
        excluded: true
      }
    })

    let startTime: DateTime
    const endTime = DateTime.fromISO(time.end).setZone('UTC')
    const endHour = time.endMark[0] == '1' ? endTime.hour : '?'
    const endMinute = time.endMark[1] == '1' ? endTime.minute : '?'
    let exTimeCode: string
    if (time.start) {
      startTime = DateTime.fromISO(time.start).setZone('UTC')
      const startHour = time.startMark[0] == '1' ? startTime.hour : '?'
      const startMinute = time.startMark[1] == '1' ? startTime.minute : '?'
      exTimeCode = `${startTime.toFormat('yyyy/M/d')} ${startHour}:${startMinute}-${endHour}:${endMinute} UTC`
    }
    else {
      exTimeCode = `${endTime.toFormat('yyyy/M/d')} ${endHour}:${endMinute} UTC`
    }

    const schedule = await tx.schedule.findUniqueOrThrow({
      where: {
        id: time.scheduleId
      },
      select: {
        exTimeCode: true
      }
    })

    await tx.schedule.update({
      where: {
        id: time.scheduleId
      },
      data: {
        exTimeCode: schedule.exTimeCode == '' ? schedule.exTimeCode + exTimeCode : schedule.exTimeCode + ';' + exTimeCode
      }
    })

    return time
  })
}

export async function deleteTimeByIds(ids: string[]) {
  for (const id of ids) {
    await deleteTimeById(id)
  }
}

export async function updateTimeCommentById(id: string, comment: string) {
  const time = await prisma.time.update({
    where: {
      id: id
    },
    data: {
      comment: comment,
    }
  })
  return time
}

export async function findAllSchedules(
  conditions: { 
    search: string, 
    dateRange: [number, number] | null,
    type: string | null,
    star: boolean | null,
  }, 
  page: number, pageSize: number
) {
  console.log(conditions)
  const where = {
    OR: [
      { name: { contains: conditions.search } },
      { comment: { contains: conditions.search } },
      { times: { 
        some: { 
          comment: { contains: conditions.search } 
        } 
      } },
    ],
    AND: [
      conditions.dateRange ? {
        times: {
          some: {
            OR: [
              {
                start: null,
                end: {
                  gte: DateTime.fromJSDate(new Date(conditions.dateRange[0])).setZone('UTC').toISO()!, // 前端保证合法性
                  lte: DateTime.fromMillis(conditions.dateRange[1]).endOf('day').setZone('UTC').toISO()! // 前端保证合法性
                }
              },
              { 
                start: {
                  gte: DateTime.fromJSDate(new Date(conditions.dateRange[0])).setZone('UTC').toISO()!, // 前端保证合法性
                  lte: DateTime.fromMillis(conditions.dateRange[1]).endOf('day').setZone('UTC').toISO()! // 前端保证合法性
                },
                end: {
                  gte: DateTime.fromJSDate(new Date(conditions.dateRange[0])).setZone('UTC').toISO()!, // 前端保证合法性
                  lte: DateTime.fromMillis(conditions.dateRange[1]).endOf('day').setZone('UTC').toISO()! // 前端保证合法性
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
    select: {
      id: true,
      type: true,
      name: true,
      star: true,
      deleted: true,
      created: true,
      updated: true,
    }
  })

  const res: ScheduleBriefVO[] = []
  for (const schedule of schedules) {
    res.push({
      id: schedule.id,
      type: schedule.type,
      name: schedule.name,
      star: schedule.star,
      deleted: schedule.deleted,
      created: schedule.created!,  // prisma 插件保证这个值不为 null
      updated: schedule.updated!,  // prisma 插件保证这个值不为 null
    })
  }

  return {
    data: res,
    total: count
  }
}

export function updateDoneById(id: string, done: boolean) {
  return prisma.time.update({
    where: {
      id: id
    },
    data: {
      done: done
    }
  })
}

export function updateStarById(id: string, star: boolean) {
  return prisma.schedule.update({
    where: {
      id: id
    },
    data: {
      star: star
    }
  })
}

export async function createRecord(scheduleId: string, startTime: string, endTime: string) {
  const record = await prisma.record.create({
    data: {
      id: uuidv4(),
      scheduleId: scheduleId,
      start: startTime,
      end: endTime,
    }
  })
  return record
}

export async function sync(schedules, times, records) {
  // 服务器的数据不可能 outdated，所以不需要比较 version
  return prisma.$transaction(async (tx) => {
    for (const schedule of schedules) {
      // @ts-ignore
      await tx.schedule.sync(schedule.id, {
        type: schedule.type,
        name: schedule.name,
        rrules: schedule.rrules,
        rTimeCode: schedule.rTimeCode,
        exTimeCode: schedule.exTimeCode,
        comment: schedule.comment,
        star: schedule.star,
        deleted: schedule.deleted,
        created: schedule.created,
        updated: schedule.updated,
        syncAt: schedule.syncAt,
        version: schedule.version,
      })
    }

    for (const time of times) {
      // @ts-ignore
      await tx.time.sync(time.id, {
        scheduleId: time.scheduleId,
        start: time.start,
        end: time.end,
        startMark: time.startMark,
        endMark: time.endMark,
        comment: time.comment,
        done: time.done,
        deleted: time.deleted,
        created: time.created,
        updated: time.updated,
        syncAt: time.syncAt,
        version: time.version,
      })
    }

    for (const record of records) {
      // @ts-ignore
      await tx.record.sync(record.id, {
        scheduleId: record.scheduleId,
        start: record.start,
        end: record.end,
        deleted: record.deleted,
        created: record.created,
        updated: record.updated,
        syncAt: record.syncAt,
        version: record.version,
      })
    }
  })
}

export async function getUnSynced(lastSyncAt: string) {
  const schedules = await prisma.schedule.findMany({
    where: {
      updated: {
        gt: lastSyncAt
      }
    }
  })

  const times = await prisma.time.findMany({
    where: {
      updated: {
        gt: lastSyncAt
      }
    }
  })

  const records = await prisma.record.findMany({
    where: {
      updated: {
        gt: lastSyncAt
      }
    }
  })

  return {
    schedules,
    times,
    records
  }
}

export async function updateSyncedVersion(scheduleIds: string[], timeIds: string[], recordIds: string[]) {
  const tables = {
    'schedule': scheduleIds,
    'time': timeIds,
    'record': recordIds,
  }
  return prisma.$transaction(async (tx) => {
    for (const [table, ids] of Object.entries(tables)) {
      // @ts-ignore
      await tx[table].updateMany({
        where: {
          id: {
            in: ids
          }
        },
        data: {
          version: {
            increment: 1
          }
        }
      })
    }
  })
}
