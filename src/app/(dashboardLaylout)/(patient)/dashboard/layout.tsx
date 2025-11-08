import React from 'react'

export default function layout({ children }: {
  children: React.ReactNode
}) {
  return (
    <div className='bg-gray-200 min-h-screen w-full'>{children}</div>
  )
}
