export function intersection(a: Object[], b: Object[], equal: (a: any, b: any) => boolean) {
  return [...a].filter(x => b.some(y => equal(x, y)))
}

export function difference(a: Object[], b: Object[], equal: (a: any, b: any) => boolean) {
  return [...a].filter(x => !b.some(y => equal(x, y)))
}


export function flatten(obj: any, prefix = '') {
  /**
   * @param obj 需要展开的对象
   * @param prefix 展开后的key的前缀
   * @returns {Object}
   * @description 将对象展开为扁平的对象
   * @example
   * const obj = {
   *   a: {
   *     b: 1,
   *     c: 2
   *   },
   *   d: 3
   * }
   * flatten(obj) // { 'a.b': 1, 'a.c': 2, d: 3 }
   * flatten(obj, 'prefix') // { 'prefix.a.b': 1, 'prefix.a.c': 2, 'prefix.d': 3 }
   */
  const res: any = {}
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      Object.assign(res, flatten(obj[key], `${prefix}${key}.`))
    } else {
      res[`${prefix}${key}`] = obj[key]
    }
  })
  return res
}

export function unflatten(obj: any) {
  /**
   * @param obj 需要展开的对象
   * @returns {Object}
   * @description 将扁平的对象展开为对象
   * @example
   * const obj = {
   *   'a.b': 1,
   *   'a.c': 2,
   *   d: 3
   * }
   * unflatten(obj) // { a: { b: 1, c: 2 }, d: 3 }
   */
  const res: any = {}
  Object.keys(obj).forEach((path) => {
    const keyArr = path.split('.')
    let temp = res // 临时指针
    keyArr.forEach((key, index) => {
      if (index === keyArr.length - 1) {
        temp[key] = obj[path]
      } else {
        // 如果不是最后一个key，且key不存在，则赋值空对象
        temp[key] = temp[key] || {}
        temp = temp[key]
      }
    })
  })
  return res
}
