import axios from "@renderer/utils/axios"
import { NotificationApiInjection } from 'naive-ui/es/notification/src/NotificationProvider'

async function localApi(apiName: string, data): Promise<{ success: boolean, error?: string, data?: any }> {
  // @ts-ignore
  return window.api[apiName](data)
}

async function remoteApi(apiName: string, data): Promise<{ success: boolean, error?: string, data?: any }> {
  return axios.post(apiName, data)
}

const settings = 'local'
export async function apiHandler (
  {
    name,
    params, 
    notification, 
  } : {
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
  if (settings === 'local') {
    data = await localApi(name, params)
  } else {
    data = await remoteApi(name, params)
  }
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