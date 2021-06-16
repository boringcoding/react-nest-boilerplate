import React, { FC, useContext, useState } from 'react'
import { Context } from '../index'

export const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { store } = useContext(Context)

  return (
    <div>
      <input
        placeholder="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => store.registration(email, password)}>register</button>
      <button onClick={() => store.login(email, password)}>login</button>
      <button onClick={() => store.logout()}>logout</button>
    </div>
  )
}
