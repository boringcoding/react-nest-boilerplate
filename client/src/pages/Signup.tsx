import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Routes } from '../routes'

export const Signup = () => {
  const { isAuth } = useTypedSelector((state) => state.auth)
  const { signup } = useActions()
  const history = useHistory()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm()

  useEffect(() => {
    if (isAuth) {
      history.push(Routes.HOME)
    }
  }, [isAuth, history])

  return (
    <Layout>
      <form onSubmit={handleSubmit(signup)} className="max-w-sm mx-auto">
        <h2 className="text-center uppercase mb-2">Signup</h2>
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
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters',
              },
            })}
          />
          {errors && errors.password && <span className="error-sc">{errors.password.message}</span>}
        </div>
        <div className="mb-2">
          <label htmlFor="repeatPassword" className="label-sc">
            Repeat Password
          </label>
          <input
            type="password"
            id="repeatPassword"
            className="input-sc"
            {...register('repeatPassword', {
              required: { value: true, message: 'Field is required' },
              validate: (value) => value === getValues('password') || 'The passwords do not match',
            })}
          />
          {errors && errors.repeatPassword && (
            <span className="error-sc">{errors.repeatPassword.message}</span>
          )}
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </Layout>
  )
}
