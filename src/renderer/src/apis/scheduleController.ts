import axios from "@renderer/utils/axios"
import { NotificationApiInjection } from 'naive-ui/es/notification/src/NotificationProvider'
import { useUserStore } from "@renderer/store"
import { DateTime } from "luxon"

async function localApi(apiName: string, data): Promise<{ success: boolean, error?: string, data?: any }> {
  console.log('local api: ' + apiName)
  try {
    // @ts-ignore
    return window.api[apiName](data)
  }
  catch (error: any) {
    console.error(error)
    console.error(apiName, data)
    return { success: false, error }
  }
}

async function remoteApi(group: string, apiName: string, data): Promise<{ success: boolean, error?: string, data?: any }> {
  return axios({
    url: `${group}/${apiName}/`,
    method: 'post',
    data: data,
  })
}

const localOnly: string[] = ['alarmUpdate', 'saveSettings', 'loadSettings', 'login', 'openWebSocket', 'closeWebSocket']
const remoteOnly: string[] = ['getProfile', 'logout']
const apiExcluded: string[] = ['getUnSyncedData', 'sync']

export async function apiHandler (
  {
    group,
    name,
    params, 
    notification, 
  } : {
    group?: string,
    name: string,
    params: any,
    notification?: {
      composable: NotificationApiInjection,
      successNotification: boolean,
      failureNotification: boolean
    },
  }
  ) {
  let data: { success: boolean, error?: string, data?: any }
  if (apiExcluded.includes(name)) {
    throw new Error(`api ${name} is excluded, do not use apiHandler`)
  }
  if ((!useUserStore().isLogin || localOnly.includes(name)) && !remoteOnly.includes(name)) {
    data = await localApi(name, params)
  } else {
    if (!group) {
      throw new Error('group is required when settings is remote')
    }
    data = await remoteApi(group, name, params)
  }
  console.log(data)
  if (data.success) {
    if (notification && notification.successNotification) {
      notification.composable.success({
        title: 'Success',
        duration: 3000,
      })
    }
    return data.data
  } else {
    const { error } = data
    if (notification && notification.failureNotification) {
      notification.composable.error({
        title: 'Error',
        content: error!.toString(), // error 一定不是 undefined
        // duration: 3000,
      })
    }
    return {}
  }
}

async function upload(lastSyncAt: string) {
  // 获取本地未同步数据并上传
  const syncAt = DateTime.now().setZone('UTC').toISO()! // 一定合法，所以不会是 null
  const localUnSyncedData = await localApi('getUnSynced', { lastSyncAt })
  const updated = await remoteApi('schedule', 'sync', { ...localUnSyncedData.data, syncAt })
  if (updated.success) {
    await localApi('updateSyncedVersion', updated.data)
  }
}

export async function download(lastSyncAt: string) {
  // 获取远程未同步数据并下载
  // 只在 logout 时调用
  const remoteUnSyncedData = await remoteApi('schedule', 'getUnSynced', { lastSyncAt })
  await localApi('sync', remoteUnSyncedData.data)
}

export async function sync(lastSyncAt: string) {
  await upload(lastSyncAt)
  await download(lastSyncAt)
}
