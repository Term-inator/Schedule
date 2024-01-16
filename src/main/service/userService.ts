import { shell } from 'electron'


export async function login(uid) {
  return shell.openExternal(`http://127.0.0.1:8000/user/googleLogin?uid=${uid}`)
}

