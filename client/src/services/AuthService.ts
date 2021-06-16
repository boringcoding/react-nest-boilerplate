import { api } from '../http'
import { AxiosPromise } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'

export class AuthService {
  static async login(email: string, password: string): Promise<AxiosPromise<AuthResponse>> {
    return api.post(`/auth/login`, { email, password })
  }

  static async registration(email: string, password: string): Promise<AxiosPromise<AuthResponse>> {
    return api.post(`/auth/registration`, { email, password })
  }

  static async logout(): Promise<void> {
    return api.post(`/auth/logout`)
  }
}
