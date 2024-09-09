import { FC, useEffect, useState } from 'react'
import Link from 'next/link'

import { RaffleWheel } from '@components/RaffleWheel/RaffleWheel'
import { Text } from '@components/Text'
import { useAuth } from '@contexts/auth'
import { ModalType, useModal } from '@contexts/modal'
import { Image, Modal, ModalBody, ModalContent } from '@nextui-org/react'
import { useGetUserHoldings } from '@services/api'
import { useStore } from '@store/store'

export interface SpinModalProps {
  onClose?: () => void
}

const SpinModal: FC<SpinModalProps> = ({ onClose }) => {
  const { isModalShown, hideModal, showModal } = useModal()
  const setPrize = useStore((state) => state.setPrize)
  const { isAuthenticated } = useAuth()
  const reward = useStore((state) => state.reward)
  const { data: holdingsData } = useGetUserHoldings(isAuthenticated)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const allHoldings =
    holdingsData?.holdings.reduce((pre, { points }) => {
      return pre + points
    }, 0) ?? 0

  useEffect(() => {
    if (reward?.points !== undefined && allHoldings < reward?.points) {
      setErrorMessage('You don’t have enough points to redeem!')
      return
    }

    if (reward?.spinPrizes.every((prize) => {
      return prize.used >= prize.quantity
    })) {
      setErrorMessage('All prizes are sold out or expired')
      return
    }

    setErrorMessage(undefined)
  }, [allHoldings, reward])

  const handleModalClose = () => {
    hideModal()
    onClose?.()
  }

  const handleSpinSuccess = (prize?: string) => {
    setTimeout(() => {
      setPrize(prize ?? '')
      showModal(ModalType.SPIN_SUCCESS_MODAL)
    }, 2000)
  }

  return (
    <Modal
      size='full'
      isOpen={isModalShown(ModalType.SPIN_MODAL)}
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
              alt='fiero'
            />
            <Image
              src='/png/spin.png'
              width={436}
              alt='spin'
              className='mt-4'
            />
            <div className='mt-15 text-center font-knockout text-[30px] font-[800] uppercase'>
              Spin the Fiero wheel!
            </div>
            <div className='mt-[14px] text-center text-[16px] font-typewriter font-[500] opacity-60'>
              Try your luck below!
            </div>
            <div className='z-0 flex h-fit shrink-0 items-center justify-center pt-[90px] '>
              <RaffleWheel
                disabled={!!errorMessage}
                onSuccess={handleSpinSuccess}
              />
            </div>
            {errorMessage && (
              <div>
                <div className='relative z-20 mt-2 p-2 text-text-primary opacity-80'>
                  <span className='text-center text-[16px] font-typewriter'>
                    {errorMessage}
                  </span>
                </div>
                <div className='rounded-md px-2'>
                  <Link href='/contests' onClick={handleModalClose}>
                    <Text
                      variant='b1'
                      className='text-center underline text-text-primary !font-typewriter'
                    >
                      Earn more points
                    </Text>
                  </Link>
                </div>
              </div>
            )}
            {!errorMessage && (
              <div className='mt-4 text-[14px] font-[500] font-typewriter'>
                Spin to unlock rewards
              </div>
            )}
            <div className='mt-12 text-center text-[12px] font-typewriter'>
              <span className='opacity-60'>
                For full terms and conditions,{' '}
              </span>
              <Link href='/tos' target='_blank' className='underline'>
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

export default SpinModal
