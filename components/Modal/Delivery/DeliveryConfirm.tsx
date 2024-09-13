import React from 'react'
import { toast } from 'react-toastify'

import Button from '@components/Button/Button'
import { Text } from '@components/Text'
import { Modal, ModalBody, ModalContent } from '@nextui-org/react'
import { usePostAddDelivery } from '@services/api'
import { useStore } from '@store/store'
import { ModalType, useModal } from 'contexts/modal'

interface DeliveryConfirmModalProps {
  onClose?: () => void
}

export const DeliveryConfirmModal: React.FC<DeliveryConfirmModalProps> = ({
  onClose,
}) => {
  const { isModalShown, hideModal, showModal } = useModal()

  const reward = useStore((state) => state.reward)
  const delivery = useStore((state) => state.delivery)
  const removeDelivery = useStore((state) => state.removeDelivery)
  const setUserReward = useStore((state) => state.setUserReward)

  const deliveryAddress = `${delivery?.address}`
  const deliveryState = `${delivery?.city} ${delivery?.state} ${delivery?.zipCode}`

  const { mutate: addDelivery, isLoading } = usePostAddDelivery(reward?.id, {
    onSuccess: (response) => {
      setUserReward(response.userReward)
      hideModal()
      showModal(ModalType.DELIVERY_CONGRATS_MODAL)
      removeDelivery()
    },
    onError: (err) => {
      console.error(err)
      toast.error('Add delivery failed')
    },
  })

  const closeModal = () => {
    hideModal()
    onClose && onClose()
  }

  const handleConfirm = () => {
    if (delivery && reward) {
      addDelivery({
        rewardId: reward.id,
        payload: {
          firstName: delivery.firstName,
          lastName: delivery.lastName,
          address: delivery.address,
          city: delivery.city,
          state: delivery.state,
          zipCode: delivery.zipCode,
        },
      })
    }
  }

  const handleCancel = () => {
    hideModal()
    showModal(ModalType.DELIVERY_INFO_MODAL)
  }

  return (
    <Modal
      isOpen={isModalShown(ModalType.DELIVERY_CONFIRM_MODAL)}
      onClose={closeModal}
      size='lg'
      classNames={{
        closeButton: 'bg-bg-white z-20',
      }}
    >
      <ModalContent>
        <ModalBody className='overflow-y-auto px-0 font-typewriter'>
          <div className='relative flex w-full flex-col items-center justify-center bg-bg-white pb-10'>
            <Text
              variant='h1s'
              size='semibold'
              className='mt-5 text-center font-knockout text-text-black md:mt-[36px]'
            >
              Did you mean?
            </Text>
            <div className='mt-[30px] flex flex-row items-center justify-start space-x-4 md:mt-[52px]'>
              <img
                src='/img/location.svg'
                className='h-[54px] w-[54px] object-cover'
                alt='location'
              />
              <div className='flex flex-col'>
                <Text variant='h2s' size='medium' className='text-text-orange'>
                  {deliveryAddress}
                </Text>
                <Text variant='h2s' size='medium' className='text-text-orange'>
                  {deliveryState}
                </Text>
              </div>
            </div>
            <Button
              className='mt-10 h-[62px] w-[260px] py-4 text-[16px] font-[800] md:mt-[60px] md:w-[323px]'
              onClick={handleConfirm}
              isLoading={isLoading}
            >
              Yes, confirm
            </Button>
            <Button
              className='h--[62px] mt-5 w-[260px] py-4 text-[16px] font-[800] md:mt-6 md:w-[323px]'
              variant='outline'
              onClick={handleCancel}
            >
              No
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default DeliveryConfirmModal
