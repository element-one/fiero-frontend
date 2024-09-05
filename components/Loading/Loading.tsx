import React from 'react'

interface LoadingProps {} // eslint-disable-line

const Loading: React.FC<LoadingProps> = ({}) => {
  return (
    <div className='h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600' />
  )
}

export default Loading
