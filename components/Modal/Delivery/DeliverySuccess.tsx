import React from 'react'

import Button from '@components/Button/Button'
import { Text } from '@components/Text'
import { Modal, ModalBody, ModalContent } from '@nextui-org/react'
import { ModalType, useModal } from 'contexts/modal'

interface CongratsShippingModalProps {
  onClose?: () => void
}

export const CongratsShippingModal: React.FC<CongratsShippingModalProps> = ({
  onClose,
}) => {
  const { isModalShown, hideModal, showModal } = useModal()

  const closeModal = () => {
    hideModal()
    onClose && onClose()
  }

  const handleDeliveryInfo = () => {
    closeModal()
    showModal(ModalType.DELIVERY_INFO_MODAL)
  }

  return (
    <Modal
      isOpen={isModalShown(ModalType.DELIVERY_SUCCESS_MODAL)}
      onClose={closeModal}
      classNames={{
        closeButton: 'z-20 bg-bg-white',
      }}
    >
      <ModalContent>
        <ModalBody className='overflow-y-auto'>
          <div className='z-0 flex flex-col items-center justify-center p-6 font-typewriter'>
            <img
              src='/svg/check.svg'
              className='mt-4 h-[72px] w-[72px] md:mt-10 '
              alt='congrats'
            />
            <Text
              variant='h12'
              size='semibold'
              className='mt-5 text-center font-knockout text-text-black md:mt-[44px]'
            >
              Congrats!
            </Text>
            <Text
              variant='h23'
              size='normal'
              className='mt-[10px] text-center text-text-black opacity-60 md:px-10'
            >
              Please share your shipping address to receive your reward!
            </Text>
            <Button
              className='mt-10 h-[62px] px-5 text-[16px] font-[800]'
              onClick={handleDeliveryInfo}
            >
              Add Your Shipping Address
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CongratsShippingModal
