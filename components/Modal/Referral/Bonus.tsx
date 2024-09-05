import React, { Fragment } from 'react'
import { toast } from 'react-toastify'
import clsx from 'clsx'
import { Dialog, Transition } from '@headlessui/react'

import Button from '@components/Button/Button'
import { CloseIcon } from '@components/Icons'
import { Text } from '@components/Text'
import { usePutClaimBonus } from '@services/api'
import { useStore } from '@store/store'
import { useTempStore } from '@store/tempStore'
import { ModalType, useModal } from 'contexts/modal'

interface BonusModalProps {
  onClose?: () => void
}

export const BonusModal: React.FC<BonusModalProps> = ({ onClose }) => {
  const { isModalShown, hideModal } = useModal()

  const user = useStore((store) => store.user)
  const setUser = useStore((store) => store.setUser)

  const setBonusShown = useTempStore(state => state.setBonusShown)

  const { mutate, isLoading } = usePutClaimBonus(user?.bonus.id, {
    onSuccess: (response) => {
      setUser(response.user)
      toast.success('Bonus claimed!')
      hideModal()
    },
    onError: () => {
      toast.error('Failed to claim bonus')
    },
  })

  const closeModal = () => {
    hideModal()
    onClose && onClose()
    setBonusShown(true)
  }

  const handleClaim = () => {
    mutate()
  }

  return (
    <Transition appear show={isModalShown(ModalType.BONUS_MODAL)} as={Fragment}>
      <Dialog as='div' className='relative z-[60]' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className={clsx(
                  'relative h-[460px] min-h-full w-[324px] transform overflow-hidden rounded-xl bg-bg-white text-left align-middle shadow-xl transition-all md:h-[580px] md:w-[484px]'
                )}
              >
                <div className='z-0 md:mt-[120px] flex flex-col items-center justify-center p-6'>
                  <button
                    className='absolute right-2 top-2'
                    onClick={closeModal}
                  >
                    <CloseIcon />
                  </button>
                  <img
                    src='/svg/check.svg'
                    className='h-[120px]'
                    alt='congrats'
                  />
                  <Text
                    variant='h4'
                    size='medium'
                    className='mt-5 text-center text-black md:mt-[36px]'
                  >
                    50 additional Tickets for you!
                  </Text>
                  <Text
                    variant='b1'
                    size='medium'
                    className='mt-2 w-full text-center text-text-black opacity-60'
                  >
                    {`Congrats! You've successfully unlocked referral bonus. Click on "Claim Referral Bonus" to claim`}
                  </Text>
                  <Button
                    className='mt-10 h-[62px] px-4'
                    onClick={handleClaim}
                    isLoading={isLoading}
                  >
                    <Text
                      variant='b3'
                      size='semibold'
                      className='text-text-white'
                    >
                      Claim Referral Bonus
                    </Text>
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default BonusModal
