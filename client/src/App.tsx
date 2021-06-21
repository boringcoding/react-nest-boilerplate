import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useTypedSelector } from './hooks/useTypedSelector'
import { useActions } from './hooks/useActions'
import { Routes } from './routes'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Protected } from './pages/Protected'
import { Loading } from './components/Loading'
import { NotFound } from './pages/NotFound'

export const App = () => {
  const { loading } = useTypedSelector((state) => state.auth)
  const { checkAuth } = useActions()

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <Switch>
      <Route exact path={Routes.HOME} component={Home} />
      <Route path={Routes.LOGIN} component={Login} />
      <Route path={Routes.SIGNUP} component={Signup} />
      <ProtectedRoute path={Routes.PROTECTED} component={Protected} />
      <Route component={NotFound} />
    </Switch>
  )
}
