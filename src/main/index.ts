import { app, shell, BrowserWindow, globalShortcut, ipcMain, Tray, Menu } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { prisma } from './client'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.maximize() // maximize the window
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
  const tray = new Tray(join(__dirname, '../../resources/icon.png'))
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

  mainWindow.on('minimize', ev => {
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
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

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
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
import { 
  createSchedule, 
  updateSchedule,
  findEventsBetween, 
  findAllTodos, 
  findScheduleById, 
  findTimesByScheduleId,
  findRecordsByScheduleId,
  deleteScheduleById,
  deleteTimeByIds,
  findAllSchedules,
  updateDoneById,
  findAllAlarms,
  createRecord
} from './service/scheduleService'
import {
  loadSettings,
  saveSettings
} from './service/settingsService'
import { alarmObserver } from './alarm'

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

// @ts-ignore
ipcMain.handle('createSchedule', errorHandler(async (event, args) => {
  const { name, rTime: rTimeCode, comment, exTime: exTimeCode } = args
  const res = await createSchedule(name, rTimeCode, comment, exTimeCode)
  alarmObserver.debouncedUpdate()
  return res
}))

// @ts-ignore
ipcMain.handle('updateSchedule', errorHandler(async (event, args) => {
  const { id, name, rTime: rTimeCode, comment, exTime: exTimeCode } = args
  const res = await updateSchedule(id, name, rTimeCode, comment, exTimeCode)
  alarmObserver.debouncedUpdate()
  return res
}))

// @ts-ignore
ipcMain.handle('findEventsBetween', errorHandler(async (event, args) => {
  const { start, end } = args
  return await findEventsBetween(start, end)
}))

// @ts-ignore
ipcMain.handle('findAllTodos', errorHandler(async (event, args) => {
  return await findAllTodos()
}))

// @ts-ignore
ipcMain.handle('findScheduleById', errorHandler(async (event, args) => {
  const { id } = args
  return await findScheduleById(id)
}))

// @ts-ignore
ipcMain.handle('findTimesByScheduleId', errorHandler(async (event, args) => {
  const { scheduleId } = args
  return await findTimesByScheduleId(scheduleId)
}))

// @ts-ignore
ipcMain.handle('findRecordsByScheduleId', errorHandler(async (event, args) => {
  const { scheduleId } = args
  return await findRecordsByScheduleId(scheduleId)
}))

// @ts-ignore
ipcMain.handle('deleteScheduleById', errorHandler(async (event, args) => {
  const { id } = args
  const res = await deleteScheduleById(id)
  alarmObserver.debouncedUpdate()
  return res
}))

// @ts-ignore
ipcMain.handle('deleteTimeByIds', errorHandler(async (event, args) => {
  const { ids } = args
  const res = await deleteTimeByIds(ids)
  alarmObserver.debouncedUpdate()
  return res
}))

// @ts-ignore
ipcMain.handle('loadSettings', errorHandler(async (event, args) => {
  return await loadSettings()
}))

// @ts-ignore
ipcMain.handle('saveSettings', errorHandler(async (event, args) => {
  const { settings } = args
  return await saveSettings(settings)
}))

// @ts-ignore
ipcMain.handle('findAllSchedules', errorHandler(async (event, args) => {
  const { search, page, pageSize } = args
  return await findAllSchedules(search, page, pageSize)
}))

// @ts-ignore
ipcMain.handle('updateDoneById', errorHandler(async (event, args) => {
  const { id, done } = args
  const res = await updateDoneById(id, done)
  alarmObserver.debouncedUpdate()
  return res
}))

// @ts-ignore
// ipcMain.handle('findAllAlarms', errorHandler(async (event, args) => {
//   const { scheduleType } = args
//   return await findAllAlarms(scheduleType)
// }))

// @ts-ignore
ipcMain.handle('createRecord', errorHandler(async (event, args) => {
  const { scheduleId, startTime, endTime } = args
  return await createRecord(scheduleId, startTime, endTime)
}))

// 提醒设置被更改
// @ts-ignore
ipcMain.on('alarmUpdate', (event, args) => {
  alarmObserver.debouncedUpdate()  
})
