import { useContext } from 'react'
import { NotificationContext } from '@context/NotificationContext'

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within an NotificationProvider')
  }
  return context
}
