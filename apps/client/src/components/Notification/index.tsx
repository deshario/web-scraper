import Alert from 'react-bootstrap/Alert'
import styles from './index.module.scss'
import { useNotification } from '@hooks/useNotification'

const Notification = () => {
  const { notifications } = useNotification()

  return (
    <div className={styles.notification}>
      {notifications.map((notification) => (
        <Alert key={notification.id} variant={notification.type}>
          {notification.message}
        </Alert>
      ))}
    </div>
  )
}

export default Notification
