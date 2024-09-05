import React from 'react'

export const BrandSkeletonCard = ({ ...props }) => {
  return (
    <div {...props}>
      <div className='flex h-[172px] w-[108px] animate-pulse flex-col items-center space-y-2 md:h-[284px] md:w-[180px]'>
        <div className='h-[145px] w-[108px] rounded-xl bg-gray-400 opacity-50 md:h-[241px] md:w-[180px]'></div>
        <div className='flex flex-col space-y-3'>
          <div className='mt-4 h-6 w-16 rounded-md bg-gray-400 md:w-36'></div>
        </div>
      </div>
    </div>
  )
}

export default BrandSkeletonCard
