export function string2IntArray(str: string) {
  return str.split(',').map((item) => parseInt(item))
}
