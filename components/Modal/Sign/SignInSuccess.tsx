import { FC } from 'react'
import Confetti from 'react-confetti'
import { useRouter } from 'next/router'

import Button from '@components/Button/Button'
import { Footer } from '@components/Footer/Footer'
import { ModalType, useModal } from '@contexts/modal'
import { Image, Modal, ModalBody, ModalContent } from '@nextui-org/react'

export interface SignInSuccessModalProps {
  onClose?: () => void
}

const SignInSuccessModal: FC<SignInSuccessModalProps> = ({ onClose }) => {
  const { hideModal, isModalShown } = useModal()
  const router = useRouter()

  const handleModalClose = () => {
    hideModal()
    onClose?.()
  }

  const handleStartButtonClick = () => {
    handleModalClose()
    router.push('/')
  }

  return (
    <Modal
      isOpen={isModalShown(ModalType.SIGN_IN_SUCCESS_MODAL)}
      backdrop='blur'
      disableAnimation
      placement='center'
      onClose={handleModalClose}
      size='full'
    >
      <ModalContent>
        <ModalBody className='flex h-full w-full items-center justify-between overflow-y-auto'>
          <Confetti className='h-full w-full' />
          <div className='flex flex-col items-center justify-center pt-7 md:pt-[80px]'>
            <Image
              src='/png/sign_up_success.png'
              alt='sign up success'
              width={188}
              height={394}
            />
            <div className='mb-7 md:mb-[56px] mt-4 uppercase leading-[48px] max-w-[306px] font-knockout text-center text-[42px] font-semibold text-text-black md:max-w-[520px]'>
              Congrats,
              <br />
              you’re in!
            </div>
            <Button
              onClick={handleStartButtonClick}
              className='h-[62px] px-6 text-[18px] w-[245px]'
            >
              Start Earning
            </Button>
          </div>
          <Footer />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SignInSuccessModal
