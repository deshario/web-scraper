import axiosInstance from '@lib/axios'
import { isAxiosError } from 'axios'
import { IUser } from '@interfaces/user'
import { ILoginForm, IRegisterForm } from '@interfaces/form'
import { TKeywordResponse } from '@interfaces/keyword'

interface ILoginResponse {
  success: boolean
  accessToken: string
  refreshToken: string
  user: IUser
}

interface IRegisterResponse {
  success: boolean
  error?: string
}

const login = async (formData: ILoginForm) => {
  try {
    const response = await axiosInstance.post('/auth/local', formData)
    return response.data as ILoginResponse
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 400) {
      const payload = error.response.data
      return { error: payload.error as string }
    } else {
      return { error: 'Something went wrong' }
    }
  }
}

const register = async (formData: IRegisterForm) => {
  const response = await axiosInstance.post('/auth/local/register', formData)
  return response.data as IRegisterResponse
}

const getKeywords = async () => {
  try {
    const response = await axiosInstance.get('/api/keywords')
    const data = response.data as TKeywordResponse
    if (data.success) return data.keywords
    return []
  } catch (err) {
    return []
  }
}

const apiService = { login, register, getKeywords }

export default apiService
