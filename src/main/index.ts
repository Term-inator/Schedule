import { app, shell, BrowserWindow, globalShortcut, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
  deleteTimeById,
  findAllSchedules,
  updateDoneById
} from './service/scheduleService'
import {
  loadSettings,
  saveSettings
} from './service/settingsService'

// @ts-ignore
ipcMain.handle('createSchedule', async (event, args) => {
  const { name, rTime: rTimeCode, comment, action: actionCode, exTime: exTimeCode } = args
  return await createSchedule(name, rTimeCode, comment, actionCode, exTimeCode)
})

// @ts-ignore
ipcMain.handle('updateSchedule', async (event, args) => {
  const { id, name, rTime: rTimeCode, comment, action: actionCode, exTime: exTimeCode } = args
  return await updateSchedule(id, name, rTimeCode, comment, actionCode, exTimeCode)
})

// @ts-ignore
ipcMain.handle('findEventsBetween', async (event, args) => {
  const { start, end } = args
  return await findEventsBetween(start, end)
})

// @ts-ignore
ipcMain.handle('findAllTodos', async (event, args) => {
  return await findAllTodos()
})

// @ts-ignore
ipcMain.handle('findScheduleById', async (event, args) => {
  const { id } = args
  return await findScheduleById(id)
})

// @ts-ignore
ipcMain.handle('findTimesByScheduleId', async (event, args) => {
  const { scheduleId } = args
  return await findTimesByScheduleId(scheduleId)
})

// @ts-ignore
ipcMain.handle('findRecordsByScheduleId', async (event, args) => {
  const { scheduleId } = args
  return await findRecordsByScheduleId(scheduleId)
})

// @ts-ignore
ipcMain.handle('deleteScheduleById', async (event, args) => {
  const { id } = args
  return await deleteScheduleById(id)
})

// @ts-ignore
ipcMain.handle('deleteTimeById', async (event, args) => {
  const { id } = args
  return await deleteTimeById(id)
})

// @ts-ignore
ipcMain.handle('loadSettings', async (event, args) => {
  return await loadSettings()
})

// @ts-ignore
ipcMain.handle('saveSettings', async (event, args) => {
  const { settings } = args
  return await saveSettings(settings)
})

// @ts-ignore
ipcMain.handle('findAllSchedules', async (event, args) => {
  const { search, page, pageSize } = args
  return await findAllSchedules(search, page, pageSize)
})

// @ts-ignore
ipcMain.handle('updateDoneById', async (event, args) => {
  const { id, done } = args
  return await updateDoneById(id, done)
})
