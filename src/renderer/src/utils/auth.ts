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