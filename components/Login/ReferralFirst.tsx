import { type HTMLAttributes } from 'react'
import clsx from 'clsx'

import { Text } from '@components/Text'

type ReferralFirstProps = HTMLAttributes<HTMLDivElement>

export const ReferralFirst: React.FC<ReferralFirstProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={clsx('flex h-screen w-full flex-col bg-black', className)}
      {...props}
    >
      <div className='h-5/9 bg-[url("/img/one_referral_sm_bg.svg")] bg-cover bg-center bg-no-repeat md:h-2/3 md:bg-[url("/img/one_referral_bg.svg")]' />
      <div className='flex h-4/9 flex-col items-center justify-start px-5 md:h-1/3'>
        <Text
          variant='sg'
          size='semibold'
          className='mt-[22px] text-center text-white'
        >
          Welcome to Fiero!
        </Text>
        <Text
          variant='sg'
          size='semibold'
          className='mb-[22px] text-center text-white'
        >
          Get your 5 tickets today
        </Text>
        <Text
          variant='h3'
          size='normal'
          className='mb-[20px] text-center text-white opacity-80 md:mb-[40px]'
        >
          Join your friend and get a 5 tickets bonus when you finish an
          Challenge task.
        </Text>
      </div>
    </div>
  )
}

export default ReferralFirst
