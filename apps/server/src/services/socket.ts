import { Server } from 'socket.io'
import * as http from 'http'
import { TKeywordResult } from '../interfaces'

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

export const syncKeyword = (username: string, payload: TKeywordResult) => {
  io.to(username).emit('keyword', JSON.stringify(payload))
}
