import { shell } from 'electron'

export async function login(uid) {
  return shell.openExternal(`${process.env.VITE_BACKEND_URL}/user/googleLogin?uid=${uid}`)
}
