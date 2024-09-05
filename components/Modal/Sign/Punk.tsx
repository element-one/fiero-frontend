import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { Dialog, Transition } from '@headlessui/react'

import Button from '@components/Button/Button'
import { Text } from '@components/Text'
import { ModalType, useModal } from '@contexts/modal'

const SlideButton = dynamic(() => import('react-slide-button'), {
  ssr: false,
})

interface PunkModalProps {
  onClose?: () => void
}

export const PunkModal: React.FC<PunkModalProps> = ({ onClose }) => {
  const { isModalShown, hideModal, showModal } = useModal()

  const handleEnter = () => {
    closeModal()
    showModal(ModalType.REDEEM_REWARD_MODAL)
  }

  const closeModal = async () => {
    hideModal()
    onClose && onClose()
  }

  return (
    <Transition appear show={isModalShown(ModalType.PUNK_MODAL)} as={Fragment}>
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
          <div className='flex min-h-full items-center justify-center bg-black p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='flex min-h-screen w-full transform items-center justify-center overflow-hidden rounded-xl shadow-xl transition-all'>
                <div className='flex h-full w-full flex-col items-center justify-start'>
                  <button
                    className='absolute right-0 top-[10px] md:right-8 md:top-1'
                    onClick={closeModal}
                  >
                    <img
                      src='/img/close.png'
                      className='h-[40px] w-[40px] rounded-full object-fill md:h-20 md:w-20'
                      alt='confetti'
                    />
                  </button>
                  <img
                    src='/img/glass_white.svg'
                    className='flex h-[64px] md:hidden'
                    alt='glass'
                  />
                  <img
                    src='/img/punk.png'
                    className='w-[290px] md:w-[380px]'
                    alt='reward'
                  />
                  <div className='mt-[10px] w-full text-center text-white'>
                    <Text className='text-[24px]' size='bold'>
                      Cheers to a very merry
                    </Text>
                    <Text className='text-[24px]' size='bold'>
                      Punxmas!
                    </Text>
                  </div>
                  <Text
                    variant='h3'
                    size='normal'
                    className='mt-[10px] w-[220px] text-center text-white/[0.8] md:w-full'
                  >
                    Try your luck below!
                  </Text>
                  <Button
                    onClick={handleEnter}
                    className='mt-[28px] hidden h-[56px] w-[276px] md:flex'
                  >
                    <Text variant='b1' className='font-semibold text-text-icon'>
                      Enter to Unlock
                    </Text>
                  </Button>
                  <div className='mt-4 flex flex-col items-center justify-center md:hidden'>
                    <SlideButton
                      mainText={
                        <span className='text-white'>Slide to unlock</span>
                      }
                      classList='custom-slide'
                      caretClassList='custom-caret-list'
                      overlayClassList='custom-overlay-class'
                      customCaretWidth={50}
                      overlayText=''
                      caret={<img src='/img/ic_right.svg' alt='right' />}
                      onSlideDone={() => {
                        handleEnter()
                      }}
                    />
                    <Text
                      variant='b1'
                      className='mt-4 text-[14px] font-normal text-white/[.8]'
                    >
                      Slide to unlock rewards
                    </Text>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default PunkModal
