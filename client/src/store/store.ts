import { IUser } from '../models/IUser'
import { makeAutoObservable } from 'mobx'
import { AuthService } from '../services/AuthService'
import axios from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'
import { API_URL } from '../http'

export default class Store {
  user = {} as IUser
  isAuth = false
  isLoading = true

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean) {
    this.isAuth = bool
  }

  setUser(user: IUser) {
    this.user = user
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password)
      localStorage.setItem('token', response.data.access_token)
      this.setAuth(true)
    } catch (err) {
      console.log(err)
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password)
      localStorage.setItem('token', response.data.access_token)
      this.setAuth(true)
    } catch (err) {
      console.log(err)
    }
  }

  async logout() {
    try {
      await AuthService.logout()
      localStorage.removeItem('token')
      this.setAuth(false)
    } catch (err) {
      console.log(err)
    }
  }

  async checkAuth() {
    this.isLoading = true
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {
        withCredentials: true,
      })
      localStorage.setItem('token', response.data.access_token)
      this.setAuth(true)
    } catch (err) {
      console.log(err)
    } finally {
			this.isLoading = false
		}
  }
}
