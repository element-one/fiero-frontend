import React, { type HTMLAttributes, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import Button from '@components/Button/Button'
import Text from '@components/Text/Text'
import { ModalType, useModal } from '@contexts/modal'
import { deleteSocial, getMe } from '@services/api'
import { useStore } from '@store/store'
import {
  getUserInstagram,
  getUserTiktok,
  getUserTwitter,
  isTrue,
} from '@utils/utils'

interface SocialConnectProps extends HTMLAttributes<HTMLDivElement> {
  socialType: 'instagram' | 'twitter' | 'tiktok' | 'facebook'
  mediaCount?: number
}

export const SocialConnect: React.FC<SocialConnectProps> = ({
  socialType,
  mediaCount,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const { showModal } = useModal()
  const user = useStore((state) => state.user)
  const setUser = useStore((state) => state.setUser)
  const setRedirectUrl = useStore((state) => state.setRedirectUrl)
  const router = useRouter()

  const social = useMemo(() => {
    switch (socialType) {
      case 'instagram':
        return getUserInstagram(user)
      case 'tiktok':
        return getUserTiktok(user)
      case 'twitter':
        return getUserTwitter(user)
    }
  }, [socialType, user])

  const handleConnect = () => {
    showModal(
      socialType === 'instagram'
        ? ModalType.INSTAGRAM_LINK_MODAL
        : ModalType.TIKTOK_LINK_MODAL
    )
  }

  const handleRedirect = () => {
    setRedirectUrl(router.asPath)
  }

  const handleDisconnect = async () => {
    try {
      setIsLoading(true)
      const result = await deleteSocial(social?.id || '')
      if (result.statusCode === 200) {
        const userResponse = await getMe()
        if (userResponse.statusCode === 200) {
          setUser(userResponse.user)
        }
      }
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  const url =
    socialType === 'instagram'
      ? `${process.env.NEXT_PUBLIC_API_URL}/auth/instagram?userId=${user?.id}`
      : socialType === 'tiktok'
        ? `${process.env.NEXT_PUBLIC_API_URL}/auth/tiktok?userId=${user?.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/auth/twitter?userId=${user?.id}`

  const socialTitle = social?.username
    ? `@${social?.username}`
    : socialType === 'instagram'
      ? 'Instagram'
      : socialType === 'tiktok'
        ? 'Tiktok'
        : 'Twitter'
  const socialIcon =
    socialType === 'instagram'
      ? `/svg/instagram_${social?.username ? 'colored' : 'gray'}.svg`
      : socialType === 'tiktok'
        ? `/svg/tiktok_${social?.username ? 'colored' : 'gray'}.svg`
        : `/svg/twitter_${social?.username ? 'colored' : 'gray'}.svg`

  const connectButtonVisible =
    (!isTrue(process.env.NEXT_PUBLIC_INSTAGRAM_ENABLED) ||
      !isTrue(process.env.NEXT_PUBLIC_TIKTOK_ENABLED)) &&
    !social?.username &&
    (socialType === 'instagram' || socialType === 'tiktok')

  const redirectButtonVisible =
    (isTrue(process.env.NEXT_PUBLIC_INSTAGRAM_ENABLED) ||
      isTrue(process.env.NEXT_PUBLIC_INSTAGRAM_ENABLED)) &&
    !social?.username &&
    (socialType === 'instagram' || socialType === 'tiktok')

  return (
    <div {...props}>
      <div className='flex w-full flex-col items-center justify-between rounded-[10px] px-4 py-4'>
        <div className='mb-2 flex flex-col items-center justify-center'>
          <img
            src={socialIcon}
            alt='social icon'
            className='h-[38px] w-[38px] object-fill'
          />
          <Text
            variant='b1'
            size='semibold'
            className='mt-3 text-text-black font-typewriter'
          >
            {socialTitle}
          </Text>
          {isTrue(process.env.NEXT_PUBLIC_INSTAGRAM_ENABLED) &&
            socialType === 'instagram' &&
            social && (
              <Text
                variant='b1'
                size='semibold'
                className='mt-2 rounded-full bg-slate-500 px-2 text-text-primary md:ml-5 md:mt-0'
              >
                {`${mediaCount} Posts`}
              </Text>
            )}
          {isTrue(process.env.NEXT_PUBLIC_TIKTOK_ENABLED) &&
            socialType === 'tiktok' &&
            social && (
              <Text
                variant='b1'
                size='semibold'
                className='mt-2 rounded-full bg-slate-500 px-2 text-text-primary md:ml-5 md:mt-0'
              >
                {`${mediaCount} Posts`}
              </Text>
            )}
        </div>
        {!social?.username && socialType === 'twitter' && (
          <a
            href={url}
            className='flex h-full w-fit flex-row items-center justify-center  rounded-[8px] border border-border-orange px-2 py-1 text-[12px] md:mt-0'
            onClick={handleRedirect}
          >
            <Text variant='b2' className=' text-text-orange'>
              Connect
            </Text>
          </a>
        )}
        {connectButtonVisible && (
          <button
            className='flex h-full w-fit flex-row items-center justify-center rounded-[8px] border border-border-orange px-2 py-1 text-[12px] md:mt-0'
            onClick={handleConnect}
          >
            <Text variant='b2' className=' text-text-orange'>
              Connect
            </Text>
          </button>
        )}
        {redirectButtonVisible && (
          <a
            href={url}
            className='flex h-full w-fit flex-row items-center justify-center rounded-[8px] border border-border-orange px-2 py-1 text-[12px] md:mt-0'
            onClick={handleRedirect}
          >
            <Text variant='b2' className=' text-text-orange'>
              Connect
            </Text>
          </a>
        )}
        {social?.username && (
          <Button
            isLoading={isLoading}
            className='flex flex-row items-center justify-center rounded-md bg-red-700 bg-opacity-30 px-2 py-2 hover:bg-red-900'
            onClick={handleDisconnect}
          >
            <img
              src='/img/x_circle.png'
              alt='close'
              className='h-4 w-4 rounded-full object-fill'
            />
            <Text variant='b2' className='ml-1 text-red-700'>
              Disconnect
            </Text>
          </Button>
        )}
      </div>
    </div>
  )
}

export default SocialConnect
