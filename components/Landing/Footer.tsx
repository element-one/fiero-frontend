import Link from 'next/link'

import Text from '@components/Text/Text'
import { Image } from '@nextui-org/react'

const LandingFooter = () => {
  return (
    <div className='flex w-full flex-col flex-wrap items-center'>
      <Image
        src={'/png/harpoon_logo.png'}
        alt='drumbeat logo'
        width={96}
        className='mt-20 md:mt-32'
      />
      <div className='my-6'></div>
      <div className='flex flex-row space-x-4'>
        <Link href='/privacy' target='_blank' rel='noopener noreferrer'>
          <Text variant='b1' className='my-6 text-text-black underline'>
            Privacy Policy
          </Text>
        </Link>
        <Link href='/tos' target='_blank' rel='noopener noreferrer'>
          <Text variant='b1' className='my-6 text-text-black underline'>
            Terms & Conditions
          </Text>
        </Link>
      </div>
    </div>
  )
}

export default LandingFooter
