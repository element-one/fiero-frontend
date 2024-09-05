import { FC, useMemo, useState } from 'react'
import Confetti from 'react-confetti'
import Link from 'next/link'

import Button from '@components/Button/Button'
import { Text } from '@components/Text'
import { ModalType, useModal } from '@contexts/modal'
import { Image, Modal, ModalBody, ModalContent } from '@nextui-org/react'
import { usePutRedeemReward } from '@services/api'
import { useStore } from '@store/store'

export interface SpinSuccessModalProps {
  onClose?: () => void
}

const SpinSuccessModal: FC<SpinSuccessModalProps> = ({ onClose }) => {
  const { isModalShown, hideModal, showModal } = useModal()
  const reward = useStore((state) => state.reward)
  const userReward = useStore((state) => state.getUserReward(reward?.id))
  const prize = useStore((state) => state.prize)
  const setUserReward = useStore((state) => state.setUserReward)

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )
  const [errorType, setErrorType] = useState<'residence' | 'token' | undefined>(
    undefined
  )

  const { mutate: putRewardClaim, isLoading } = usePutRedeemReward(
    reward?.id,
    {
      onSuccess: (response) => {
        setUserReward(response.userReward)
        showModal(ModalType.SPIN_CLAIMED_MODAL)
      },
      onError: (err) => {
        if (err.response.data.message === 'error.reward-already-claimed') {
          showModal(ModalType.RAFFLE_SUCCESS_MODAL)
          setErrorType(undefined)
        }

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
          setErrorMessage(reward?.restriction || 'User residence restricted')
          setErrorType('residence')
        }
      }
    }
  )

  const handleModalClose = () => {
    hideModal()
    onClose?.()
  }

  const handleClaimPrize = async () => {
    if (!reward?.id) {
      return
    }

    putRewardClaim()
  }

  const prizeName = useMemo(() => {
    if (userReward?.rewardSpin) {
      if (userReward.rewardSpin.isWinner) {
        return userReward.rewardSpin.name
      }
    }

    if (!prize) return ''

    if (prize === 'none') return ''

    return prize
  }, [prize, userReward?.rewardSpin])

  return (
    <Modal
      size='full'
      isOpen={isModalShown(ModalType.SPIN_SUCCESS_MODAL)}
      onClose={handleModalClose}
      className='bg-bg-white'
      classNames={{
        closeButton: 'text-text-black',
      }}
    >
      <ModalContent>
        <ModalBody className='h-full overflow-auto'>
          {prizeName && <Confetti className='h-full w-full' />}
          <div className='mx-auto flex h-full max-w-[520px] flex-col items-center justify-between py-5'>
            {prizeName && (
              <div className='mt-[120px] flex flex-col items-center justify-center gap-8'>
                <Image
                  src='/svg/spin_success.svg'
                  width={174}
                  alt='raffle'
                  className='mt-[60px]'
                />
                <div className='text-center text-[30px] font-[800] uppercase text-text-black'>
                  Congrats! You
                  <br />
                  won [{prizeName}]
                </div>

                {errorMessage && (
                  <div className='relative z-20 mt-4 p-2 opacity-60'>
                    <span className='text-center text-[16px] text-text-black'>
                      {errorMessage}
                    </span>
                  </div>
                )}

                {errorType === 'token' && (
                  <div className=' rounded-md px-2'>
                    <Link href='/contests' onClick={handleModalClose}>
                      <Text
                        variant='b1'
                        className='text-center text-text-black underline'
                      >
                        Earn more points
                      </Text>
                    </Link>
                  </div>
                )}

                <Button
                  onClick={handleClaimPrize}
                  isLoading={isLoading}
                  variant='regular'
                  className='mt-[68px] h-[62px] bg-bg-orange px-6 text-[16px] font-[800] uppercase text-text-white'
                >
                  Claim prize
                </Button>
              </div>
            )}
            {!prizeName && (
              <div className='mt-[120px] flex flex-col items-center justify-center gap-8'>
                <Image
                  src='/svg/no_prize.svg'
                  width={174}
                  alt='raffle'
                  className='mt-[60px]'
                />
                <div className='text-center text-[30px] font-[800] uppercase text-text-black'>
                  you didn’t won any prize
                  <br />
                  good luck next time
                </div>
                <Button
                  onClick={handleModalClose}
                  variant='outline'
                  className='mt-[68px] h-[62px] px-6 text-[16px] font-[800] uppercase'
                >
                  Back to Home
                </Button>
              </div>
            )}
            <div className='mt-[113px] text-center text-[12px] text-text-black'>
              <span className='opacity-60'>
                For full terms and conditions,{' '}
              </span>
              <Link href='/tos' target='_blank' className='text-text-orange'>
                click here
              </Link>
              <span className='opacity-60'>
                {' '}
                . No purchase required for entry.
              </span>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SpinSuccessModal
