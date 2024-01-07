
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
  return async (...args: any[]) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(async () => {
      await fn(...args)
    }, delay)
  }
}