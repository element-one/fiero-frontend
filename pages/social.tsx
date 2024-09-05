import React, { useCallback, useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useAuth } from '@contexts/auth'
import { ModalType, useModal } from '@contexts/modal'
import { getMe } from '@services/api'
import { useStore } from '@store/store'
import { delay } from '@utils/utils'

const SocialPage: NextPage = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const setUser = useStore((state) => state.setUser)
  const redirectUrl = useStore((state) => state.redirectUrl)
  const earn = useStore((store) => store.earn)
  const { showModal } = useModal()

  const redirect = useCallback(async () => {
    const response = await getMe()

    if (response.statusCode === 200) {
      setUser(response.user)
      if (redirectUrl) {
        router.push(redirectUrl)
        await delay(1000)

        if (earn) {
          if (earn.type === 'social') {
            const { earnSocial } = earn
            if (
              earnSocial?.type === 'twitter_follow' ||
              earnSocial?.type === 'twitter_like' ||
              earnSocial?.type === 'twitter_retweet'
            ) {
              showModal(ModalType.TWITTER_CHALLENGE_MODAL)
            }

            if (
              earnSocial?.type === 'instagram_follow' ||
              earnSocial?.type === 'instagram_post'
            ) {
              showModal(ModalType.INSTAGRAM_CHALLENGE_MODAL)
            }

            if (
              earnSocial?.type === 'tiktok_follow' ||
              earnSocial?.type === 'tiktok_post'
            ) {
              showModal(ModalType.TIKTOK_CHALLENGE_MODAL)
            }
          } else {
            showModal(ModalType.SURVEY_CHALLENGE_MODAL)
          }
        }
      } else {
        router.push('/')
      }
    } else {
      router.push('/')
    }
  }, [earn, redirectUrl, router, setUser, showModal])

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

export default SocialPage
