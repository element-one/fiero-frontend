import { FC } from 'react'
import Confetti from 'react-confetti'
import Link from 'next/link'

import Button from '@components/Button/Button'
import { ModalType, useModal } from '@contexts/modal'
import { Image, Modal, ModalBody, ModalContent } from '@nextui-org/react'

export interface RaffleSuccessModalProps {
  onClose?: () => void
}

const RaffleSuccessModal: FC<RaffleSuccessModalProps> = ({ onClose }) => {
  const { isModalShown, hideModal } = useModal()

  const handleModalClose = () => {
    hideModal()
    onClose?.()
  }

  return (
    <Modal
      size='full'
      isOpen={isModalShown(ModalType.RAFFLE_SUCCESS_MODAL)}
      onClose={handleModalClose}
      className='bg-bg-gray-yellow'
      classNames={{
        closeButton: 'text-text-black',
      }}
    >
      <ModalContent>
        <ModalBody className='h-full overflow-auto'>
          <Confetti className='h-full w-full' />
          <div className='mx-auto flex h-full max-w-[520px] flex-col items-center justify-between py-5'>
            <Image
              src='/png/raffle_entered.png'
              width={475}
              alt='raffle'
              className='mt-[60px]'
            />
            <div className='text-center text-[30px] font-[600] text-text-black font-knockout'>
              Raffle entered!
            </div>
            <div className='mt-[16px] text-center text-[16px] font-[500] text-text-black font-typewriter'>
              <span className='opacity-60'>
                We&apos;ll announce winners and notify all participants by email
                on{' '}
              </span>
              <span className='font-[600]'>June 1, 2024</span>
              <span className='opacity-60'>. Stay tuned!</span>
            </div>
            <Button
              onClick={() => hideModal()}
              variant='outline'
              className='mt-6 border-border-primary font-[800] text-text-primary'
            >
              Back to app
            </Button>
            <div className='mt-[73px] text-center text-[12px] text-text-black font-typewriter'>
              <span className='opacity-60'>For Terms and Conditions, </span>
              <Link href='/tos' target='_blank' className='text-text-primary underline'>
                click here
              </Link>
              <span className='opacity-60'>, and for Contest Rules,</span>
              <span className='text-text-primary underline'>click here</span>
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

export default RaffleSuccessModal
