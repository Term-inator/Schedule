import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  createSchedule: (args) => ipcRenderer.invoke('createSchedule', args),
  updateScheduleById: (args) => ipcRenderer.invoke('updateScheduleById', args),
  findEventsBetween: (args) => ipcRenderer.invoke('findEventsBetween', args),
  findAllTodos: (args) => ipcRenderer.invoke('findAllTodos', args),
  findScheduleById: (args) => ipcRenderer.invoke('findScheduleById', args),
  findTimesByScheduleId: (args) => ipcRenderer.invoke('findTimesByScheduleId', args),
  findRecordsByScheduleId: (args) => ipcRenderer.invoke('findRecordsByScheduleId', args),
  deleteScheduleById: (args) => ipcRenderer.invoke('deleteScheduleById', args),
  deleteTimeByIds: (args) => ipcRenderer.invoke('deleteTimeByIds', args),
  updateTimeCommentById: (args) => ipcRenderer.invoke('updateTimeCommentById', args),
  getTimeZones: (args) => ipcRenderer.invoke('getTimeZones', args),
  loadSettings: (args) => ipcRenderer.invoke('loadSettings', args),
  saveSettings: (args) => ipcRenderer.invoke('saveSettings', args),
  findAllSchedules: (args) => ipcRenderer.invoke('findAllSchedules', args),
  updateDoneById: (args) => ipcRenderer.invoke('updateDoneById', args),
  updateStarById: (args) => ipcRenderer.invoke('updateStarById', args),
  findAllAlarms: (args) => ipcRenderer.invoke('findAllAlarms', args),
  createRecord: (args) => ipcRenderer.invoke('createRecord', args),
  sync: (args) => ipcRenderer.invoke('sync', args),
  getUnSynced: (args) => ipcRenderer.invoke('getUnSynced', args),
  updateSyncedVersion: (args) => ipcRenderer.invoke('updateSyncedVersion', args),

  alarmUpdate: (args) => ipcRenderer.send('alarmUpdate', args),

  login: (args) => ipcRenderer.invoke('login', args),
  loginReply: (callback) => ipcRenderer.once('loginReply', (_event, args) => callback(args)),
  openWebSocket: (args) => ipcRenderer.invoke('openWebSocket', args),
  connectReply: (callback) => ipcRenderer.once('connectReply', (_event, args) => callback(args)),
  closeWebSocket: (args) => ipcRenderer.invoke('closeWebSocket', args),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
