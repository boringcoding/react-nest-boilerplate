import { api } from '../http'
import { AxiosPromise } from 'axios'
import { AuthResponse } from '../types/responses/AuthResponse'

export class AuthService {
  static async login(email: string, password: string): Promise<AxiosPromise<AuthResponse>> {
    const response = await api.post(`/auth/login`, { email, password })
    if (response.data.access_token) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response
  }

  static async checkAuth(): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      const userString = localStorage.getItem('user')
      const user = userString && JSON.parse(userString)
      if (user && user.access_token) {
        resolve(user)
      } else {
        reject()
      }
    })
  }

  static async registration(email: string, password: string): Promise<AxiosPromise<AuthResponse>> {
    const response = await api.post(`/auth/registration`, { email, password })
    if (response.data.access_token) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response
  }

  static async logout(): Promise<void> {
    localStorage.removeItem('user')
    return api.post(`/auth/logout`)
  }
}
