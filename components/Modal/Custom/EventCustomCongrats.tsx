import React, { Fragment } from 'react'
import clsx from 'clsx'
import { Dialog, Transition } from '@headlessui/react'

import Button from '@components/Button/Button'
import { Text } from '@components/Text'
import { ModalType, useModal } from 'contexts/modal'

interface EventCustomCongratsProps {
  onClose?: () => void
}

export const EventCustomCongratsModal: React.FC<EventCustomCongratsProps> = ({
  onClose,
}) => {
  const { isModalShown, hideModal } = useModal()

  const closeModal = () => {
    hideModal()
    onClose && onClose()
  }

  const handleBackToApp = () => {
    closeModal()
  }

  return (
    <Transition
      appear
      show={isModalShown(ModalType.EVENT_CUSTOM_CONGRATS_MODAL)}
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
                  'relative h-[620px] min-h-full w-[324px] transform overflow-hidden rounded-xl bg-neutral-800 text-left align-middle shadow-xl transition-all md:h-[659px] md:w-[510px]',
                  'bg-main bg-[url("/img/custom_congrats_bg.png")] bg-no-repeat'
                )}
              >
                <div className='z-0 flex w-full flex-col items-center justify-center p-5 md:p-14'>
                  <button
                    className='absolute right-2 top-2'
                    onClick={closeModal}
                  >
                    <img
                      src={'/img/icon_x.png'}
                      className='h-[32px] w-[32px] object-cover'
                      alt='close'
                    />
                  </button>
                  <img
                    src='/img/custom_congrats.svg'
                    className='mt-[98px] w-[192px] object-cover'
                    alt='navigation'
                  />
                  <Text
                    variant='h1s'
                    size='semibold'
                    className='mt-5 text-center text-white'
                  >
                    Congratulations!
                  </Text>
                  <Text
                    variant='h2s'
                    size='medium'
                    className='mt-[18px] text-center text-neutral-300'
                  >
                    Our team will email you within 48 hours with the details of
                    your reward.
                  </Text>
                  <Button
                    className='mt-[50px] h-[60px] w-[160px] bg-primary-500'
                    onClick={handleBackToApp}
                  >
                    <Text
                      variant='h3'
                      size='semibold'
                      className='text-neutral-700'
                    >
                      Back to app
                    </Text>
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default EventCustomCongratsModal
