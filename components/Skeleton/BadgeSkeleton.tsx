import React from 'react'

export const BadgeSkeleton = ({ ...props }) => {
  return (
    <div {...props}>
      <div className='flex flex-col items-center justify-center'>
        <div className='h-[90px] w-[90px] rounded-full bg-gray-400 opacity-50 md:h-[165px] md:w-[165px]'></div>
      </div>
    </div>
  )
}

export default BadgeSkeleton
