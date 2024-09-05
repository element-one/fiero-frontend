import { FC } from 'react'
import clsx from 'clsx'

import { CoinIcon } from '@components/Icons/CoinIcon'

export interface ClaimBadgeAndTokenProps {
  className?: string
}

const ClaimBadgeAndToken: FC<ClaimBadgeAndTokenProps> = ({ className }) => {
  const handleClick = () => {
    console.log('click')
  }

  return (
    <div
      className={clsx(
        'flex w-full flex-row items-center justify-between rounded-[10px] border border-white border-opacity-20 bg-dark-secondary px-1 py-0 sm:px-4',
        className
      )}
    >
      <div className='flex flex-row items-center justify-between py-2 sm:py-0'>
        <div className='opacity-20'>
          <CoinIcon width={40} height={40} />
        </div>
        <div className='w-8/10 ml-1 sm:ml-4'>
          <span className='font-b4 font-medium text-text-disabled'>
            Claim Badge & Tickets
          </span>
        </div>
      </div>
      <button
        className='my-3 flex w-fit items-center justify-center rounded-[8px]  bg-primary-400 px-2 py-[10px] text-text-disabled sm:px-4'
        onClick={handleClick}
        disabled
      >
        Claim Now
      </button>
    </div>
  )
}

export default ClaimBadgeAndToken
