import { Fragment } from 'react'
import { type HTMLAttributes } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { ModalType, useModal } from '@contexts/modal'

interface TipModalProps extends HTMLAttributes<HTMLDivElement> {
  onClose?: () => void
  isEarn?: boolean
}

export const TipModal: React.FC<TipModalProps> = ({ isEarn }) => {
  const { isModalShown, hideModal } = useModal()

  const closeModal = () => {
    hideModal()
  }

  const handleClose = () => {
    closeModal()
  }

  return (
    <Transition appear show={isModalShown(ModalType.TIP_MODAL)} as={Fragment}>
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
          <div className='fixed inset-0 bg-black bg-opacity-60' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center px-4'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='relative mt-16 min-h-fit w-full max-w-[1000px] transform overflow-hidden rounded-xl bg-neutral-800 p-[1px] text-left align-middle shadow-xl transition-all md:mt-0'>
                <div className='flex h-full w-full rounded-xl bg-black p-[1px]'>
                  <div className='bg-modal1 flex h-full w-full rounded-xl'>
                    <button
                      className='absolute right-3 top-4 md:right-8'
                      onClick={handleClose}
                    >
                      <img
                        src={'/img/icon_x.png'}
                        className='h-[32px] w-[32px] object-cover'
                        alt='close'
                      />
                    </button>
                    <div className='mt-2 w-full rounded-xl'>
                      <div className='h-full w-full rounded-xl'>
                        <div className='ml-0 flex h-full w-full grow flex-col justify-between rounded-xl p-4'>
                          {isEarn ? (
                            <>
                              <div className='mb-3 line-clamp-1 text-base font-bold text-text-primary'>
                                How do I earn tickets on GLASS?
                              </div>
                              <div className='text-[14px] font-normal text-text-secondary'>
                                Click on the ‘Challenge’ cards below to engage
                                in activities and earn tickets. Take surveys,
                                try new drinks, share photos of your social
                                experiences, and more. Some challenges have a
                                pre-requisite, such as connecting your Instagram
                                profile.
                              </div>
                            </>
                          ) : (
                            <>
                              <div className='mb-3 line-clamp-1 text-base font-bold text-text-primary'>
                                How do I redeem tickets on Harpoon?
                              </div>
                              <div className='text-[14px] font-normal text-text-secondary'>
                                Click on the ‘Reward’ cards below to learn more
                                about the rewards on offer, and how many tickets
                                you need to unlock them. You can see how many
                                tickets you’ve earned any time on your profile
                                page. Please note that based on national and
                                state regulations, not all rewards may be
                                available in all geographies.
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
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

export default TipModal
