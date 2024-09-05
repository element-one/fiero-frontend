import React from 'react'
import Confetti from 'react-confetti'

import Button from '@components/Button/Button'
import { Modal, ModalBody, ModalContent } from '@nextui-org/react'
import { ModalType, useModal } from 'contexts/modal'

interface DeliveryCongratsProps {
  onClose?: () => void
}

export const DeliveryCongratsModal: React.FC<DeliveryCongratsProps> = ({
  onClose,
}) => {
  const { isModalShown, hideModal } = useModal()

  const closeModal = () => {
    hideModal()
    onClose && onClose()
  }

  return (
    <Modal
      onClose={closeModal}
      size='full'
      isOpen={isModalShown(ModalType.DELIVERY_CONGRATS_MODAL)}
      className='bg-bg-gray-yellow  transition-all]'
      classNames={{
        closeButton: 'text-text-black bg-bg-white',
      }}
    >
      <ModalContent>
        <ModalBody>
          <Confetti className='h-full w-full' />
          <div className='mx-auto flex h-full max-w-[520px] flex-col items-center justify-center py-5'>
            <div className='mt-[120px] flex flex-col items-center justify-center gap-8'>
              <img
                src='/svg/check.svg'
                alt='checked'
                className='mt-[60px] w-[72px]'
              />
              <div className='text-center text-[30px] font-[600] uppercase text-text-black'>
                Congrats!
              </div>
              <div className='w-full max-w-[520px] text-center text-[16px] text-text-black opacity-90'>
                Your merch is on the way
              </div>
              <div className='w-full max-w-[520px] text-center text-[16px] text-text-black opacity-90'>
                Brands handle their own shipping and usually take up to 14 days
                to process. Please reach out to{' '}
                <a href='mailto:support@glass.fun' className='text-text-primary'>
                  support@glass.fun
                </a>{' '}
                if you {`haven’t`} received your merch for more than 2 weeks. We
                appreciate your patience.
              </div>
              <Button
                onClick={closeModal}
                variant='regular'
                className='mt-[68px] h-[52px] bg-bg-primary px-6 text-[16px] font-[600] text-text-white'
              >
                Back to app
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default DeliveryCongratsModal
