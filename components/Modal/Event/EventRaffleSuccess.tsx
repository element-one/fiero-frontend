import React, { Fragment } from 'react'
import Confetti from 'react-confetti'
import clsx from 'clsx'
import { Dialog, Transition } from '@headlessui/react'

import Button from '@components/Button/Button'
import { CloseIcon } from '@components/Icons'
import { Text } from '@components/Text'
import { ModalType, useModal } from 'contexts/modal'

interface EventRaffleModalProps {
  onClose?: () => void
}

export const EventRaffleSuccessModal: React.FC<EventRaffleModalProps> = ({
  onClose,
}) => {
  const { isModalShown, hideModal } = useModal()

  const closeModal = () => {
    hideModal()
    onClose && onClose()
  }

  return (
    <Transition
      appear
      show={isModalShown(ModalType.EVENT_RAFFLE_SUCCESS_MODAL)}
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
          <div className='flex h-full min-h-full w-full items-center justify-center'>
            <Confetti className='h-full w-full' />
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
                  'relative h-full min-h-full w-full transform overflow-hidden rounded-xl bg-bg-yellow text-left  align-middle shadow-xl transition-all'
                )}
              >
                <div className='z-0 flex h-full w-full flex-col items-center justify-center bg-[url("/png/congrats_sm_bg.png")] bg-[length:100%_100%] bg-no-repeat p-[20px] shadow-xl transition-all md:bg-[url("/png/congrats_bg.png")] md:p-[40px]'>
                  <button
                    className='absolute right-2 top-2 text-text-black'
                    onClick={closeModal}
                  >
                    <CloseIcon />
                  </button>
                  <img
                    src='/svg/check.svg'
                    className='my-8 w-[72px]'
                    alt='raffle'
                  />
                  <Text
                    variant='h1s'
                    className='w-full text-center text-[28px] uppercase md:text-[36px]'
                  >
                    <span className='font-[600]'>
                      You’ve successfully
                      <br />
                      entered the giveaway!
                    </span>
                  </Text>
                  <Text
                    variant='h23'
                    size='medium'
                    className='mt-[20px] w-full max-w-[520px] text-center text-[16px] md:mt-[30px] md:text-[20px]'
                  >
                    We’ll announce the winner at the end of the drawing period!
                  </Text>
                  <Button
                    className='mt-[60px] h-[62px] bg-bg-primary px-6 py-5'
                    onClick={() => {
                      closeModal()
                    }}
                  >
                    <Text variant='h3' className='uppercase text-text-white'>
                      <span className='font-[600]'>Back to Home</span>
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

export default EventRaffleSuccessModal
