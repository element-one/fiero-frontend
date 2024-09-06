import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import Button from '@components/Button/Button'
import { Text } from '@components/Text'
import { useStore } from '@store/store'

interface AgeVerificationModalProps {
  onClose?: () => void
}

export const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({
  onClose,
}) => {
  const setAgeVerified = useStore((state) => state.setAgeVerified)

  const [isOpen, setIsOpen] = useState(true)
  const [notOldEnough, setNotOldEnough] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
    onClose && onClose()
  }

  const handleNo = () => {
    setNotOldEnough(true)
  }

  const handleYes = () => {
    setAgeVerified(true)
    closeModal()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-[60]' onClose={() => null}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 backdrop-blur-sm bg-bg-black bg-opacity-50' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
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
                className='fixed flex transform flex-col items-center bg-bg-white justify-center 
                  overflow-hidden rounded-xl p-6 
                  text-left align-middle shadow-xl transition-all'
              >
                <div className='mb-[50px] mt-4 flex flex-col items-center justify-center'>
                  <div className='mt-4 flex flex-col items-center'>
                    <span className='whitespace-nowrap font-typewriter text-[30px] leading-[45px] font-[800] text-center text-text-black'>
                      Are you of  legal drinking age
                      <br />
                      in the US?
                    </span>
                  </div>

                  <div className='mt-8 flex items-center justify-center gap-2'>
                    <Button
                      className='h-[52px] w-[175px] border-border-primary font-[800]'
                      onClick={handleYes}
                    >
                      <Text variant='b1'>YES</Text>
                    </Button>
                    <Button
                      variant='outline'
                      className='h-[52px] w-[175px] border-border-primary font-[800]'
                      onClick={handleNo}
                    >
                      <Text variant='b1' className='text-text-primary'>
                        NO
                      </Text>
                    </Button>
                  </div>
                  {notOldEnough && (
                    <div className='mt-6 text-b1 font-typewriter text-text-pink'>
                      You are not old enough to view this content
                    </div>
                  )}
                  <div className='mt-8 font-typewriter text-center text-[21px] leading-[32px] text-text-black opacity-80'>
                    By entering this site you agreeing to the Terms of
                    <br />
                    Use and Privacy Policy
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

export default AgeVerificationModal
