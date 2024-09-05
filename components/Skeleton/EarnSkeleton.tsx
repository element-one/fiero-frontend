import React from 'react'

export const EarnSkeletonCard = ({ ...props }) => {
  return (
    <div {...props}>
      <div className='relative flex h-[284px] w-full animate-pulse flex-col items-start space-y-2 md:max-w-[284px]'>
        <div className='absolute left-0 top-0 h-[284px] w-full rounded-xl bg-gray-400 opacity-50 md:max-w-[284px]'></div>
        <div className='flex h-full w-full flex-col justify-between'>
          <div className='ml-4 mt-4 h-6 w-36 rounded-md bg-gray-400'></div>
          <div className='mb-4 flex w-full flex-row justify-between'>
            <div className='ml-4 h-6 w-36 rounded-md bg-gray-400'></div>
            <div className='mr-4 h-6 w-12 rounded-md bg-gray-400'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EarnSkeletonCard
