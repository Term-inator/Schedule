// is 在某些情况 import 不了
// is.dev == isDev() || process.env.npm_command == 'start'
export function isDev() {
  return process.env.NODE_ENV && process.env.NODE_ENV === 'development'
}

export function isProd() {
  return !process.env.NODE_ENV
}

export function isTest() {
  return process.env.NODE_ENV && process.env.NODE_ENV === 'test'
}
