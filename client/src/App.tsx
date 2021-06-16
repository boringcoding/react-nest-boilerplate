import React, { useContext, useEffect } from 'react'
import { LoginForm } from './components/LoginForm'
import { Context } from './index'
import { observer } from 'mobx-react-lite'

export const App = observer(() => {
  const { store } = useContext(Context)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  if (store.isLoading) {
    return <div>loading</div>
  }
  return (
    <div>
      <h1>{store.isAuth ? 'Auth' : 'Not auth'}</h1>
      <LoginForm />
    </div>
  )
})
