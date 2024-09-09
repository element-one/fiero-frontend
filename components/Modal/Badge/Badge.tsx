import { Fragment } from 'react'
import Confetti from 'react-confetti'
import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'

import Button from '@components/Button/Button'
import { Text } from '@components/Text'
import { ModalType, useModal } from '@contexts/modal'
import { useStore } from '@store/store'

interface BadgeModalProps {
  onClose?: () => void
}

export const BadgeModal: React.FC<BadgeModalProps> = ({ onClose }) => {
  const { isModalShown, hideModal } = useModal()
  const router = useRouter()

  const earn = useStore((state) => state.earn)

  const closeModal = async () => {
    hideModal()
    onClose && onClose()
  }

  const handleBackToHome = () => {
    closeModal()
  }

  const handleGoToContests = () => {
    if (router.pathname.includes('/event')) {
      router.push(`${router.query.slug}?tab=redeem`)
      closeModal()
    } else {
      closeModal()
      router.push('/prizes')
    }
  }

  return (
    <Transition appear show={isModalShown(ModalType.BADGE_MODAL)} as={Fragment}>
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
          <div className='flex min-h-full items-center justify-center bg-bg-white text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='flex min-h-screen w-full transform items-center justify-center overflow-hidden bg-bg-white transition-all'>
                <Confetti className='h-full w-full' />
                <div className='flex h-full mb-6 w-full flex-col items-center justify-center'>
                  <div className='mt-[30px] flex w-full max-w-[80%] uppercase border-[12px] border-border-white rounded-tl-full overflow-hidden rounded-tr-full flex-col items-center md:mt-[36px] md:max-w-[420px]'>
                    <img
                      src={`${earn?.badge.imageUrl}`}
                      className='w-full object-fill'
                      alt='badge'
                    />

                    <div className='py-5 text-center font-typewriter uppercase text-text-white w-full bg-bg-primary'>
                      {earn?.points} points for you!
                    </div>
                  </div>
                  <div className='mt-[60px] flex w-full flex-col items-center justify-center px-6 md:w-[520px]'>
                    <div className='text-[36px] uppercase font-knockout font-[800] leading-8 text-text-black'>
                      Congrats, friend!
                    </div>
                    <Text variant='sm' className='mt-4 text-text-black font-typewriter'>
                      {earn?.name}
                    </Text>
                    <div className='mt-[14px] text-[16px] font-normal leading-5 font-typewriter text-text-black opacity-80'>
                      Your badge and tokens have been added to your profile.
                      Check out the Redeem page to use your tokens to unlock
                      exciting rewards and experiences!
                    </div>
                  </div>

                  <div className='mt-20 flex space-x-4'>
                    <Button
                      variant='outline'
                      className='h-[52px] w-[180px] border-border-primary'
                      onClick={handleBackToHome}
                    >
                      <Text variant='b1' className='text-text-primary font-semibold'>
                        Earn More Points
                      </Text>
                    </Button>

                    <Button
                      variant='outline'
                      className='h-[52px] w-[180px] border-border-primary bg-bg-primary'
                      onClick={handleGoToContests}
                    >
                      <Text
                        variant='b1'
                        className='font-semibold text-text-white'
                      >
                        Redeem Points
                      </Text>
                    </Button>
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

export default BadgeModal
