import { useState, createContext, ReactNode } from 'react'

interface INotification {
  id?: number
  message: string
  type: 'success' | 'danger' | 'warning'
}

interface INotificationContextType {
  notifications: INotification[]
  pushNotification: (notification: INotification) => void
}

export const NotificationContext = createContext<INotificationContextType | undefined>(undefined)

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<INotification[]>([])

  const removeNotification = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id),
    )
  }

  const pushNotification = (payload: INotification) => {
    const { message, type } = payload
    const notification = { message, type, id: Date.now() }
    setNotifications([notification, ...notifications])

    setTimeout(() => {
      removeNotification(notification.id)
    }, 3000)
  }

  return (
    <NotificationContext.Provider value={{ notifications, pushNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
