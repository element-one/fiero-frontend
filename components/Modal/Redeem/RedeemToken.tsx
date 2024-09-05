import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { Dialog, Transition } from '@headlessui/react'

import Button from '@components/Button/Button'
import { CloseIcon } from '@components/Icons'
import { Text } from '@components/Text'
import { useAuth } from '@contexts/auth'
import { useGetUserHoldings, usePutRedeemReward } from '@services/api'
import { useStore } from '@store/store'
import { ModalType, useModal } from 'contexts/modal'

interface RedeemTokenModalProps {
  onClose?: () => void
  isRaffle?: boolean
}

export const RedeemTokenModal: React.FC<RedeemTokenModalProps> = ({
  onClose,
  isRaffle,
}) => {
  const { isModalShown, hideModal, showModal } = useModal()
  const { isAuthenticated } = useAuth()

  const { data: holdingsData } = useGetUserHoldings(isAuthenticated)

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )
  const [errorType, setErrorType] = useState<'residence' | 'token' | undefined>(
    undefined
  )

  const allHoldings =
    holdingsData?.holdings.reduce((pre, { points }) => {
      return pre + points
    }, 0) ?? 0

  const reward = useStore((state) => state.reward)
  const removeReward = useStore((state) => state.removeReward)
  const setUserReward = useStore((state) => state.setUserReward)

  useEffect(() => {
    if (reward?.points !== undefined && allHoldings < reward?.points) {
      setErrorMessage('You don’t have enough points to redeem!')
      setErrorType('token')
    } else {
      setErrorMessage(undefined);
      setErrorType(undefined);
    }
  }, [allHoldings, reward])

  const { mutate: redeemReward, isLoading } = usePutRedeemReward(reward?.id, {
    onSuccess: async (response) => {
      setUserReward(response.userReward)
      hideModal()

      if (response.userReward.reward.type === 'qrcode') {
        showModal(ModalType.REDEEM_QR_CODE_MODAL)
      }

      if (response.userReward.reward.type === 'raffle') {
        showModal(ModalType.RAFFLE_SUCCESS_MODAL)
      }

      if (response.userReward.reward.type === 'discount') {
        showModal(ModalType.DISCOUNT_SUCCESS_MODAL)
      }

      if (response.userReward.reward.type === 'merchandise') {
        showModal(ModalType.DELIVERY_SUCCESS_MODAL)
      }

      if (response.userReward.reward.type === 'custom') {
        showModal(ModalType.CUSTOM_INFO_MODAL)
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

      if (err.response.data.message === 'error.user-residence-restricted') {
        setErrorMessage(reward?.restriction)
        setErrorType('residence')
      }
    },
  })

  const closeModal = () => {
    removeReward()
    hideModal()
    onClose && onClose()
  }

  const handleRedeem = async () => {
    if (!isAuthenticated) {
      showModal(ModalType.SIGN_IN_MODAL)
      return
    }

    redeemReward()
  }

  return (
    <Transition
      appear
      show={isModalShown(ModalType.REDEEM_MODAL)}
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
          <div className='flex h-full min-h-full items-center justify-center bg-bg-gray-yellow'>
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
                  'relative h-full min-h-full w-full transform overflow-hidden overflow-y-auto rounded-xl bg-bg-gray-yellow pb-6 text-left  align-middle shadow-xl transition-all '
                )}
              >
                <div className='z-0 flex w-full flex-col items-center justify-center'>
                  <button
                    className='absolute right-2 top-2 z-20 rounded-full bg-bg-gray-yellow p-2 text-text-black'
                    onClick={closeModal}
                  >
                    <CloseIcon width={24} height={24} />
                  </button>
                  <div className='relative flex h-fit min-h-[200px] w-full items-center justify-center overflow-hidden bg-[url("/img/ellipse_bg.svg")]'>
                    <img
                      src={reward?.imageUrl}
                      className='max-h-[600px] w-full object-cover'
                      alt='redeem'
                    />
                    <div className='absolute bottom-0 mb-[-50px] h-[100px] w-[120%] rounded-[50%] bg-bg-gray-yellow md:mb-[-50px] md:h-[200px]'></div>
                  </div>
                  <Text
                    variant='h1s'
                    className='relative z-10 -mt-4 line-clamp-2 w-full max-w-[520px] overflow-ellipsis text-center text-text-black md:-mt-20'
                  >
                    <span className='font-[600]'>{reward?.name}</span>
                  </Text>
                  {!errorMessage && (
                    <Text
                      variant='b1'
                      className='mt-5 w-full z-10 max-w-[520px] px-7 text-center !font-[500] text-text-black !text-[15px]'
                    >
                      {isRaffle
                        ? 'Every ticket you’ve earned from completing contests will be entered into the next giveaway drawing. Participants will be notified directly of the winner.'
                        : `Spend your points to unlock a 50% off code for your next Harpoon brewery tour.`}
                    </Text>
                  )}
                  {errorMessage && (
                    <div className='relative z-20 mt-4 p-2'>
                      <span className='text-center text-[16px] text-red-500'>
                        {errorMessage}
                      </span>
                    </div>
                  )}
                  <div className='mt-[10px] flex items-center justify-between gap-6 rounded-full bg-bg-light px-4 py-3 md:mt-16'>
                    <div className='flex items-center justify-center gap-2'>
                      <img
                        src='/svg/crown.svg'
                        className='h-6 w-6'
                        alt='icon-can'
                      />
                      <span className='text-text-black opacity-60'>Cost</span>
                    </div>

                    <Text variant='b1' className='text-text-black !font-[600]'>
                      {`${reward?.points} Points`}
                    </Text>
                  </div>
                  <Button
                    isLoading={isLoading}
                    className='w-[238px] mt-16 h-[52px] bg-bg-primary px-6 py-5'
                    onClick={handleRedeem}
                    disabled={!!errorMessage}
                  >
                    <Text
                      variant='h3'
                      size='semibold'
                      className='text-text-white'
                    >
                      <span className='font-[600]'>
                        {isRaffle ? 'Enter Giveaway' : 'Unlock Reward'}
                      </span>
                    </Text>
                  </Button>
                  {errorType === 'residence' && (
                    <div className=' rounded-md px-2'>
                      <Link href='mailto:support@glass.fun'>
                        <Text
                          variant='b1'
                          className='text-center text-red-500 underline'
                        >
                          Change my residence
                        </Text>
                      </Link>
                    </div>
                  )}
                  {errorType === 'token' && (
                    <div className='mt-2 rounded-md px-2'>
                      <Link href='/contests' onClick={closeModal}>
                        <Text
                          variant='b1'
                          className='text-center text-red-500 underline'
                        >
                          Earn more points
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

export default RedeemTokenModal
