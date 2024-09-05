import React from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'

import Button from '@components/Button/Button'
import Text from '@components/Text/Text'
import { ModalType, useModal } from '@contexts/modal'

const SignupPage: NextPage = () => {
  const { showModal } = useModal()

  const handleLogin = () => {
    showModal(ModalType.SIGN_IN_MODAL)
    return
  }

  return (
    <div className='flex min-h-screen w-full flex-row items-center justify-center bg-[url("/img/signup_bg.png")] bg-cover bg-center'>
      <div className=' flex w-3/4 flex-col items-center justify-center text-white md:w-[439px]'>
        <Image
          src='/img/signup_logo.png'
          alt='login cover'
          width='238'
          height='282'
          sizes='100vw'
          className='h-[282px] w-[238px]'
          style={{ objectFit: 'cover' }}
        />
        <Text size='bold' className='w-4/5 text-center md:mt-12 md:text-[42px]'>
          Welcome to the Wolf Pack!
        </Text>
        <Text variant='b1' className='md:p-b1 mt-2 text-center'>
          Get your digital membership card to start unlocking exclusive
          Lobos1707 rewards and experiences.
        </Text>
        <Button
          className='md:p-b1 mt-8 h-[50px] w-full font-bold'
          onClick={handleLogin}
        >
          <Text variant='b1' size='semibold' className='text-neutral-900'>
            Login / Sign Up
          </Text>
        </Button>
      </div>
    </div>
  )
}

export default SignupPage
