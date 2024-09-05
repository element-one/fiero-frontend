import React, { useState } from 'react'

import { Footer } from '@components/Footer/Footer'
import PinForm from '@components/Login/PinForm'
import SignupForm from '@components/Login/SignupForm'
import { ModalType, useModal } from '@contexts/modal'
import { Modal, ModalBody, ModalContent } from '@nextui-org/react'

interface SignInModalProps {
  onClose?: () => void
}

export const SignInModal: React.FC<SignInModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [isSentCode, setIsSentCode] = useState(false)
  const { isModalShown, hideModal } = useModal()

  const handleSentCode = (email: string) => {
    setEmail(email)
    setIsSentCode(true)
  }

  const closeModal = () => {
    hideModal()
    onClose && onClose()
  }

  return (
    <Modal
      isOpen={isModalShown(ModalType.SIGN_IN_MODAL)}
      onClose={closeModal}
      classNames={{
        closeButton: 'z-20',
      }}
      size='full'
      placement='center'
    >
      <ModalContent>
        <ModalBody className='overflow-y-auto p-0'>
          <div className='flex h-fit min-h-full w-full shrink-0 flex-col items-center justify-center rounded-xl bg-bg-white py-10 text-text-black md:px-10'>
            {!isSentCode && (
              <SignupForm isLoginHide={true} onSuccess={handleSentCode} />
            )}
            {isSentCode && (
              <PinForm
                isLoginHide={true}
                email={email}
                onBack={() => setIsSentCode(false)}
              />
            )}
            <Footer />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SignInModal
