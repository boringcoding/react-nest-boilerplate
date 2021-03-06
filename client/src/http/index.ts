import axios from 'axios'
import { AuthResponse } from '../types/responses/AuthResponse'
import authHeader from '../util/authHeader'

export const API_URL = 'http://localhost:5000'

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  config.headers = authHeader()
  return config
})

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {
          withCredentials: true,
        })
        localStorage.setItem('token', response.data.access_token)
        return api.request(originalRequest)
      } catch (err) {
        console.log(err, 'refresh failed')
      }
    }
    throw error
  }
)

export { api }
