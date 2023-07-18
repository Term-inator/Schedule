export function intersection(a: Object[], b: Object[], equal: (a: Object, b: Object) => boolean) {
  return [...a].filter(x => b.some(y => equal(x, y)))
}

export function difference(a: Object[], b: Object[], equal: (a: Object, b: Object) => boolean) {
  return [...a].filter(x => !b.some(y => equal(x, y)))
}