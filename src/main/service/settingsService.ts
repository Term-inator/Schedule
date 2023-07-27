const fs = require('fs')
import { flatten, unflatten } from "../../utils/utils"

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
  if (!fs.existsSync('resources/settings.json')) {
    return {}
  }
  const settings = flatten(JSON.parse(fs.readFileSync('resources/settings.json', 'utf8')))
  Object.assign(settingsCache, settings)
  return settings
}

export function saveSettings(settings: string) {
  /**
   * @param {string} settings flatten 的 JSON 字符串
   */
  const settingsUnflatten = unflatten(JSON.parse(settings))
  fs.writeFileSync('resources/settings.json', JSON.stringify(settingsUnflatten, null, 2), 'utf8')
  Object.assign(settingsCache, JSON.parse(settings))
}