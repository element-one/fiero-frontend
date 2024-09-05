import React, { type HTMLAttributes } from 'react'
import clsx from 'clsx'

import Button from '@components/Button/Button'
import { Text } from '@components/Text'
import { ModalType, useModal } from 'contexts/modal'

interface CallActionProps extends HTMLAttributes<HTMLDivElement> {
  callAction?: string
  isEarn?: boolean
}

const CallAction: React.FC<CallActionProps> = ({
  isEarn,
  callAction,
  className,
}) => {
  const { showModal } = useModal()
  return (
    <div
      className={clsx(
        'mx-4 flex flex-col items-center justify-between rounded-xl bg-action bg-cover p-4 md:h-[75px] md:flex-row',
        className
      )}
    >
      <div className='flex flex-row items-center'>
        <img
          src='/img/gold_flowing_champagne_glass.png'
          className='h-[84px] w-[75px] md:h-[51px] md:w-[47px]'
          alt='coin'
        />
        {isEarn ? (
          <Text variant='b1' size='semibold' className='ml-2 w-full text-white'>
            {callAction
              ? callAction
              : 'Join the challenges below to earn tickets that you can redeem for exciting rewards!'}
          </Text>
        ) : (
          <Text variant='b1' size='semibold' className='ml-2 w-full text-white'>
            Use your tickets to unlock exclusive rewards and experiences below!
            Based on regulation, not all rewards are available in all
            geographies.
          </Text>
        )}
      </div>
      <Button
        className={`mt-2 w-full ${
          isEarn
            ? 'bg-primary-400 hover:bg-primary-400'
            : 'bg-secondary-700 hover:bg-secondary-700'
        } md:mt-0 md:w-[200px]`}
        onClick={() => {
          showModal(ModalType.TIP_MODAL, !!isEarn)
        }}
      >
        <Text variant='b1' size='semibold' className='text-neutral-800'>
          {isEarn ? 'Start earning below!' : 'Unlock rewards below!'}
        </Text>
      </Button>
    </div>
  )
}

export default CallAction
