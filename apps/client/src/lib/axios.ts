import { baseURL, accessTokenKey, refreshTokenKey } from '@constants/index'
import axios from 'axios'

const axiosInstance = axios.create({ baseURL })

const getTokens = () => {
  const accessToken = localStorage.getItem(accessTokenKey)
  const refreshToken = localStorage.getItem(refreshTokenKey)
  return { accessToken, refreshToken }
}

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = getTokens()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const { refreshToken } = getTokens()
        const response = await axiosInstance.post('/auth/token/refresh', { refreshToken })
        const { accessToken } = response.data

        localStorage.setItem(accessTokenKey, accessToken)

        originalRequest.headers.Authorization = `Bearer ${accessToken}`

        return axios(originalRequest)
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
      }
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
