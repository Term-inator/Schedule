import { Component, h } from 'vue'
import { NIcon } from 'naive-ui'

export function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

export function useDebounce (fn: Function, delay: number, immediate: boolean = false) {
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
   * @example
   * const fn = () => console.log('fn')
   * const debouncedFn = useDebounce(fn, 1000, true)
   * window.addEventListener('scroll', debouncedFn)
   * // scroll事件的回调函数将会在第一次触发时立即执行
   */
  let timer: NodeJS.Timeout | null = null
  return (...args: any[]) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}