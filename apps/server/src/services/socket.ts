import { Server } from 'socket.io'
import * as http from 'http'

let io: Server

export const initSocket = (server: http.Server) => {
  io = new Server(server)

  io.on('connection', (socket) => {
    const { username } = socket.handshake.query

    if (!username) {
      socket.disconnect(true)
      return
    }

    socket.join(username as string)

    socket.on('message', (message) => {
      socket.emit('message', `sending back - ${message}`)
    })
  })

  return io
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const syncKeywords = (username: string, payload: any) => {
  io.to(username).emit('keywords', JSON.stringify(payload))
}
