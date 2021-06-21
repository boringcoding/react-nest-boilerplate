import React, { FC } from 'react'
import { Nav } from './Nav'

export const Layout: FC = ({ children }) => {
  return (
    <div className="container mx-auto">
      <Nav />
      <div>{children}</div>
    </div>
  )
}
