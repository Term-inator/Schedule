import { BrowserWindow } from 'electron'
import { WebSocket as _WebSocket } from 'ws'

// 创建 WebSocket 连接
const ws = new _WebSocket('ws://127.0.0.1:8000/ws/')

ws.on('open', function open() {
  console.log('Connected to the WebSocket server')
})

ws.on('message', function incoming(data) {
  const message = JSON.parse(data.toString())['message']
  console.log('Received:', message)
  const mainWindow = BrowserWindow.getAllWindows()[0]  // 获取主窗口，只创建了一个窗口，所以索引为 0
  console.log(typeof message)
  if (message['api'] === 'login') {
    console.log('send login message to renderer')
    mainWindow.webContents.send('loginReply', message['data'])
  }
})

// 处理 WebSocket 错误
ws.on('error', function error(err) {
  console.error('WebSocket error:', err)
})

export function openWebSocket() {
  if (ws) {
    ws.open()
  }
}

export function sendWebSocketMessage(data) {
  if (ws) {
    ws.send(JSON.stringify({ message: data }))
  }
}

export function closeWebSocket() {
    if (ws) {
        ws.close()
    }
}