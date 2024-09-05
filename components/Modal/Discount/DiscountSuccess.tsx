import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useCopyToClipboard } from 'react-use'

import Button from '@components/Button/Button'
import { Footer } from '@components/Footer/Footer'
import { Text } from '@components/Text'
import { Modal, ModalBody, ModalContent } from '@nextui-org/react'
import { useStore } from '@store/store'
import { ModalType, useModal } from 'contexts/modal'

interface DiscountSuccessModalProps {
  onClose?: () => void
}

export const DiscountSuccessModal: React.FC<DiscountSuccessModalProps> = ({
  onClose,
}) => {
  const [text, setText] = React.useState('')
  const [, copyToClipboard] = useCopyToClipboard()

  const { isModalShown, hideModal } = useModal()

  const reward = useStore((state) => state.reward)
  const removeReward = useStore((state) => state.removeReward)
  const getUserReward = useStore((state) => state.getUserReward)
  const userReward = getUserReward(reward?.id)

  const closeModal = () => {
    removeReward()
    hideModal()
    onClose && onClose()
  }

  const handleCopy = () => {
    copyToClipboard(text)
    toast.success('copied!')
  }

  const handleBack = () => {
    closeModal()
  }

  useEffect(() => {
    if (userReward?.discount) {
      setText(userReward.discount?.code)
    }
  }, [userReward])

  return (
    <Modal
      isOpen={isModalShown(ModalType.DISCOUNT_SUCCESS_MODAL)}
      size='full'
      onClose={closeModal}
      className='bg-bg-gray-yellow'
      classNames={{
        closeButton: 'z-20 bg-bg-gray-yellow',
      }}
    >
      <ModalContent>
        <ModalBody>
          <div className='fixed inset-0 overflow-y-auto h-fit min-h-full flex flex-col justify-between items-center pb-4 bg-bg-gray-yellow'>
            <div className='relative z-0 flex w-full transform flex-col items-center overflow-hidden bg-bg-gray-yellow text-left align-middle transition-all'>
              <div className='relative h-fit max-h-[440px] min-h-[200px] w-full overflow-hidden'>
                <img src={reward?.imageUrl} className='w-full' alt='congrats' />
                <div className='absolute bottom-[-100px] left-[-10%] h-[200px] w-[120%] rounded-[50%] bg-bg-gray-yellow'></div>
              </div>
              <span className='z-20 mt-[-40px] w-full text-center text-[30px] font-[600] text-text-black md:mt-[36px]'>
                {reward?.name}
              </span>
              <Text
                variant='b1'
                className='mt-6 w-full text-center text-text-black'
              >
                Congrats, friend! You’ve redeemed your
                <br />
                points for a reward.
                <br />
                Please find your discount code below!
              </Text>
              <div className='mt-12 flex w-[266px] flex-row items-center justify-between rounded-full bg-bg-white pr-4 pl-6 py-[14px] md:w-[298px]'>
                <Text
                  variant='h4'
                  className='text-center font-[500] text-text-black text-[22px]'
                >
                  {userReward?.discount?.code}
                </Text>
                <Button className='p-[10px] uppercase' onClick={handleCopy}>
                  <img
                    src='/img/duplicate.svg'
                    alt='duplicate'
                    className='h-6 w-6'
                  />
                  copy
                </Button>
              </div>
              <div className='mt-4 text-text-black opacity-60 text-[14px]'>
                Don’t worry, we’ll also send a copy to your email!
              </div>
              <div className='mt-[56px] flex w-[266px] flex-row items-center justify-center md:w-[298px]'>
                <Button
                  className='border-[1px] border-border-primary px-6 text-[16px] font-[600] w-[188px] h-[52px]'
                  variant='outline'
                  onClick={handleBack}
                >
                  Back to app
                </Button>
              </div>
            </div>

            <Footer className="md:hidden" />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default DiscountSuccessModal
