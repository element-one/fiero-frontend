import React from 'react'
import QRCode from 'react-qr-code'

import Button from '@components/Button/Button'
import { Footer } from '@components/Footer/Footer'
import { Modal, ModalBody, ModalContent } from '@nextui-org/react'
import { useStore } from '@store/store'
import { ModalType, useModal } from 'contexts/modal'

interface RedeemQRCodeModalProps {
  onClose?: () => void
}

export const RedeemQRCodeModal: React.FC<RedeemQRCodeModalProps> = ({
  onClose,
}) => {
  const { isModalShown, hideModal } = useModal()

  const reward = useStore((state) => state.reward)
  const userReward = useStore((state) => state.getUserReward(reward?.id))

  const closeModal = () => {
    hideModal()
    onClose && onClose()
  }

  return (
    <Modal
      isOpen={isModalShown(ModalType.REDEEM_QR_CODE_MODAL)}
      onClose={closeModal}
      size='full'
      classNames={{
        closeButton: 'bg-bg-gray-yellow z-20',
      }}
    >
      <ModalContent>
        <ModalBody className='overflow-auto px-0 py-0 bg-bg-white'>
          <div className='relative z-0 flex h-full w-full flex-col items-center pb-10'>
            <div className='relative w-full shrink-0 overflow-hidden'>
              <img
                src={reward?.imageUrl}
                alt='fiero'
                className='max-h-[440px] w-full object-fill'
              />
              <div className='absolute bottom-[-100px] left-[-10%] h-[120px] md:h-[200px] w-[120%] rounded-[50%] bg-bg-white'></div>
            </div>
            <div className='w-full max-w-[520px] font-knockout px-6 text-center text-[38px] font-[600] text-text-black'>
              {reward?.name}
            </div>
            <div className='w-full mt-7 max-w-[520px] px-6 text-center text-[15px] font-typewriter font-[500] text-text-black opacity-60'>
              Congrats, friend! You’ve redeemed your points for a prize. Show this QR code to a Fiero rep to receive your reward.
            </div>
            <div className='my-10 w-2/3 max-w-[380px]'>
              <QRCode
                style={{
                  height: 'auto',
                  maxWidth: '100%',
                  width: '100%',
                }}
                value={`${process.env.NEXT_PUBLIC_WEB_URL}/event/redeem?qr=${userReward?.qrCode}`}
              />
            </div>
            <Button
              variant='outline'
              className='mt-5 h-[52px] w-[188px] px-6 py-5 text-[16px] font-[600]'
              onClick={closeModal}
            >
              Back to app
            </Button>

            <Footer className='md:hidden' />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default RedeemQRCodeModal
