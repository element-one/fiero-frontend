import { FC } from 'react'
import Confetti from 'react-confetti'

import Button from '@components/Button/Button'
import { ModalType, useModal } from '@contexts/modal'
import { Modal, ModalBody, ModalContent } from '@nextui-org/react'

export interface QRCodeSuccessModalProps {
  onClose?: () => void
}

const QRCodeSuccessModal: FC<QRCodeSuccessModalProps> = ({ onClose }) => {
  const { isModalShown, hideModal } = useModal()

  const handleClose = () => {
    hideModal()
    onClose?.()
  }

  return (
    <Modal
      onClose={handleClose}
      size='full'
      isOpen={isModalShown(ModalType.QRCODE_SUCCESS_MODAL)}
      className='bg-bg-gray-yellow transition-all'
      classNames={{
        closeButton: 'text-text-black bg-bg-white',
      }}
    >
      <ModalContent>
        <ModalBody>
          <Confetti className='h-full w-full' />
          <div className='mx-auto flex h-full max-w-[520px] flex-col items-center justify-between py-5'>
            <div className='mt-[120px] flex flex-col items-center justify-center gap-8'>
              <img
                src='/svg/check.svg'
                alt='checked'
                className='mt-[60px] w-[72px]'
              />
              <div className='text-center text-[30px] font-[800] uppercase text-text-white'>
                Congratulations!
                <br />
                Reward claimed
              </div>
              <div className='w-full max-w-[520px] text-center text-[16px] text-text-white opacity-90'>
                We&apos;ll follow up within the next 48 hours with more details
                on receiving this reward.
              </div>
              <div className='w-full max-w-[520px] text-center text-[16px] text-text-white opacity-90'>
                Please make sure to check your inbox for the email address
                associated with this account!
              </div>
              <Button
                onClick={handleClose}
                variant='regular'
                className='mt-[68px] h-[62px] bg-bg-primary px-6 text-[16px] font-[600] text-text-white'
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

export default QRCodeSuccessModal
