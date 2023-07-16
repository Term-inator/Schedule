import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  createSchedule: (args) => ipcRenderer.invoke('createSchedule', args),
  findEventsBetween: (args) => ipcRenderer.invoke('findEventsBetween', args),
  findAllTodos: (args) => ipcRenderer.invoke('findAllTodos', args),
  findScheduleById: (args) => ipcRenderer.invoke('findScheduleById', args),
  findTimesByScheduleId: (args) => ipcRenderer.invoke('findTimesByScheduleId', args),
  findRecordsByScheduleId: (args) => ipcRenderer.invoke('findRecordsByScheduleId', args),
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
