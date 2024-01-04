const fs = require('fs')
import path from 'path'
import { flatten, unflatten } from "../../utils/utils"

let isDev = true
try {
  const is = require('@electron-toolkit/utils')
  isDev = is.dev
}
catch (e) {
  // do nothing
}

const settingsPath = isDev ? 'resources/settings.json' : path.join(process.resourcesPath, 'settings.json')
console.log('settingsPath', settingsPath)
const settingsCache = {}

export function getSettingsByPath(path: string) {
  if (!settingsCache[path]) {
    loadSettings()
  }
  return settingsCache[path]
}

export function loadSettings() {
  /**
   * @returns {object} flatten 的对象
   */
  if (!fs.existsSync(settingsPath)) {
    return {}
  }
  
  const settings = flatten(JSON.parse(fs.readFileSync(settingsPath, 'utf8')))
  Object.assign(settingsCache, settings)
  return settings
}

export function saveSettings(settings: string) {
  /**
   * @param {string} settings flatten 的 JSON 字符串
   */
  const settingsUnflatten = unflatten(JSON.parse(settings))
  fs.writeFileSync(settingsPath, JSON.stringify(settingsUnflatten, null, 2), 'utf8')
  Object.assign(settingsCache, JSON.parse(settings))
}