import React, { Fragment, useState } from 'react'
import { toast } from 'react-toastify'
import { Dialog, Transition } from '@headlessui/react'
import * as _ from 'lodash'

import { Text } from '@components/Text'
import LinkText from '@components/Text/LinkText'
import { useAuth } from '@contexts/auth'
import { ModalType, useModal } from '@contexts/modal'
import { useStore } from '@store/store'
import { ApiReading, ApiUserEarn } from '@type/api'
import { isPastDate } from '@utils/utils'

import ReadingSelect from './ReadingSelect'
import ReadingTask from './ReadingTask'

interface ReadingQuestModalProps {
  onClose?: () => void
  onClick?: () => void
}

export const ReadingQuestModal: React.FC<ReadingQuestModalProps> = ({
  onClose,
}) => {
  const { isAuthenticated } = useAuth()
  const { isModalShown, hideModal, showModal } = useModal()
  const [selectedReading, setSelectedReading] = useState<
    ApiReading | undefined
  >(undefined)
  const [readIndex, setReadIndex] = useState<number>(0)

  const earn = useStore((state) => state.earn)
  const readings = _.orderBy(earn?.earnReadings, 'order') || []
  const removeEarn = useStore((state) => state.removeEarn)
  const setUserEarn = useStore((state) => state.setUserEarn)
  const setUser = useStore((state) => state.setUser)

  const totalReadings = readings?.length || 0

  const { isCompleted } = useStore((state) => state.getUserEarn(earn?.id)) || {}

  const closeModal = () => {
    removeEarn()
    hideModal()
    onClose && onClose()
  }

  const handleSelect = (reading: ApiReading) => {
    if (earn?.expiredAt && isPastDate(earn.expiredAt)) {
      toast.error('Challenge expired')
      return
    }

    if (!isAuthenticated) {
      showModal(ModalType.SIGN_IN_MODAL)
      return
    }

    setSelectedReading(reading)
  }

  const handleComplete = (userEarn: ApiUserEarn) => {
    setReadIndex(0)
    setSelectedReading(undefined)
    setUserEarn(userEarn)
    setUser(userEarn?.user)

    hideModal()
    showModal(ModalType.CLAIM_REWARDS_MODAL)
  }

  const handleNext = (index: number) => {
    if (index !== totalReadings) {
      setReadIndex(index + 1)
      setSelectedReading(readings[index + 1])
    }
  }

  const handleClose = () => {
    if (selectedReading) {
      setSelectedReading(undefined)
    } else {
      closeModal()
    }
  }

  return (
    <Transition
      appear
      show={isModalShown(ModalType.READING_CHALLENGE_MODAL)}
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
              <Dialog.Panel className='relative mt-16 min-h-screen w-full max-w-[1000px] transform overflow-hidden rounded-[20px] bg-neutral-900 text-left align-middle shadow-xl transition-all md:mt-0 md:min-h-fit'>
                <div className='z-0 p-6 md:p-14'>
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
                  {!selectedReading && (
                    <div className='flex flex-col items-center justify-center'>
                      <div className='mt-4 flex w-full flex-col items-center justify-center md:flex md:flex-row'>
                        <div className='w-[180px] md:mr-4 md:w-[220px]'>
                          <img
                            src={earn?.badge?.imageUrl}
                            className='h-full w-full object-cover'
                            alt='badge'
                          />
                        </div>
                        <div className='mt-2 flex flex-1 flex-col items-center px-4 md:items-start'>
                          <Text
                            variant='h4'
                            size='bold'
                            className='text-center md:text-start'
                          >
                            {earn?.name}
                          </Text>
                          <LinkText
                            variant='h3'
                            className='mt-2 text-center text-text-secondary md:text-start'
                          >
                            {earn?.description}
                          </LinkText>
                          <div className='my-6 flex flex-row items-center justify-between rounded-full border border-white border-opacity-10 bg-dark-primary px-4 py-3'>
                            <div className='flex flex-row items-center'>
                              <img
                                src='/img/diamond_white.png'
                                className='h-[16px] w-[18px] object-fill'
                                alt='rewards'
                              />
                              <Text
                                variant='b1'
                                className='ml-1 mr-3 text-text-secondary md:mr-3'
                              >
                                Rewards
                              </Text>
                            </div>
                            <Text
                              variant='b1'
                              className='mr-1 text-right text-white'
                            >
                              {earn?.points} Tickets
                            </Text>
                          </div>
                        </div>
                      </div>

                      <div className='mt-4 flex w-full'>
                        <ReadingTask
                          title={earn?.name}
                          isCompleted={!!isCompleted}
                          onClick={() => {
                            handleSelect(readings[0])
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {selectedReading && (
                    <div>
                      <div className='h-10'></div>
                      <ReadingSelect
                        onCompleted={handleComplete}
                        onNext={handleNext}
                        total={totalReadings}
                        index={readIndex}
                        earn={earn}
                        reading={selectedReading}
                      />
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ReadingQuestModal
