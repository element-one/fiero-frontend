import React from 'react'
import clsx from 'clsx'

import { Text } from '@components/Text'
import { ApiSocial } from '@type/api'

import InstagramTask from '../Instagram/InstagramTask'
import TiktokTask from '../Tiktok/TiktokTask'
import TwitterTask from '../Twitter/TwitterTask'

interface LockCardProps {
  title: string
  social: 'instagram' | 'twitter' | 'tiktok'
  className?: string
}

export const LockCard: React.FC<LockCardProps> = ({ title, social, className }) => {
  return (
    <div className={
      clsx(
        'backdrop-filter-[2px] relative mt-6 h-[400px] w-full bg-bg-white px-4',
        className
      )
    }>
      <div className='flex w-full flex-col justify-between px-4 opacity-20'>
        <div>
          <div className='mt-2'>
            <Text variant='h3' size='bold'>
              Tasks
            </Text>
          </div>
          <div className='mt-4'></div>
        </div>
        <div className='mt-4'>
          {social === 'instagram' && (
            <InstagramTask
              social={{ name: 'Instagram Task' } as ApiSocial}
              isCompleted={false}
              isPending={false}
              onComplete={() => null}
            />
          )}
          {social === 'twitter' && (
            <TwitterTask
              social={{ name: 'Twitter Task' } as ApiSocial}
              isCompleted={false}
              onComplete={() => null}
            />
          )}
          {social === 'tiktok' && (
            <TiktokTask
              social={{ name: 'Tiktok Task' } as ApiSocial}
              isCompleted={false}
              isPending={false}
              onComplete={() => null}
            />
          )}
        </div>
      </div>
      <div className='absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center backdrop-blur-[2px]'>
        <img
          src='/svg/lock.svg'
          alt='Copy Button'
          className='h-[39px] w-[34px]'
        />
        <div className='mt-6 text-center text-[17px] max-w-[90vw] md:max-w-[600px] font-semibold leading-7 text-text-black'>
          {title}
        </div>
      </div>
    </div>
  )
}

export default LockCard
