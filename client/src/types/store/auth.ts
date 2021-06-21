import { IUser } from '../entities/IUser'
import { IApiError } from '../entities/IApiError'

export interface AuthState {
  isAuth: boolean
  loading: boolean
  error: IApiError | null
  user: IUser | null
}

export enum AuthActionTypes {
  REQUEST_ACCESS_TOKEN = 'REQUEST_ACCESS_TOKEN',
  REQUEST_ACCESS_TOKEN_SUCCESS = 'REQUEST_ACCESS_TOKEN_SUCCESS',
  REQUEST_ACCESS_TOKEN_ERROR = 'REQUEST_ACCESS_TOKEN_ERROR',
  REQUEST_REFRESH_TOKEN = 'REQUEST_REFRESH_TOKEN',
  REQUEST_REFRESH_TOKEN_SUCCESS = 'REQUEST_REFRESH_TOKEN_SUCCESS',
  REQUEST_REFRESH_TOKEN_ERROR = 'REQUEST_REFRESH_TOKEN_ERROR',
  LOGOUT = 'LOGOUT',
}

interface RequestAccessTokenAction {
  type: AuthActionTypes.REQUEST_ACCESS_TOKEN
}

interface RequestAccessTokenSuccessAction {
  type: AuthActionTypes.REQUEST_ACCESS_TOKEN_SUCCESS
  payload: {
    user: IUser
  }
}

interface RequestAccessTokenErrorAction {
  type: AuthActionTypes.REQUEST_ACCESS_TOKEN_ERROR
  payload: IApiError | null
}

interface RequestRefreshTokenAction {
  type: AuthActionTypes.REQUEST_REFRESH_TOKEN
}

interface RequestRefreshTokenSuccessAction {
  type: AuthActionTypes.REQUEST_REFRESH_TOKEN_SUCCESS
  payload: {
    user: IUser
  }
}

interface RequestRefreshTokenErrorAction {
  type: AuthActionTypes.REQUEST_REFRESH_TOKEN_ERROR
  payload: string
}

interface LogoutAction {
  type: AuthActionTypes.LOGOUT
}

export type AuthAction =
  | RequestAccessTokenAction
  | RequestAccessTokenSuccessAction
  | RequestAccessTokenErrorAction
  | RequestRefreshTokenAction
  | RequestRefreshTokenSuccessAction
  | RequestRefreshTokenErrorAction
  | LogoutAction
