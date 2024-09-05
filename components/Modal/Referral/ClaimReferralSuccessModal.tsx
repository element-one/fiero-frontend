import { FC } from 'react'

import Button from '@components/Button/Button'
import { ModalType, useModal } from '@contexts/modal'
import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react'

export interface ClaimReferralSuccessModalProps {
  onClose?: () => void
}

const ClaimReferralSuccessModal: FC<ClaimReferralSuccessModalProps> = ({
  onClose,
}) => {
  const { hideModal, isModalShown } = useModal()

  const handleClose = () => {
    hideModal()
    onClose?.()
  }

  return (
    <Modal
      size='full'
      onClose={handleClose}
      isOpen={isModalShown(ModalType.CLAIM_REFERRAL_SUCCESS_MODAL)}
    >
      <ModalContent className='bg-bg-white text-text-black'>
        <ModalHeader></ModalHeader>
        <ModalBody className='mb-20 flex flex-col items-center justify-center'>
          <Image
            src='/svg/check.svg'
            alt='claim referral success'
            width={180}
            height={180}
          />
          <div className='text-center text-[24px] font-bold md:text-[34px] mb-6'>
            Referral rewards claimed
          </div>
          <Button onClick={handleClose} variant='outline'>
            Back
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ClaimReferralSuccessModal
