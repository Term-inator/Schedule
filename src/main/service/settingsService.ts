const fs = require('fs')


export function loadSettings() {
  if (!fs.existsSync('resources/settings.json')) {
    return {}
  }
  const settings = JSON.parse(fs.readFileSync('resources/settings.json', 'utf8'))
  return settings
}

export function saveSettings(settings) {
  fs.writeFileSync('resources/settings.json', settings, 'utf8')
}