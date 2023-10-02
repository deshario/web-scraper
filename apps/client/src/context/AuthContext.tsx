import { useState, useEffect, createContext, ReactNode } from 'react'
import apiService from '@api/service'
import { IUser } from '@interfaces/user'
import { ILoginForm, IRegisterForm } from '@interfaces/form'
import { userKey, accessTokenKey, refreshTokenKey } from '@constants/index'
import { useNotification } from '@hooks/useNotification'

interface IAuthContextType {
  authenticated: boolean
  user: IUser | null
  register: (formData: IRegisterForm) => void
  authenticate: (formData: ILoginForm) => void
  deAuthenticate: () => void
}

export const AuthContext = createContext<IAuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<IUser | null>(null)
  const [authenticated, setAuthenticated] = useState(false)
  const { pushNotification } = useNotification()

  useEffect(() => {
    const storedUser = localStorage.getItem(userKey)
    const storedAccessToken = localStorage.getItem(accessTokenKey)

    if (storedUser && storedAccessToken) {
      setAuthenticated(true)
      setUser(JSON.parse(storedUser))
    }

    setLoading(false)
  }, [])

  const authenticate = async (formData: ILoginForm) => {
    const result = await apiService.login(formData)
    if ('error' in result) {
      pushNotification({
        message: result.error!,
        type: 'danger',
      })
    } else {
      setAuthenticated(true)
      setUser(result.user)
      pushNotification({
        message: `Welcome ${result.user.username}`,
        type: 'success',
      })
      localStorage.setItem(userKey, JSON.stringify(result.user))
      localStorage.setItem(accessTokenKey, result.accessToken)
      localStorage.setItem(refreshTokenKey, result.refreshToken)
    }
  }

  const register = async (formData: IRegisterForm) => {
    const result = await apiService.register(formData)
    const message = result.error || 'Register Success'
    const messageType = result.error ? 'danger' : 'success'
    pushNotification({
      message,
      type: messageType,
    })
  }

  const deAuthenticate = () => {
    setAuthenticated(false)
    setUser(null)
    localStorage.removeItem(userKey)
    localStorage.removeItem(accessTokenKey)
    localStorage.removeItem(refreshTokenKey)
  }

  if (loading) return null

  return (
    <AuthContext.Provider value={{ authenticated, authenticate, deAuthenticate, user, register }}>
      {children}
    </AuthContext.Provider>
  )
}
