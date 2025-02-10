import {
  app,
  shell,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  Tray,
  Menu,
  nativeImage
} from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon64.ico?asset'
import { prisma } from './client'
import AutoLaunch from 'auto-launch'
import { closeWebSocket, openWebSocket, sendWebSocketMessage } from './websocket'
import { getSettings, loadSettings } from './service/settingsService'
import { initializeAlarm } from './alarm'
import { isProd } from '../utils/mode'

require('dotenv').config({
  path: isProd()
    ? join(process.resourcesPath, '.env.production')
    : join(__dirname, '../../.env.development') // 读取 .env 文件
})
console.log(`isProd: ${isProd()}`, join(process.resourcesPath, '.env.production'))

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    icon,
    // ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    // 如果是开机自启动
    if (process.argv.includes('--autostart')) {
      mainWindow.hide()
    } else {
      mainWindow.show()
      mainWindow.maximize() // maximize the window
    }
  })

  // shortcut
  app.whenReady().then(() => {
    globalShortcut.register('F5', () => {
      mainWindow.reload()
    })
  })

  app.on('will-quit', () => {
    globalShortcut.unregisterAll()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // 最小化到托盘
  const tray = new Tray(nativeImage.createFromPath(icon))
  // 菜单
  // 托盘图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      id: 'show-window',
      label: 'Full Screen',
      click: () => {
        mainWindow.show()
        mainWindow.maximize() // maximize the window
      }
    },
    {
      id: 'quit',
      label: 'Quit',
      click: () => {
        app.quit()
      }
    }
  ])
  tray.setContextMenu(contextMenu)
  // 设置此托盘图标的悬停提示内容
  tray.setToolTip('Schedule')

  mainWindow.on('minimize', (ev) => {
    ev.preventDefault()
    mainWindow.hide()
  })

  tray.on('double-click', () => {
    mainWindow.show()
    mainWindow.maximize() // maximize the window
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // initialize
  await loadSettings()
  await initializeAlarm()

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  prisma.$disconnect()
  closeWebSocket()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
import {
  createSchedule,
  updateScheduleById,
  findEventsBetween,
  findAllTodos,
  findScheduleById,
  findTimesByScheduleId,
  findRecordsByScheduleId,
  deleteScheduleById,
  deleteTimeByIds,
  updateTimeCommentById,
  findAllSchedules,
  updateDoneById,
  updateStarById,
  createRecord,
  sync as syncSchedule,
  getUnSynced as getUnSyncedSchedule,
  updateSyncedVersion as updateSyncedVersionSchedule
} from './service/scheduleService'
import { login } from './service/userService'
import {
  setSettings,
  sync as syncSettings,
  getUnSynced as getUnSyncedSettings,
  updateSyncedVersion as updateSyncedVersionSettings
} from './service/settingsService'
import { getAlarmObserver } from './alarm'

// TODO: Do not use Function as a type.
function errorHandler(fn: Function) {
  return async function (event: any, ...args: any[]) {
    try {
      const res = await fn(event, ...args)
      return { success: true, data: res }
    } catch (error) {
      console.error(error)
      return { success: false, error }
    }
  }
}

ipcMain.handle(
  'createSchedule',
  errorHandler(async (_, args) => {
    const { name, rTime: rTimeCode, comment, exTime: exTimeCode } = args
    const res = await createSchedule(name, rTimeCode, comment, exTimeCode)
    getAlarmObserver().debouncedUpdate()
    return res
  })
)

ipcMain.handle(
  'updateScheduleById',
  errorHandler(async (_, args) => {
    const { id, name, rTime: rTimeCode, comment, exTime: exTimeCode } = args
    const res = await updateScheduleById(id, name, rTimeCode, comment, exTimeCode)
    getAlarmObserver().debouncedUpdate()
    return res
  })
)

ipcMain.handle(
  'findEventsBetween',
  errorHandler(async (_, args) => {
    const { start, end } = args
    return await findEventsBetween(start, end)
  })
)

ipcMain.handle(
  'findAllTodos',
  errorHandler(async () => {
    return await findAllTodos()
  })
)

ipcMain.handle(
  'findScheduleById',
  errorHandler(async (_, args) => {
    const { id } = args
    return await findScheduleById(id)
  })
)

ipcMain.handle(
  'findTimesByScheduleId',
  errorHandler(async (_, args) => {
    const { scheduleId } = args
    return await findTimesByScheduleId(scheduleId)
  })
)

ipcMain.handle(
  'findRecordsByScheduleId',
  errorHandler(async (_, args) => {
    const { scheduleId } = args
    return await findRecordsByScheduleId(scheduleId)
  })
)

ipcMain.handle(
  'deleteScheduleById',
  errorHandler(async (_, args) => {
    const { id } = args
    const res = await deleteScheduleById(id)
    getAlarmObserver().debouncedUpdate()
    return res
  })
)

ipcMain.handle(
  'deleteTimeByIds',
  errorHandler(async (_, args) => {
    const { ids } = args
    const res = await deleteTimeByIds(ids)
    getAlarmObserver().debouncedUpdate()
    return res
  })
)

ipcMain.handle(
  'updateTimeCommentById',
  errorHandler(async (_, args) => {
    const { id, comment } = args
    return await updateTimeCommentById(id, comment)
  })
)

ipcMain.handle(
  'findAllSchedules',
  errorHandler(async (_, args) => {
    const { conditions, page, pageSize } = args
    return await findAllSchedules(conditions, page, pageSize)
  })
)

ipcMain.handle(
  'updateDoneById',
  errorHandler(async (_, args) => {
    const { id, done } = args
    const res = await updateDoneById(id, done)
    getAlarmObserver().debouncedUpdate()
    return res
  })
)

ipcMain.handle(
  'updateStarById',
  errorHandler(async (_, args) => {
    const { id, star } = args
    return await updateStarById(id, star)
  })
)

ipcMain.handle(
  'createRecord',
  errorHandler(async (_, args) => {
    const { scheduleId, startTime, endTime } = args
    return await createRecord(scheduleId, startTime, endTime)
  })
)

ipcMain.handle(
  'syncSchedule',
  errorHandler(async (_, args) => {
    const { schedules, times, records } = args
    return await syncSchedule(schedules, times, records)
  })
)

ipcMain.handle(
  'getUnSyncedSchedule',
  errorHandler(async (_, args) => {
    const { lastSyncAt } = args
    return await getUnSyncedSchedule(lastSyncAt)
  })
)

ipcMain.handle(
  'updateSyncedVersionSchedule',
  errorHandler(async (_, args) => {
    console.log(args)
    const { schedules: scheduleIds, times: timeIds, records: recordIds } = args
    return await updateSyncedVersionSchedule(scheduleIds, timeIds, recordIds)
  })
)

ipcMain.handle(
  'getSettings',
  errorHandler(async () => {
    return getSettings()
  })
)

const autoLaunch = new AutoLaunch({
  name: 'Schedule',
  path: app.getPath('exe'),
  isHidden: true, // TODO 不起作用
  args: ['--autostart']
})

ipcMain.handle(
  'setSettings',
  errorHandler(async (_, args) => {
    const { settings } = args
    const oldSettings = JSON.parse(JSON.stringify(getSettings()))

    for (const [path, value] of Object.entries(settings)) {
      if (path == 'rrule.timeZone') {
        // 时区发生变化时，更新 alarm
        const oldTimeZone = oldSettings[path]
        const newTimeZone = value
        if (oldTimeZone != newTimeZone) {
          getAlarmObserver().debouncedUpdate()
        }
      } else if (path == 'preferences.openAtLogin') {
        // 开机启动发生变化时，更新开机启动
        if (!is.dev) {
          if (value) {
            autoLaunch.enable()
          } else {
            autoLaunch.disable()
          }
        }
      }
    }

    // 存在 /^alarm\./ 的 key，更新 alarm
    if (Object.keys(settings).some((key) => /^alarm\./.test(key))) {
      console.log('alarmUpdate')
      getAlarmObserver().debouncedUpdate()
    }

    await setSettings(settings)
  })
)

ipcMain.handle(
  'syncSettings',
  errorHandler(async (_, args) => {
    const { settings } = args
    return await syncSettings(settings)
  })
)

ipcMain.handle(
  'getUnSyncedSettings',
  errorHandler(async (_, args) => {
    const { lastSyncAt } = args
    return await getUnSyncedSettings(lastSyncAt)
  })
)

ipcMain.handle(
  'updateSyncedVersionSettings',
  errorHandler(async (_, args) => {
    const { settings: settingsKeys } = args
    return await updateSyncedVersionSettings(settingsKeys)
  })
)

// 提醒设置被更改
// ipcMain.on('alarmUpdate', (event, args) => {
//   getAlarmObserver().debouncedUpdate()
// })

// 用户登录
ipcMain.handle(
  'login',
  errorHandler(async (_, args) => {
    const { uid } = args
    await sendWebSocketMessage('login', {})
    return await login(uid)
  })
)

ipcMain.handle(
  'openWebSocket',
  errorHandler(async (_, args) => {
    const { uid } = args
    await openWebSocket(uid)
  })
)

ipcMain.handle(
  'closeWebSocket',
  errorHandler(async () => {
    await closeWebSocket()
  })
)
