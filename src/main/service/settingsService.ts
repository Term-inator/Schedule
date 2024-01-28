import { prisma } from '../client'
// import { flatten, unflatten } from "../../utils/utils"

const settingsCache = {}

export function getSettings() {
  console.log(settingsCache)
  return settingsCache
}

export function getSettingsByPath(path: string) {
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
  'pomodoro.bigBreak.minute': ['number', 20],
}

async function initialize() {
  for (const path in settingsDict) {
    const [type, defaultValue] = settingsDict[path]
    await prisma.setting.create({
      data: {
        key: path,
        type,
        value: JSON.stringify(defaultValue)
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

  for (const setting of data) {
    settings[setting.key] = JSON.parse(setting.value)
  }
  Object.assign(settingsCache, settings)
  return settings
}

export async function saveSettings(path: string, value: any) {
  /**
   * @param {string} path
   * @param {any} value
   */
  // 存入数据库
  
  await prisma.setting.update({
    where: {
      key: path
    },
    data: {
      value: JSON.stringify(value)
    }
  })

  settingsCache[path] = value
}