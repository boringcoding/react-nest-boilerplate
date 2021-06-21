import React, { FC, useState } from 'react'
import { useActions } from '../hooks/useActions'

export const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { login } = useActions()

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
      <button onClick={() => {}}>register</button>
      <button onClick={() => login({ email, password })}>login</button>
      <button onClick={() => {}}>logout</button>
    </div>
  )
}
