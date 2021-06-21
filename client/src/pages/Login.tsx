import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Routes } from '../routes'

export const Login = () => {
  const { isAuth } = useTypedSelector((state) => state.auth)
  const { login } = useActions()
  const history = useHistory()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (isAuth) {
      history.push(Routes.HOME)
    }
  }, [isAuth, history])

  return (
    <Layout>
      <form onSubmit={handleSubmit(login)} className="max-w-sm mx-auto">
        <h2 className="text-center uppercase mb-2">Login</h2>
        <div className="mb-2">
          <label htmlFor="email" className="label-sc">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="input-sc"
            {...register('email', {
              required: { value: true, message: 'Field is required' },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Field must be an email',
              },
            })}
          />
          {errors && errors.email && <span className="error-sc">{errors.email.message}</span>}
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="label-sc">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="input-sc"
            {...register('password', {
              required: { value: true, message: 'Field is required' },
            })}
          />
          {errors && errors.password && <span className="error-sc">{errors.password.message}</span>}
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Submit
          </button>
        </div>
      </form>
    </Layout>
  )
}
