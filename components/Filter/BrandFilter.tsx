import React, { useState } from 'react'
import clsx from 'clsx'

import { AnnotationCheckIcon, ThumbUpIcon } from '@components/Icons'
import { Text } from '@components/Text'
import { EarnType } from '@type/common'

interface BrandFilterProps {
  number: number
  onSelect: (type: EarnType) => void
}

export const BrandFilter: React.FC<BrandFilterProps> = ({
  number,
  onSelect,
  ...props
}) => {
  const [selected, setSelected] = useState('all')

  const isSelected = (type: EarnType) => {
    return type === selected
  }

  const handleSelect = (type: EarnType) => {
    setSelected(type)
    onSelect(type)
  }

  return (
    <div
      className={clsx(
        'flex h-[60px] w-full flex-row items-center justify-start space-x-3 px-4 md:space-x-8 md:px-8'
      )}
      {...props}
    >
      <div className='flex flex-row items-center justify-center space-x-2'>
        <Text variant='h3' className='hidden md:flex'>
          All earning opportunities
        </Text>
        <Text variant='b1' className='flex md:hidden'>
          All earning opportunities
        </Text>
        <Text variant='h3' className='text-text-disabled'>{`(${number})`}</Text>
      </div>
      <button
        onClick={() => handleSelect('all')}
        className={clsx(
          'flex flex-row items-center space-x-2 rounded-full  px-4 py-1',
          isSelected('all')
            ? 'bg-neutral-600 text-primary-400'
            : 'bg-neutral-700 text-text-disabled'
        )}
      >
        <Text
          variant='b1'
          className={clsx(
            isSelected('all') ? 'text-primary-400' : 'text-text-disabled'
          )}
        >
          All
        </Text>
      </button>
      <button
        onClick={() => handleSelect('social')}
        className={clsx(
          'flex flex-row items-center space-x-2 rounded-full px-4 py-1',
          isSelected('social')
            ? 'bg-neutral-600 text-primary-400'
            : 'bg-neutral-700 text-text-disabled'
        )}
      >
        <ThumbUpIcon />
        <Text
          variant='b1'
          className={clsx(
            isSelected('social') ? 'text-primary-400' : 'text-text-disabled'
          )}
        >
          Social
        </Text>
      </button>
      <button
        onClick={() => handleSelect('survey')}
        className={clsx(
          'flex flex-row items-center space-x-2 rounded-full px-4 py-1',
          isSelected('survey')
            ? 'bg-neutral-600 text-primary-400'
            : 'bg-neutral-700 text-text-disabled'
        )}
      >
        <AnnotationCheckIcon />
        <Text
          variant='b1'
          className={clsx(
            isSelected('survey') ? 'text-primary-400' : 'text-text-disabled'
          )}
        >
          Voting
        </Text>
      </button>
    </div>
  )
}

export default BrandFilter
