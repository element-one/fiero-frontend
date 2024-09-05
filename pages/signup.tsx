import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import PinForm from '@components/Login/PinForm'
import SignupForm from '@components/Login/SignupForm'
import { useAuth } from '@contexts/auth'

import 'react-multi-carousel/lib/styles.css'

const SignUpPage: NextPage = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const [isSentCode, setIsSentCode] = useState(false)
  const [email, setEmail] = useState<string | undefined>(undefined)

  const handleSentCode = (email: string) => {
    setEmail(email)
    setIsSentCode(true)
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, []) // eslint-disable-line

  return (
    <div className='flex min-h-screen w-full flex-row items-center justify-center bg-bg-white'>
      <div className='min-h-[400px] w-fit transform overflow-hidden rounded-xl text-left text-white transition-all'>
        {!isSentCode && <SignupForm onSuccess={handleSentCode} />}
        {isSentCode && <PinForm email={email} />}
      </div>
    </div>
  )
}

export default SignUpPage
