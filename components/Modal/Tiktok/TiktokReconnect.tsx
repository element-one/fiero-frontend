import React, { Fragment } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Dialog, Transition } from '@headlessui/react'

import { Text } from '@components/Text'
import { useStore } from '@store/store'
import { ModalType, useModal } from 'contexts/modal'

interface TiktokReconnectModalProps {
  onClose?: () => void
}

export const TiktokReconnectModal: React.FC<TiktokReconnectModalProps> = ({
  onClose,
}) => {
  const router = useRouter()
  const { isModalShown, hideModal, showModal } = useModal()

  const user = useStore((state) => state.user)
  const setRedirectUrl = useStore((state) => state.setRedirectUrl)

  const closeModal = () => {
    hideModal()
    onClose && onClose()
    showModal(ModalType.TIKTOK_CHALLENGE_MODAL)
  }

  const handleRedirect = () => {
    setRedirectUrl(router.asPath)
  }

  return (
    <Transition
      appear
      show={isModalShown(ModalType.TIKTOK_RECONNECT_MODAL)}
      as={Fragment}
    >
      <Dialog as='div' className='relative z-[60]' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className={clsx(
                  'relative h-[500px] min-h-full w-4/5 transform overflow-hidden rounded-xl bg-bg-white text-left align-middle shadow-xl transition-all md:h-[536px] md:w-[484px]'
                )}
              >
                <div className='mt-8 flex h-full w-full flex-col items-center justify-between rounded-[10px] p-4'>
                  <div className='flex flex-col items-center'>
                    <img
                      src={'/svg/tiktok.svg'}
                      alt='tiktok icon'
                      className=' w-[107px]'
                    />
                    <Text
                      variant='h2'
                      className='mt-6 px-4 text-center text-text-black'
                    >
                      Whoops, your Tiktok authorization has expired!
                    </Text>
                    <Text variant='h3' className='mt-3 text-text-black opacity-60'>
                      Please re-connect your account
                    </Text>
                  </div>

                  <a
                    href={`${process.env.NEXT_PUBLIC_API_URL}/auth/tiktok?userId=${user?.id}`}
                    className='my-20 flex h-fit w-fit flex-row items-center justify-center border border-border-primary bg-bg-primary rounded-[8px] px-8 py-[10px]'
                    onClick={handleRedirect}
                  >
                    <Text
                      variant='b1'
                      className='mr-1 font-semibold'
                    >
                      Connect Tiktok
                    </Text>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default TiktokReconnectModal
