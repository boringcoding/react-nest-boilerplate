import { Dispatch } from 'redux'
import { AuthAction, AuthActionTypes } from '../../types/store/auth'
import { AuthService } from '../../services/AuthService'
import { LoginInput } from '../../types/inputs/LoginInput'

// todo: combine next two action creators
export const login = (loginInput: LoginInput) => async (dispatch: Dispatch<AuthAction>) => {
  dispatch({
    type: AuthActionTypes.REQUEST_ACCESS_TOKEN,
  })
  try {
    const response = await AuthService.login(loginInput.email, loginInput.password)
    dispatch({
      type: AuthActionTypes.REQUEST_ACCESS_TOKEN_SUCCESS,
      payload: response.data,
    })
  } catch (error) {
    dispatch({
      type: AuthActionTypes.REQUEST_ACCESS_TOKEN_ERROR,
      payload: error.response.data.message,
    })
  }
}

export const signup = (loginInput: LoginInput) => async (dispatch: Dispatch<AuthAction>) => {
  dispatch({
    type: AuthActionTypes.REQUEST_ACCESS_TOKEN,
  })
  try {
    const response = await AuthService.registration(loginInput.email, loginInput.password)
    dispatch({
      type: AuthActionTypes.REQUEST_ACCESS_TOKEN_SUCCESS,
      payload: response.data,
    })
  } catch (error) {
    dispatch({
      type: AuthActionTypes.REQUEST_ACCESS_TOKEN_ERROR,
      payload: error.response.data.message,
    })
  }
}

export const checkAuth = () => async (dispatch: Dispatch<AuthAction>) => {
  dispatch({
    type: AuthActionTypes.REQUEST_ACCESS_TOKEN,
  })
  try {
    const data = await AuthService.checkAuth()
    dispatch({
      type: AuthActionTypes.REQUEST_ACCESS_TOKEN_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: AuthActionTypes.REQUEST_ACCESS_TOKEN_ERROR,
      payload: null,
    })
  }
}

export const logout = () => async (dispatch: Dispatch<AuthAction>) => {
  try {
    await AuthService.logout()
    dispatch({
      type: AuthActionTypes.LOGOUT,
    })
  } catch (err) {}
}
