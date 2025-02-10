import { prisma } from '../client'
// import { flatten, unflatten } from "../../utils/utils"

// 缓存中每个设置是 any
// 数据库中每个设置是 string
// 接口传递的参数是 any 字典的 json 字符串，不是 string 字典的 json 字符串

const settingsCache = {}

export function getSettings() {
  return settingsCache
}

export function getSettingByPath(path: string) {
  return settingsCache[path]
}

type SettingType = 'string' | 'number' | 'boolean'

const settingsDict: { [key: string]: [SettingType, any] } = {
  'rrule.timeZone': ['string', ''],
  'rrule.wkst': ['string', 'MO'],
  'alarm.todo.enable': ['boolean', true],
  'alarm.todo.before.hour': ['number', 0],
  'alarm.todo.before.minute': ['number', 5],
  'alarm.event.enable': ['boolean', true],
  'alarm.event.before.hour': ['number', 0],
  'alarm.event.before.minute': ['number', 5],
  'preferences.priority': ['string', 'month'],
  'preferences.days': ['number', 5],
  'preferences.startTime.hour': ['number', 0],
  'preferences.startTime.minute': ['number', 0],
  'preferences.openAtLogin': ['boolean', false],
  'pomodoro.focus.hour': ['number', 0],
  'pomodoro.focus.minute': ['number', 25],
  'pomodoro.smallBreak.hour': ['number', 0],
  'pomodoro.smallBreak.minute': ['number', 5],
  'pomodoro.bigBreak.hour': ['number', 0],
  'pomodoro.bigBreak.minute': ['number', 20]
}

async function initialize() {
  for (const path in settingsDict) {
    const [type, defaultValue] = settingsDict[path]
    await prisma.setting.create({
      data: {
        key: path,
        type,
        value: JSON.stringify(defaultValue) // 加载默认值到数据库: any -> json string
      }
    })
  }
}

export async function loadSettings() {
  /**
   * @returns {object} flatten 的对象
   */
  // 从数据库中读取
  const data = await prisma.setting.findMany()
  if (data.length == 0) {
    console.log('initialize settings')
    await initialize()
  }
  console.log('load settings')

  const settings = {}

  // 从数据库加载到缓存: json string -> any, 由于 js 特性, 不需要转换类型
  for (const setting of data) {
    settings[setting.key] = JSON.parse(setting.value)
  }
  Object.assign(settingsCache, settings)
  return settings
}

export async function setSettings(settings: { [key: string]: any }) {
  /**
   * @param {object} settings
   */
  // 存入数据库
  await prisma.$transaction(async (tx) => {
    for (const key in settings) {
      await tx.setting.update({
        where: {
          key
        },
        data: {
          value: JSON.stringify(settings[key]) // 用户输入存入数据库 any -> json string
        }
      })
    }
  })
  Object.assign(settingsCache, settings)
}

export async function setSettingByPath(path: string, value: any) {
  /**
   * @deprecated
   * @param {string} path
   * @param {any} value
   */
  // 存入数据库

  await prisma.setting.update({
    where: {
      key: path
    },
    data: {
      value: JSON.stringify(value) // 用户输入存入数据库 any -> json string
    }
  })

  settingsCache[path] = value // 用户输入存入缓存 any -> any
}

export async function sync(settings) {
  // 服务器的数据不可能 outdated，所以不需要比较 version
  await prisma.$transaction(async (tx) => {
    for (const setting of settings) {
      await tx.setting.update({
        where: {
          key: setting.key
        },
        data: {
          value: JSON.stringify(setting.value), // 接口数据存入数据库 any -> json string
          updated: setting.updated,
          syncAt: setting.syncAt,
          version: setting.version
        }
      })
      settingsCache[setting.key] = setting.value // 接口数据存入缓存 any -> any
      console.log(settingsCache)
    }
  })
}

export async function getUnSynced(lastSyncAt: string) {
  const settings = await prisma.setting.findMany({
    where: {
      updated: {
        gt: lastSyncAt
      }
    }
  })
  settings.map((setting) => {
    setting.value = JSON.parse(setting.value) // 数据库数据转换为接口数据 json string -> any
  })
  return {
    settings
  }
}

export async function updateSyncedVersion(settingsKeys: string[]) {
  for (const key of settingsKeys) {
    await prisma.setting.update({
      where: {
        key
      },
      data: {
        version: {
          increment: 1
        }
      }
    })
  }
}
