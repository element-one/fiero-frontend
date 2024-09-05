import React from 'react'

import Button from '@components/Button/Button'
import Text from '@components/Text/Text'

interface ReadingTaskProps {
  isCompleted: boolean
  title?: string
  onClick: () => void
}

export const ReadingTask: React.FC<ReadingTaskProps> = ({
  isCompleted,
  title,
  onClick,
}) => {
  return (
    <div className='flex w-full flex-col items-center justify-between rounded-[10px] border border-white border-opacity-20 bg-dark-secondary p-5 md:flex-row md:px-4 md:py-0'>
      <div className='flex flex-col items-center py-3 md:flex-row md:justify-between'>
        <div className='rounded-full bg-dark-tertiary p-4'>
          <img
            src={'/img/clipboard.png'}
            className='h-6 w-6 object-fill'
            alt='survey'
          />
        </div>
        <div className='w-8/10 mt-3 md:my-auto md:ml-4'>
          <Text
            variant='h3'
            className='line-clamp-2 flex-grow text-center font-semibold text-neutral-300'
          >
            {title}
          </Text>
        </div>
      </div>
      {isCompleted && (
        <div className='flex min-w-[120px] flex-row items-center rounded-[8px] bg-secondary-300 bg-opacity-50 px-4 py-[10px]'>
          <Text variant='b2' className='text-secondary-200'>
            Completed
          </Text>
          <img
            src={'/img/done.svg'}
            className='ml-2 h-5 w-5 rounded-full object-fill'
            alt='checkbox'
          />
        </div>
      )}
      {!isCompleted && (
        <Button
          className='my-3 w-5/6 rounded-[8px] md:w-[120px]'
          onClick={onClick}
        >
          <Text variant='b1' className='font-semibold text-text-icon'>
            Get Started
          </Text>
        </Button>
      )}
    </div>
  )
}

export default ReadingTask
