import { AuthResponse } from '../types/responses/AuthResponse'

export default function authHeader() {
  const user = localStorage.getItem('user')
  const data: AuthResponse = user && JSON.parse(user)

  if (data && data.access_token) {
    return { Authorization: 'Bearer ' + data.access_token }
  } else {
    return {}
  }
}
