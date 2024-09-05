import React from 'react'

export const ProfileSkeleton = ({ ...props }) => {
  return (
    <div {...props}>
      <div className='flex flex-col items-center justify-center py-5'>
        <div className='h-[165px] w-[165px] rounded-full bg-gray-400 opacity-50'></div>
        <div className='flex flex-col space-y-3'>
          <div className='mt-4 h-6 w-10 rounded-md bg-gray-400 md:w-36'></div>
          <div className='mt-4 h-6 w-10 rounded-md bg-gray-400 md:w-36'></div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSkeleton
