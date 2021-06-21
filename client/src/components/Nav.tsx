import React from 'react'
import { NavLink } from 'react-router-dom'
import { Routes } from '../routes'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'

export const Nav = () => {
  const { isAuth } = useTypedSelector((state) => state.auth)
  const { logout } = useActions()

  const authNav = (
    <>
      <NavLink className="nav-link-sc" to={Routes.PROTECTED}>
        Protected
      </NavLink>
      <button className="nav-link-sc" onClick={logout}>
        Logout
      </button>
    </>
  )

  const publicNav = (
    <>
      <NavLink className="nav-link-sc" to={Routes.LOGIN}>
        Login
      </NavLink>
      <NavLink className="nav-link-sc" to={Routes.SIGNUP}>
        Signup
      </NavLink>
    </>
  )

  return (
    <div className="flex">
      <NavLink className="nav-link-sc" to={Routes.HOME}>
        Home
      </NavLink>
      {isAuth ? authNav : publicNav}
    </div>
  )
}
