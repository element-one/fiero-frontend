import {
  FC,
  MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { debounce } from 'lodash'

import { Text } from '@components/Text'
import { useAuth } from '@contexts/auth'
import { ModalType, useModal } from '@contexts/modal'
import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  Spinner,
} from '@nextui-org/react'
import { useGetUserHoldings, usePutRedeemReward } from '@services/api'
import { useStore } from '@store/store'

export interface RaffleModalProps {
  onClose?: () => void
}

const RaffleModal: FC<RaffleModalProps> = ({ onClose }) => {
  const { isModalShown, hideModal, showModal } = useModal()
  const { isAuthenticated } = useAuth()

  const handleModalClose = () => {
    hideModal()
    onClose?.()
  }

  const unlockReward = () => {
    if (!isAuthenticated) {
      showModal(ModalType.SIGN_IN_MODAL)
      return
    }

    redeemReward()
  }

  const handleUnlockReward = useCallback(debounce(unlockReward, 500), [])

  const { data: holdingsData } = useGetUserHoldings(isAuthenticated)

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )
  const [errorType, setErrorType] = useState<'residence' | 'token' | undefined>(
    undefined
  )

  const reward = useStore((state) => state.reward)
  const setUserReward = useStore((state) => state.setUserReward)

  const allHoldings =
    holdingsData?.holdings.reduce((pre, { points }) => {
      return pre + points
    }, 0) ?? 0

  const { mutate: redeemReward, isLoading } = usePutRedeemReward(reward?.id, {
    onSuccess: async (response) => {
      setUserReward(response.userReward)
      hideModal()
      showModal(ModalType.RAFFLE_SUCCESS_MODAL)
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
        setErrorMessage(reward?.restriction)
        setErrorType('residence')
      }
    },
  })

  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    const sliderButton = document.querySelector<HTMLDivElement>(
      '#raffleSliderButton'
    )

    if (!sliderButton) {
      return
    }

    const startX = e.clientX
    let disX = 0

    document.body.style.cursor = 'dragging'

    const onMove = (e: MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      const clientX = e.clientX
      disX = Math.max(0, Math.min(clientX - startX, 90))

      if (disX >= 80) {
        handleUnlockReward()
      }

      sliderButton.style.transform = `translateX(${disX}px)`
    }

    const onMouseUp = (e: MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onMouseUp)
      document.body.style.cursor = 'default'
      if (disX < 80) {
        disX = 0
        sliderButton.style.transform = `translateX(${disX}px)`
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  useEffect(() => {
    if (reward?.points !== undefined && allHoldings < reward?.points) {
      setErrorMessage('You don’t have enough points to redeem!')
      setErrorType('token')
    } else {
      setErrorMessage(undefined)
      setErrorType(undefined)
    }
  }, [allHoldings, reward])

  return (
    <Modal
      size='full'
      isOpen={isModalShown(ModalType.RAFFLE_MODAL)}
      onClose={handleModalClose}
      className='bg-bg-white'
      classNames={{
        closeButton: 'text-text-black',
      }}
    >
      <ModalContent>
        <ModalBody className='h-full overflow-auto'>
          <div className='mx-auto flex h-full max-w-[520px] flex-col items-center justify-between py-5'>
            <Image
              src='/png/fiero_logo.png'
              width={232}
              alt='Fiero'
            />
            <Image
              src='/png/raffle.png'
              width={400}
              alt='raffle'
              className='mt-[60px]'
            />
            <div className='mt-15 text-center text-[30px] font-knockout uppercase font-[600] text-text-black'>
              Enter the Friends of Fiero sweepstakes!
            </div>
            <div className='mt-[14px] text-center text-[16px] font-typewriter font-[500] text-text-black opacity-60'>
              Try your luck below!
            </div>
            <div
              className={clsx(
                'relative mt-10 flex h-[76px] w-[236px] shrink-0 items-center justify-end rounded-full bg-bg-primary px-6 py-[14px]',
                errorMessage
                  ? 'pointer-events-none cursor-not-allowed opacity-60'
                  : ''
              )}
            >
              {!isLoading && (
                <div
                  onMouseDown={handleMouseDown}
                  id='raffleSliderButton'
                  className='absolute left-3 flex h-[58px] w-[122px] cursor-grab items-center justify-end rounded-full bg-bg-white px-6'
                >
                  <Image src='/svg/arrow-right.svg' width={18} alt='arrow' />
                </div>
              )}
              {isLoading && (
                <div className='flex w-full items-center justify-center'>
                  <Spinner
                    classNames={{
                      circle1: 'border-b-border-white',
                      circle2: 'border-b-border-white',
                    }}
                  />
                </div>
              )}
              <Image src='/svg/arrows.svg' alt='arrows' width={25} />
            </div>
            {errorMessage && (
              <div className='relative z-20 mt-4 p-2'>
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
                    className='text-center text-text-white underline !font-typewriter'
                  >
                    Earn more points
                  </Text>
                </Link>
              </div>
            )}
            {!errorMessage && (
              <div className='mt-4 text-[14px] font-[500] text-text-black font-typewriter'>
                Slide to unlock rewards
              </div>
            )}
            <div className='mt-[113px] text-center text-[12px] text-text-black font-typewriter'>
              <span className='opacity-60'>For Terms and Conditions, </span>
              <Link href='/tos' target='_blank' className='underline'>
                click here
              </Link>
              <span className='opacity-60'>, and for Contest Rules,</span>
              <span>click here</span>
              <span className='opacity-60'>
                . No purchase or payment of any kind is necessary to enter for a
                chance to win. A purchase or payment of any kind will not
                increase your changes of winning. Must be 21+ to enter.
              </span>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default RaffleModal
