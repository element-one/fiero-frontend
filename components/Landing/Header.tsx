import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import Button from '@components/Button/Button'
import Text from '@components/Text/Text'
import { Image } from '@nextui-org/react'

const LandingHeaderAppButton = ({ path }: { path?: string }) => {
  const router = useRouter()

  return (
    <Button
      onClick={() => {
        router.push(path ? path : '/')
      }}
      className='mx-auto md:m-0'
    >
      <Text variant='b1' size='semibold' className='px-7 py-1 text-text-white'>
        Back To Fiero
      </Text>
    </Button>
  )
}

const LandingHeader = () => {
  const [openBurgerMenu, setOpenBurgerMenu] = useState<boolean>(false)

  return (
    <>
      <header className='flex w-full flex-row flex-wrap justify-between px-6 py-5 md:px-20'>
        <Link href='/'>
          <Image src={'/png/fiero_logo.png'} alt='fiero logo' width={90} className='rounded-none' />
        </Link>
        <div className='hidden md:flex md:flex-row md:items-center md:space-x-12'>
          <LandingHeaderAppButton path='/' />
        </div>
        <div
          onClick={() => setOpenBurgerMenu(!openBurgerMenu)}
          className='flex flex-col items-center justify-center md:hidden'
        >
          <div className='h-0.5 w-6 rounded-full bg-gray-500'></div>
          <div className='my-1 h-0.5 w-6 rounded-full bg-gray-500'></div>
          <div className='h-0.5 w-6 rounded-full bg-gray-500'></div>
        </div>
      </header>
      <div
        className={clsx(
          'absolute flex w-full flex-col bg-bg-white pb-4 shadow-xl transition-all duration-200 ease-in-out md:hidden',
          openBurgerMenu
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0'
        )}
      >
        <LandingHeaderAppButton path='/' />
      </div>
    </>
  )
}

export default LandingHeader
