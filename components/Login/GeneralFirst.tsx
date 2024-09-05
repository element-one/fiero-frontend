import { type HTMLAttributes } from 'react'
import clsx from 'clsx'

import { Text } from '@components/Text'

type GeneralFirstProps = HTMLAttributes<HTMLDivElement> & {
  isModal?: boolean
}

export const GeneralFirst: React.FC<GeneralFirstProps> = ({
  isModal = false,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'flex h-screen w-full flex-col bg-neutral-900',
        className
      )}
      {...props}
    >
      <div className='h-5/9 bg-[url("/svg/asset-login.svg")] bg-contain bg-center bg-no-repeat md:h-2/3 md:bg-[url("/svg/asset-login.svg")]' />
      <div className='flex h-4/9 flex-col items-center justify-start px-5 md:h-1/3'>
        <Text
          variant={isModal ? 'h1' : 'sg'}
          size='semibold'
          className='my-[22px] text-center text-white'
        >
          Welcome to Dunkin!
        </Text>
        <Text
          variant={isModal ? 'b1' : 'h3'}
          size='normal'
          className='mb-[20px] w-3/4 text-center text-white opacity-80 md:mb-[20px]'
        >
          Post videos. Make an impact. Win cash.
        </Text>
      </div>
    </div>
  )
}

export default GeneralFirst
