import React from 'react'

import Button from '@components/Button/Button'
import Text from '@components/Text/Text'

interface SurveyTaskProps {
  isCompleted: boolean
  title?: string
  onClick: () => void
}

export const SurveyTask: React.FC<SurveyTaskProps> = ({
  isCompleted,
  onClick,
}) => {
  return (
    <div className='flex w-full flex-col items-center justify-center p-5 md:flex-row md:px-4 md:py-0'>
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
          className='h-[52px] px-6 text-[16px] font-[600] w-[190px]'
          onClick={onClick}
        >
          Get Started
        </Button>
      )}
    </div>
  )
}

export default SurveyTask
