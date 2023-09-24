import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from '@context/AuthContext'
import 'bootstrap/scss/bootstrap.scss'

const node = document.getElementById('root')

const root = ReactDOM.createRoot(node!)

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
)
