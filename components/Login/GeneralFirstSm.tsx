import { type HTMLAttributes } from 'react'
import clsx from 'clsx'

import { Text } from '@components/Text'

type GeneralFirstSmProps = HTMLAttributes<HTMLDivElement>

export const GeneralFirstSm: React.FC<GeneralFirstSmProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'flex h-full w-full flex-col items-center justify-start bg-black bg-[url("/img/general_first_bg_sm_half.svg")] bg-cover bg-center bg-no-repeat px-5 pb-5',
        className
      )}
      {...props}
    >
      <Text
        variant='sm'
        size='semibold'
        className='mt-[60px] text-center text-white'
      >
        Welcome to Harpoon!
      </Text>
    </div>
  )
}

export default GeneralFirstSm
