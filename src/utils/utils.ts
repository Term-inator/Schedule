export function intersection(a: Object[], b: Object[], equal: (a: any, b: any) => boolean): Object[] {
  /**
   * @param a 数组a
   * @param b 数组b
   * @param equal 判断两个元素是否相等的函数
   * @returns {Object[]}
   * @description 求两个数组的交集
   * @example
   * const a = [{x: 1}, {x: 2}]
   * const b = [{x: 1}, {x: 3}]
   * intersection(a, b, (a, b) => a.x === b.x) // [{x: 1}]
   */
  return [...a].filter(x => b.some(y => equal(x, y)))
}

export function difference(a: Object[], b: Object[], equal: (a: any, b: any) => boolean) {
  /**
   * @param a 数组a
   * @param b 数组b
   * @param equal 判断两个元素是否相等的函数
   * @returns {Object[]}
   * @description 求两个数组的差集
   * @example
   * const a = [{x: 1}, {x: 2}]
   * const b = [{x: 1}, {x: 3}]
   * difference(a, b, (a, b) => a.x === b.x) // [{x: 2}]
   * difference(b, a, (a, b) => a.x === b.x) // [{x: 3}]
   * difference(a, a, (a, b) => a.x === b.x) // []
   * difference(a, [], (a, b) => a.x === b.x) // [{x: 1}, {x: 2}]
   * difference([], a, (a, b) => a.x === b.x) // []
   */
  return [...a].filter(x => !b.some(y => equal(x, y)))
}

export function union(a: Object[], b: Object[], equal: (a: any, b: any) => boolean) {
  /**
   * @param a 数组a
   * @param b 数组b
   * @param equal 判断两个元素是否相等的函数
   * @returns {Object[]}
   * @description 求两个数组的并集
   * @example
   * const a = [{x: 1}, {x: 2}]
   * const b = [{x: 1}, {x: 3}]
   * union(a, b, (a, b) => a.x === b.x) // [{x: 1}, {x: 2}, {x: 3}]
   */
  return [...a, ...difference(b, a, equal)]
}


export function flatten(obj: any, prefix = '') {
  /**
   * @deprecated
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
   * @deprecated
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
