import React, { useCallback, useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useAuth } from '@contexts/auth'
import { getMe } from '@services/api'
import { useStore } from '@store/store'

const RedirectPage: NextPage = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const setUser = useStore((state) => state.setUser)
  const redirectUrl = useStore((state) => state.redirectUrl)

  const redirect = useCallback(async () => {
    const response = await getMe()

    if (response.statusCode === 200) {
      setUser(response.user)
      if (redirectUrl) {
        router.push(redirectUrl)
      } else {
        router.push('/')
      }
    } else {
      router.push('/')
    }
  }, [redirectUrl, router, setUser])

  useEffect(() => {
    if (isAuthenticated) {
      redirect()
    }
  }, [isAuthenticated, redirect])

  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-neutral-900'>
      <div className='h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600' />
    </div>
  )
}

export default RedirectPage
