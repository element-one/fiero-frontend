import { FC } from 'react'
import Confetti from 'react-confetti'

import Button from '@components/Button/Button'
import { ModalType, useModal } from '@contexts/modal'
import { Image, Modal, ModalBody, ModalContent } from '@nextui-org/react'
import { useStore } from '@store/store'

export interface SpinClaimedModalProps {
  onClose?: () => void
}

const SpinClaimedModal: FC<SpinClaimedModalProps> = ({ onClose }) => {
  const { isModalShown, hideModal } = useModal()
  const reward = useStore((state) => state.reward)

  const handleModalClose = () => {
    hideModal()
    onClose?.()
  }

  const handleContinue = async () => {
    if (!reward?.id) {
      return
    }

    hideModal()
  }

  return (
    <Modal
      size='full'
      isOpen={isModalShown(ModalType.SPIN_CLAIMED_MODAL)}
      onClose={handleModalClose}
      className='bg-bg-gray-yellow transition-all'
      classNames={{
        closeButton: 'text-text-black',
      }}
    >
      <ModalContent>
        <ModalBody className='h-full overflow-auto'>
          <Confetti className='h-full w-full' />
          <div className='mx-auto flex h-full max-w-[520px] flex-col items-center justify-between py-5'>
            <div className='mt-[120px] flex flex-col items-center justify-center gap-8'>
              <Image
                src='/svg/check.svg'
                width={72}
                alt='checked'
                className='mt-[60px]'
              />
              <div className='text-center text-[30px] font-[600] text-text-black'>
                Successfully
                <br />
                redeemed
              </div>
              <Button
                onClick={handleContinue}
                variant='regular'
                className='mt-[68px] h-[52px] bg-bg-primary px-6 text-[16px] font-[600] text-text-white'
              >
                Back To Home
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SpinClaimedModal
