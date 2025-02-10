import { v4 } from 'uuid'

export function uuidv4(hex = false): string {
  /**
   * 生成uuid
   * @param hex 是否去掉'-'
   * @returns uuid
   */
  const uid = v4()
  return hex ? uid.replace(/-/g, '') : uid
}
