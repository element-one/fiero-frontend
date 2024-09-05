import { type HTMLAttributes } from 'react'
import clsx from 'clsx'

import { Text } from '@components/Text'

type GeneralThirdProps = HTMLAttributes<HTMLDivElement> & {
  isModal?: boolean
}

export const GeneralThird: React.FC<GeneralThirdProps> = ({
  isModal = false,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx('flex h-full w-full flex-col bg-black', className)}
      {...props}
    >
      <div className='h-5/9 bg-[url("/img/general_third_bg_sm_half.svg")] bg-cover bg-center bg-no-repeat md:h-2/3 md:bg-[url("/img/general_third_bg_half.svg")]' />
      <div className='flex h-4/9 flex-col items-center justify-start px-5 md:h-1/3'>
        <Text
          variant={isModal ? 'h1' : 'sg'}
          size='semibold'
          className='mt-[22px] text-center text-white'
        >
          Unlock Exclusive
        </Text>
        <Text
          variant={isModal ? 'h1' : 'sg'}
          size='semibold'
          className='mb-[22px] text-center text-white'
        >
          Rewards 🎁
        </Text>
        <Text
          variant={isModal ? 'b1' : 'h3'}
          size='normal'
          className='mb-[20px] w-3/4 text-center text-white opacity-80 md:mb-[40px]'
        >
          Join your friend and get a 5 tickets bonus when you finish an
          Challenge task.
        </Text>
      </div>
    </div>
  )
}

export default GeneralThird
