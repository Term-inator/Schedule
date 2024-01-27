// import Cookies from 'js-cookie' // cookie 无法设置，原因未知，暂时使用 localStorage

const TokenKey = 'schedule_token'

export function getToken() {
  // return Cookies.get(TokenKey)
  return localStorage.getItem(TokenKey)
}

export async function setToken(token: string) {
  console.log('auth: ' + token)
  // return Cookies.set(TokenKey, token, { expires: 7 })  // 7 days
  localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  // return Cookies.remove(TokenKey)
  localStorage.removeItem(TokenKey)
}

const UserIdKey = 'schedule_userId'

export function getUserId() {
  // return Cookies.get(UserIdKey)
  return localStorage.getItem(UserIdKey)
}

export async function setUserId(userId: string) {
  // return Cookies.set(UserIdKey, userId, { expires: 7 })  // 7 days
  localStorage.setItem(UserIdKey, userId)
}

export function removeUserId() {
  // return Cookies.remove(UserIdKey)
  localStorage.removeItem(UserIdKey)
}
