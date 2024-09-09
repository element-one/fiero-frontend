import React, { type HTMLAttributes } from 'react'
import { useRouter } from 'next/router'

import Text from '@components/Text/Text'
import { useAuth } from '@contexts/auth'
import { ModalType, useModal } from '@contexts/modal'
import { useStore } from '@store/store'
import { ApiUser } from '@type/api'
import { isTrue } from '@utils/utils'

interface InstagramConnectProps extends HTMLAttributes<HTMLDivElement> {
  user?: ApiUser
}

export const InstagramConnect: React.FC<InstagramConnectProps> = ({
  user,
  ...props
}) => {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { hideModal, showModal } = useModal()
  const setRedirectUrl = useStore((state) => state.setRedirectUrl)

  const handleRedirect = () => {
    setRedirectUrl(router.asPath)
  }

  const handleConnect = () => {
    if (!isAuthenticated) {
      showModal(ModalType.SIGN_IN_MODAL)
      return
    }

    hideModal()
    showModal(ModalType.INSTAGRAM_LINK_MODAL)
  }

  return (
    <div {...props}>
      <div>
        <Text variant='h3' className='text-text-black text-center font-typewriter'>
          Initial step required:
        </Text>
        <Text variant='b1' className='mt-1 text-text-black text-center font-typewriter'>
          Please complete the below to join this challenge.
        </Text>
      </div>
      <div className='mt-5 flex w-full flex-col items-center justify-between rounded-[10px] border border-border-primary bg-bg-white p-4 md:flex-row'>
        <div className='flex flex-col items-center md:flex-row'>
          <img
            src={'/img/instagram.svg'}
            alt='instagram icon'
            className='h-[45px] w-[45px]'
          />
          <Text variant='b1' className='mt-3 text-text-black md:ml-5 md:mt-0 mr-2 font-typewriter'>
            Connect your Instagram Account
          </Text>
        </div>

        {!isTrue(process.env.NEXT_PUBLIC_INSTAGRAM_ENABLED) && (
          <button
            className='mt-3 flex h-full w-full flex-row items-center justify-center rounded-[8px] border border-border-primary px-4 py-[10px] md:mt-0 md:w-auto'
            onClick={handleConnect}
          >
            <Text variant='b1' className='mr-1 text-text-primary font-typewriter'>
              Connect Instagram
            </Text>
          </button>
        )}

        {isTrue(process.env.NEXT_PUBLIC_INSTAGRAM_ENABLED) && (
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/auth/instagram?userId=${user?.id}`}
            className='flex h-full flex-row items-center justify-center rounded-lg border border-border-primary px-4 py-[10px]'
            onClick={handleRedirect}
          >
            <Text variant='b1' className='mr-1 text-text-primary font-typewriter'>
              Connect Instagram
            </Text>
          </a>
        )}
      </div>
    </div>
  )
}

export default InstagramConnect
