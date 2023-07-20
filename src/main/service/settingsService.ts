const fs = require('fs')

const settingsCache = {}

export function getSettingsByKey(key) {
  if (!settingsCache[key]) {
    loadSettings()
  }
  return settingsCache[key]
}

export function loadSettings() {
  if (!fs.existsSync('resources/settings.json')) {
    return {}
  }
  const settings = JSON.parse(fs.readFileSync('resources/settings.json', 'utf8'))
  Object.assign(settingsCache, settings)
  return settings
}

export function saveSettings(settings) {
  fs.writeFileSync('resources/settings.json', settings, 'utf8')
  Object.assign(settingsCache, JSON.parse(settings))
}