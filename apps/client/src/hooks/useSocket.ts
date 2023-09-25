import { useEffect } from 'react'
import io from 'socket.io-client'
import { useAuth } from './useAuth'
import { baseURL, onKeywordChange } from '@constants/index'

type TSocket = {
  patchKeywords: (rawKeyword: string) => void
}

const useSocket = ({ patchKeywords }: TSocket) => {
  const auth = useAuth()
  const connection = `${baseURL}?username=${auth.user!.username}`

  useEffect(() => {
    const socket = io(connection, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
    })

    socket.on(onKeywordChange, patchKeywords)

    return () => {
      socket.disconnect()
    }
  }, [connection, patchKeywords])
}

export default useSocket
