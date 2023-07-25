import { Component, h } from 'vue'
import { NIcon } from 'naive-ui'
import { NotificationApiInjection } from 'naive-ui/es/notification/src/NotificationProvider'

export function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

export function useDebounce (fn: Function, delay: number) {
  /**
   * @param fn 需要防抖的函数
   * @param delay 防抖时间
   * @param immediate 是否立即执行(第一次触发时)
   * @returns {Function}
   * @description 防抖函数
   * @example
   * const fn = () => console.log('fn')
   * const debouncedFn = useDebounce(fn, 1000)
   * window.addEventListener('scroll', debouncedFn)
   * // scroll事件的回调函数将会在停止滚动1000ms后执行
   */
  let timer: NodeJS.Timeout | null = null
  return (...args: any[]) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

export async function ipcHandler (
  {
    data, 
    notification, 
  } : {
    data: { success: boolean, error?: string, data?: any },
    notification?: {
      composable: NotificationApiInjection,
      successNotification: boolean,
      failureNotification: boolean
    },
  }
  ) {
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