import React from 'react'

export const EventSkeleton = ({ ...props }) => {
  return (
    <div {...props}>
      <div className='z-10 flex w-full flex-col px-8 py-5 md:px-10'>
        <div className='flex w-full flex-col space-y-3'>
          <div className='mt-4 h-6 w-3/4 rounded-md bg-gray-400 md:w-2/5'></div>
          <div className='mt-4 h-6 w-3/4 rounded-md bg-gray-400 md:w-2/5'></div>
          <div className='mt-4 h-6 w-3/5 rounded-md bg-gray-400 md:w-36'></div>
        </div>
        <div className='mt-4 h-6 w-1/2 rounded-md bg-gray-400 md:w-36'></div>
        <div className='mt-10 h-6 w-4/5 rounded-md bg-gray-400 md:w-36'></div>
      </div>
    </div>
  )
}

export default EventSkeleton
