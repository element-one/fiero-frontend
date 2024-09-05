import React, { Fragment, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { Dialog, Transition } from '@headlessui/react'

import Button from '@components/Button/Button'
import { Text } from '@components/Text'
import { useAuth } from '@contexts/auth'
import { usePutEventRewardClaim } from '@services/api/event'
import { useStore } from '@store/store'
import { ModalType, useModal } from 'contexts/modal'

interface RedeemRewardModalProps {
  onClose?: () => void
}

export const RedeemRewardModal: React.FC<RedeemRewardModalProps> = ({
  onClose,
}) => {
  const { isAuthenticated } = useAuth()
  const { isModalShown, hideModal, showModal } = useModal()

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )
  const [errorType, setErrorType] = useState<'residence' | 'token' | undefined>(
    undefined
  )

  const eventReward = useStore((store) => store.eventReward)
  const setUserEventReward = useStore((state) => state.setUserEventReward)

  const { mutate: claimReward, isLoading } = usePutEventRewardClaim(
    eventReward?.id,
    {
      onSuccess(data) {
        setUserEventReward(data?.userEventReward)
        closeModal()

        if (eventReward?.type === 'raffle') {
          showModal(ModalType.EVENT_RAFFLE_SUCCESS_MODAL)
        } else if (eventReward?.type === 'merchandise') {
          showModal(ModalType.REDEEM_QR_CODE_MODAL)
        } else if (eventReward?.type === 'custom') {
          showModal(ModalType.EVENT_CUSTOM_INFO_MODAL)
        }
      },
      onError: (err) => {
        if (err.response.data.message === 'error.reward-not-enough-token') {
          setErrorMessage('You don’t have enough points to redeem!')
          setErrorType('token')
        }

        if (err.response.data.message === 'error.reward-not-available') {
          setErrorMessage(
            'The reward was too popular! It’s no longer available, but please check back soon. '
          )
          setErrorType(undefined)
        }
      },
    }
  )

  const handleClaim = () => {
    if (!isAuthenticated) {
      showModal(ModalType.SIGN_IN_MODAL)
      return
    }

    claimReward()
  }

  const closeModal = () => {
    hideModal()
    onClose && onClose()
  }

  return (
    <Transition
      appear
      show={isModalShown(ModalType.REDEEM_REWARD_MODAL)}
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
                  'relative h-[540px] min-h-full w-[320px] transform overflow-hidden rounded-xl bg-neutral-800 text-left  align-middle shadow-xl transition-all md:h-[620px] md:min-h-fit md:w-[418px]'
                )}
              >
                <div className='z-0 flex w-full flex-col items-center justify-center p-[20px] md:p-[40px]'>
                  <button
                    className='absolute right-2 top-2'
                    onClick={closeModal}
                  >
                    <img
                      src='/img/icon_x.png'
                      className='h-[32px] w-[32px] object-cover'
                      alt='close'
                    />
                  </button>
                  <div className='relative mt-[30px] flex h-[212px] w-[192px] items-center justify-center bg-[url("/img/ellipse_bg.svg")] md:mt-[53px] '>
                    <img
                      src={eventReward?.imageUrl}
                      className='h-[120px] w-[120px]'
                      alt='redeem'
                    />
                  </div>
                  <Text
                    variant='h2'
                    size='bold'
                    className='mt-5 line-clamp-3 w-full overflow-ellipsis text-center text-[22px] text-text-primary md:text-[26px]'
                  >
                    {eventReward?.name}
                  </Text>
                  <Text
                    variant='b1'
                    size='bold'
                    className='mt-[10px] text-primary-400'
                  >
                    {`Cost: ${eventReward?.points} Tickets`}
                  </Text>
                  <Button
                    className='mt-[25px] border-primary-400 px-6 py-5'
                    onClick={handleClaim}
                    isLoading={isLoading}
                  >
                    <Text
                      variant='h3'
                      size='semibold'
                      className='text-neutral-800'
                    >
                      {eventReward?.type === 'raffle'
                        ? 'Enter Giveaway'
                        : 'Redeem Reward'}
                    </Text>
                  </Button>
                  {!errorMessage && eventReward?.type === 'merchandise' && (
                    <Text
                      variant='b2'
                      size='medium'
                      className='mt-5 w-full text-center text-neutral-300'
                    >
                      Your personal promo code will be sent via email pending
                      review and approval. Offer valid while supplies last.
                    </Text>
                  )}
                  {errorMessage && (
                    <div className='mt-4 rounded-md p-2'>
                      <Text variant='b1' className='text-center text-red-500'>
                        {errorMessage}
                      </Text>
                    </div>
                  )}
                  {errorType === 'token' && (
                    <div className=' rounded-md px-2'>
                      <Link href='/prizes' onClick={closeModal}>
                        <Text
                          variant='b1'
                          className='text-center text-red-500 underline'
                        >
                          Earn more tickets
                        </Text>
                      </Link>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default RedeemRewardModal
