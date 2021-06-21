import { AuthAction, AuthActionTypes, AuthState } from '../../types/store/auth'

const initialState: AuthState = {
  user: null,
  isAuth: false,
  loading: true,
  error: null,
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionTypes.REQUEST_ACCESS_TOKEN: {
      return { ...state, error: null, loading: true }
    }
    case AuthActionTypes.REQUEST_ACCESS_TOKEN_SUCCESS: {
      return { ...state, error: null, loading: false, isAuth: true, user: action.payload.user }
    }
    case AuthActionTypes.REQUEST_ACCESS_TOKEN_ERROR: {
      return { ...state, error: action.payload, loading: false }
    }
    case AuthActionTypes.LOGOUT: {
      return { ...state, user: null, isAuth: false, loading: false, error: null }
    }
    default: {
      return state
    }
  }
}
