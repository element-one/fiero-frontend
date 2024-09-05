import React from 'react'

export const HoldingSkeleton = ({ ...props }) => {
  return (
    <div {...props}>
      <div className='flex w-full flex-col px-8'>
        <div className='flex h-16 w-full flex-row items-center justify-between'>
          <div className='h-[25px] w-[25px] rounded-full bg-gray-400 opacity-50'></div>
          <div className='h-6 w-10 rounded-md bg-gray-400 md:w-36'></div>
        </div>
        <div className='flex h-10 w-full flex-row items-center justify-between'>
          <div className='h-[25px] w-[25px] rounded-full bg-gray-400 opacity-50'></div>
          <div className='h-6 w-10 rounded-md bg-gray-400 md:w-36'></div>
        </div>
      </div>
    </div>
  )
}

export default HoldingSkeleton
