import { BrowserWindow } from 'electron'
import { WebSocket as _WebSocket } from 'ws'

// 创建 WebSocket 连接
let ws: _WebSocket | null = null

/**
 * api: login | connect | disconnect
 * login: 登录
 * params: { uid: string }
 * 
 * connect: 连接
 * params: { uid: string }
 */

const createWebSocket = (url, on: {
  open: () => void,
  message: (event: any) => void,
  error: (error: any) => void,
  close: () => void,
}) => {
  if (!ws || ws.readyState === _WebSocket.CLOSED) {
    ws = new _WebSocket(url)

    ws.onopen = () => {
      on.open()
    }

    ws.onmessage = (event) => {
      on.message(event)
    }

    ws.onerror = (error) => {
      on.error(error)
    }

    ws.onclose = () => {
      on.close()
      ws = null
    }
  }
  return ws
}

export async function openWebSocket(uid: string) {
  ws = createWebSocket(`${process.env.VITE_WEBSOCKET_URL}/ws/`, {
    open: () => {
      console.log('Connected to the WebSocket server')
      sendWebSocketMessage('connect', { uid })
    },
    message: (event) => {
      const message = JSON.parse(event.data.toString())['message']
      const mainWindow = BrowserWindow.getAllWindows()[0]  // 获取主窗口，只创建了一个窗口，所以索引为 0
      if (message['api'] === 'connect') {
        console.log('send connect message to renderer')
        mainWindow.webContents.send('connectReply', message['data'])
      }
      else if (message['api'] === 'login') {
        console.log('send login message to renderer')
        mainWindow.webContents.send('loginReply', message['data'])
      }
    },
    error: (error) => {
      console.error('WebSocket error:', error)
    },
    close: () => {
      console.log('WebSocket disconnected')
    },
  })
}

export async function sendWebSocketMessage(api: 'connect' | 'login', data: any) {
  if (ws && ws.readyState === _WebSocket.OPEN) {
    ws.send(JSON.stringify({ message: { api, data } }))
  }
  else {
    console.error('WebSocket is not connected')
  }
}

export async function closeWebSocket() {
  if (ws) {
    ws.close()
  }
}