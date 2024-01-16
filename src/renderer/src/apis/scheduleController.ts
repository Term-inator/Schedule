import axios from "@renderer/utils/axios"
import { NotificationApiInjection } from 'naive-ui/es/notification/src/NotificationProvider'
import { useUserStore } from "@renderer/store"

async function localApi(apiName: string, data): Promise<{ success: boolean, error?: string, data?: any }> {
  console.log('local api: ' + apiName)
  // @ts-ignore
  return window.api[apiName](data)
}

async function remoteApi(group: string, apiName: string, data): Promise<{ success: boolean, error?: string, data?: any }> {
  return axios({
    url: `${group}/${apiName}/`,
    method: 'post',
    data: data,
  })
}

const localOnly: string[] = ['alarmUpdate', 'saveSettings', 'loadSettings', 'login', 'logout']
const remoteOnly: string[] = ['getProfile']

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
  console.log(useUserStore().isLogin)
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