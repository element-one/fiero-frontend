import React, { Fragment, useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import clsx from 'clsx'
import { Dialog, Transition } from '@headlessui/react'
import { isTwitterVerified } from 'utils/utils'

import { CloseIcon } from '@components/Icons'
import { Text } from '@components/Text'
import LinkText from '@components/Text/LinkText'
import { usePutEarnComplete } from '@services/api/index'
import { useStore } from '@store/store'
import { ModalType, useModal } from 'contexts/modal'

import LockCard from '../LockCard/LockCard'

import TwitterConnect from './TwitterConnect'
import TwitterTask from './TwitterTask'

interface TwitterQuestModalProps {
  onClose?: () => void
  onClick?: () => void
}

export const TwitterQuestModal: React.FC<TwitterQuestModalProps> = ({
  onClose,
}) => {
  const { isModalShown, hideModal, showModal } = useModal()

  const user = useStore((state) => state.user)
  const setUser = useStore((state) => state.setUser)
  const earn = useStore((state) => state.earn)
  const { earnSocial } = earn || {}
  const removeEarn = useStore((state) => state.removeEarn)
  const setUserEarn = useStore((state) => state.setUserEarn)
  const { isCompleted } = useStore((state) => state.getUserEarn(earn?.id)) || {}
  const [isPending, setIsPending] = useState(false)

  const isTwitterConnected = isTwitterVerified(user)

  const { mutate: completeEarn } = usePutEarnComplete(earn?.id, {
    onSuccess: (response) => {
      setUserEarn(response.userEarn)
      setUser(response.userEarn?.user)

      hideModal()
      showModal(ModalType.CLAIM_REWARDS_MODAL)
    },
    onError: (err) => {
      console.error(err)
      toast.error('Complete challenge failed')
    },
  })

  const closeModal = () => {
    removeEarn()
    hideModal()
    onClose && onClose()
  }

  const handleComplete = useCallback(async () => {
    setIsPending(false)
    completeEarn({ earnId: earn?.id })
  }, [completeEarn, earn?.id])

  const handleCompleted = useCallback(() => {
    if (isTwitterConnected) {
      setIsPending(true)
      setTimeout(handleComplete, 5000)
    }
  }, [handleComplete, isTwitterConnected])

  return (
    <Transition
      appear
      show={isModalShown(ModalType.TWITTER_CHALLENGE_MODAL)}
      as={Fragment}
    >
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
              <Dialog.Panel className='relative mt-0 min-h-screen w-full max-w-[1000px] rounded-lg transform overflow-hidden bg-bg-gray-yellow text-left align-middle transition-all md:min-h-fit'>
                <div className='z-0 pt-6 md:pt-14'>
                  <button
                    className='absolute right-3 top-4 text-text-black md:right-8'
                    onClick={closeModal}
                  >
                    <CloseIcon />
                  </button>
                  <div className='h-fit min-h-[calc(100vh-24px)] md:min-h-fit flex flex-col justify-between'>
                    <div className='t-4 flex w-full flex-col items-center justify-center'>
                      <div className='w-[180px] md:mr-4 md:w-[220px] border-[12px] overflow-hidden rounded-tl-full rounded-tr-full border-border-white'>
                        <img
                          src={earn?.badge?.imageUrl}
                          className='h-full w-full object-cover'
                          alt='badge'
                        />
                      </div>
                      <div className='mt-5 flex flex-1 flex-col items-center px-4'>
                        <Text
                          variant='h4'
                          className='text-center uppercase text-text-black'
                        >
                          <span className='text-[20px] font-[600]'>
                            {earn?.name}
                          </span>
                        </Text>
                        <LinkText
                          variant='b1'
                          className='mt-2 w-full max-w-[520px] text-center text-text-black opacity-60'
                        >
                          {earn?.description}
                        </LinkText>
                        <div className='mb-2 mt-8 flex flex-row items-center justify-between rounded-full bg-bg-light px-4 py-3 md:mb-4 md:mt-10'>
                          <div className='flex flex-row items-center'>
                            <img
                              src='/svg/crown.svg'
                              className='h-[24px] w-[24px] object-fill'
                              alt='rewards'
                            />
                            <Text
                              variant='b3'
                              className='ml-1 mr-3 text-text-black md:mr-3 opacity-60'
                            >
                              Rewards
                            </Text>
                          </div>
                          <Text
                            variant='b3'
                            className='mr-1 text-right text-text-black font-semibold'
                          >
                            {earn?.points} Points
                          </Text>
                        </div>
                      </div>
                    </div>

                    <div className={
                      clsx(
                        'flex justify-center w-full overflow-hidden mt-4',
                        isTwitterConnected ? 'h-[380px]' : 'h-[680px]'
                      )
                    }>
                      <div className='bg-bg-white rounded-full w-[2048px] pb-6 shrink-0 h-[2048px] flex items-center flex-col'>
                        {!isTwitterConnected ? (
                          <>
                            <TwitterConnect className='my-6' user={user} />
                            <LockCard
                              title='You need to connect with Twitter in order to join this challenge'
                              social='twitter'
                              className=''
                            />
                          </>
                        ) : (
                          <>
                            <div className='md:mt-4'>
                              <TwitterTask
                                social={earnSocial}
                                isCompleted={isCompleted}
                                onComplete={handleCompleted}
                              />
                            </div>
                            {isPending && (
                              <div className='mx-auto mt-2 flex w-full max-w-[520px] flex-col items-center justify-center text-center md:items-end'>
                                <Text
                                  variant='b1'
                                  size='normal'
                                  className='text-center text-neutral-300 md:ml-2'
                                >
                                  Pause for a sip!
                                </Text>
                                <Text
                                  variant='b1'
                                  size='normal'
                                  className='ml-2 text-neutral-300'
                                >
                                  {`Based on Twitter's guidelines, your post can take up
                            to 10 seconds to verify.`}
                                </Text>
                              </div>
                            )}
                            {!isPending && (
                              <div className='text-center text-[14px] font-[500]'>
                                <span className='text-text-black opacity-40'>
                                  For full posting terms and conditions,
                                </span>
                                <a
                                  href='/tos'
                                  target='_blank'
                                  className='text-text-primary'
                                >
                                  click here.
                                </a>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition >
  )
}

export default TwitterQuestModal
