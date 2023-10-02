import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from '@context/AuthContext'
import 'bootstrap/scss/bootstrap.scss'
import { NotificationProvider } from '@context/NotificationContext.tsx'

const node = document.getElementById('root')

const root = ReactDOM.createRoot(node!)

root.render(
  <NotificationProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </NotificationProvider>,
)
