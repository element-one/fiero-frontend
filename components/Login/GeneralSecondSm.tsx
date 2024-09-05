import { type HTMLAttributes } from 'react'
import clsx from 'clsx'

import { Text } from '@components/Text'

type GeneralSecondSmProps = HTMLAttributes<HTMLDivElement>

export const GeneralSecondSm: React.FC<GeneralSecondSmProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'flex h-full w-full flex-col items-center justify-start bg-black bg-[url("/img/general_second_bg_sm_half.svg")] bg-cover bg-center bg-no-repeat px-10 pb-5',
        className
      )}
      {...props}
    >
      <Text
        variant='sm'
        size='semibold'
        className='mt-[60px] text-center text-white'
      >
        Happy Earning Through Challenges! 🎉
      </Text>
    </div>
  )
}

export default GeneralSecondSm
