import { api } from '../http'
import { AxiosPromise } from 'axios'
import { IUser } from '../models/IUser'

export class UserService {
  static async fetchUsers(): Promise<AxiosPromise<IUser[]>> {
    return api.get(`/auth/users`)
  }
}
