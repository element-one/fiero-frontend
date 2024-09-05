import { type HTMLAttributes } from 'react'
import clsx from 'clsx'

import { Text } from '@components/Text'

type GeneralThirdSmProps = HTMLAttributes<HTMLDivElement>

export const GeneralThirdSm: React.FC<GeneralThirdSmProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'flex h-full w-full flex-col items-center justify-start bg-black bg-[url("/img/general_third_bg_sm_half.svg")] bg-cover bg-center bg-no-repeat px-10 pb-5',
        className
      )}
      {...props}
    >
      <Text
        variant='sm'
        size='semibold'
        className='mt-[60px] text-center text-white'
      >
        Unlock Exclusive
      </Text>
      <Text variant='sm' size='semibold' className='text-center text-white'>
        Rewards 🎁
      </Text>
    </div>
  )
}

export default GeneralThirdSm
