import React from 'react'

export const Loading = () => {
  return (
    <div className="fixed w-full h-full bg-indigo-300 flex items-center justify-center">
      <span className="text-2xl text-white animate-pulse uppercase">Loading</span>
    </div>
  )
}
