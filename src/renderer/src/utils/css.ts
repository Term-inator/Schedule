export function toPx(s: string): number {
  if (s === '') {
    return 0
  }
  if (typeof s === 'number') {
    return s
  }
  if (s.endsWith('px')) {
    return parseFloat(s)
  }
  if (s.endsWith('vh')) {
    return (parseFloat(s) * window.innerHeight) / 100
  }
  throw new Error(`Invalid css value: ${s}`)
}
