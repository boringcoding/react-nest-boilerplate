import React, { ComponentType, FC } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Routes } from '../routes'

type ProtectedRouteProps = {
  exact?: boolean
  path: string
  component: ComponentType
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ exact = false, path, component }) => {
  const { isAuth } = useTypedSelector((state) => state.auth)

  if (!isAuth) {
    return <Redirect to={Routes.LOGIN} />
  }

  return <Route exact={exact} path={path} component={component} />
}
