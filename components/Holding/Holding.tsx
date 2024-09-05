import { type HTMLAttributes } from 'react'
import clsx from 'clsx'

import { Text } from '@components/Text/index'
import { ApiUserHolding } from '@type/api'

interface HoldingProps extends HTMLAttributes<HTMLDivElement> {
  holding: ApiUserHolding
}

export const Holding: React.FC<HoldingProps> = ({
  holding,
  className,
  ...props
}) => {
  const { brand, points } = holding

  return (
    <div
      className={clsx(
        'flex h-20 flex-row items-center justify-between rounded-md bg-neutral-700 px-4',
        className
      )}
      {...props}
    >
      <div className='flex flex-row items-center overflow-hidden rounded-xl'>
        <div className='rounded-full bg-black p-1'>
          <img
            src={brand.iconUrl || ''}
            className='h-9 w-9 rounded-full object-fill'
            alt='brand cover'
          />
        </div>

        <Text variant='b1' size='semibold' className='ml-4 text-neutral-500'>
          {brand.name}
        </Text>
      </div>
      <div className='flex flex-col'>
        <Text variant='h3' size='semibold' className='text-right text-white'>
          {points} Tickets
        </Text>
        <Text variant='b2' className='text-right text-neutral-200'>
          {brand.tokenSymbol}
        </Text>
      </div>
    </div>
  )
}

export default Holding
