import Cookies from 'js-cookie'

const TokenKey = 'schedule_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  console.log('auth: ' + token)
  return Cookies.set(TokenKey, token, { expires: 7 })  // 7 days
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}