import { IUser } from '../entities/IUser'

export interface AuthResponse {
  access_token: string
  refresh_token: string
  user: IUser
}
