import React, { Fragment, useState } from 'react'
import { toast } from 'react-toastify'
import { Dialog, Transition } from '@headlessui/react'
import * as _ from 'lodash'

import { Footer } from '@components/Footer/Footer'
import { CloseIcon } from '@components/Icons'
import { Text } from '@components/Text'
import LinkText from '@components/Text/LinkText'
import { useAuth } from '@contexts/auth'
import { ModalType, useModal } from '@contexts/modal'
import { useStore } from '@store/store'
import { ApiSurvey, ApiUserEarn } from '@type/api'
import { isPastDate } from '@utils/utils'

import SurveySelect from './SurveySelect'
import SurveyTask from './SurveyTask'

interface SurveyQuestModalProps {
  onClose?: () => void
  onClick?: () => void
}

export const SurveyQuestModal: React.FC<SurveyQuestModalProps> = ({
  onClose,
}) => {
  const { isAuthenticated } = useAuth()
  const { isModalShown, hideModal, showModal } = useModal()
  const [selectedSurvey, setSelectedSurvey] = useState<ApiSurvey | undefined>(
    undefined
  )
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const earn = useStore((state) => state.earn)
  const surveys = _.orderBy(earn?.earnSurveys, 'order') || []
  const removeEarn = useStore((state) => state.removeEarn)
  const setUserEarn = useStore((state) => state.setUserEarn)
  const setUser = useStore((state) => state.setUser)

  const totalSurveys = surveys?.length || 0

  const { isCompleted } = useStore((state) => state.getUserEarn(earn?.id)) || {}

  const closeModal = () => {
    removeEarn()
    hideModal()
    onClose && onClose()
  }

  const handleSelect = (earnSurvey: ApiSurvey) => {
    if (earn?.expiredAt && isPastDate(earn.expiredAt)) {
      toast.error('Challenge expired')
      return
    }

    if (!isAuthenticated) {
      showModal(ModalType.SIGN_IN_MODAL)
      return
    }

    setSelectedSurvey(earnSurvey)
  }

  const handleComplete = (userEarn: ApiUserEarn) => {
    setSelectedIndex(0)
    setSelectedSurvey(undefined)
    setUserEarn(userEarn)
    setUser(userEarn?.user)

    hideModal()
    showModal(ModalType.CLAIM_REWARDS_MODAL)
  }

  const handleNext = (index: number) => {
    if (index !== totalSurveys) {
      setSelectedIndex(index + 1)
      setSelectedSurvey(surveys[index + 1])
    }
  }

  const handleClose = () => {
    if (selectedSurvey) {
      setSelectedSurvey(undefined)
    } else {
      closeModal()
    }
  }

  return (
    <Transition
      appear
      show={isModalShown(ModalType.SURVEY_CHALLENGE_MODAL)}
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
              <Dialog.Panel className='relative mt-0 min-h-screen w-full max-w-[1000px] transform overflow-hidden bg-bg-white text-left align-middle shadow-xl transition-all md:min-h-fit md:rounded-[20px]'>
                <div className='z-0 p-6 md:p-14 min-h-screen md:min-h-fit h-fit flex flex-col justify-between'>
                  <button
                    className='absolute right-3 top-4 text-text-black md:right-8'
                    onClick={handleClose}
                  >
                    <CloseIcon />
                  </button>
                  {!selectedSurvey && (
                    <div className='flex flex-col items-center justify-center'>
                      <div className='mt-4 flex w-full flex-col items-center justify-center'>
                        <div className='w-[180px] md:mr-4 md:w-[220px] border-[12px] rounded-tl-full rounded-tr-full border-border-white'>
                          <img
                            src={earn?.badge?.imageUrl}
                            className='h-auto w-full object-cover rounded-tl-full rounded-tr-full'
                            alt='badge'
                          />
                        </div>
                        <div className='mt-8 flex flex-1 flex-col items-center px-4'>
                          <Text
                            variant='h4'
                            className='text-center text-text-black'
                          >
                            <span className='text-[31px] font-[600] uppercase font-knockout'>
                              {earn?.name}
                            </span>
                          </Text>
                          <LinkText
                            variant='b1'
                            className='mt-2 w-full max-w-[520px] font-typewriter text-center text-text-black text-[14px]'
                          >
                            {earn?.description}
                          </LinkText>
                          <div className='mb-2 mt-2 flex flex-row items-center justify-between rounded-full bg-bg-light px-4 py-3 md:mb-4 md:mt-10'>
                            <div className='flex flex-row items-center'>
                              🌶️&nbsp;
                              <Text
                                variant='b3'
                                className='ml-1 mr-3 text-text-black md:mr-3 font-typewriter opacity-60'
                              >
                                Rewards
                              </Text>
                            </div>
                            <Text
                              variant='b3'
                              className='mr-1 text-right text-text-black font-semibold font-typewriter text-[15px]'
                            >
                              {earn?.points} Points
                            </Text>
                          </div>
                        </div>
                      </div>

                      <div className='mt-4 flex w-full justify-center'>
                        <SurveyTask
                          title={earn?.name}
                          isCompleted={!!isCompleted}
                          onClick={() => {
                            handleSelect(surveys[0])
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {selectedSurvey && (
                    <div>
                      <div className='h-10'></div>
                      <SurveySelect
                        onCompleted={handleComplete}
                        onNext={handleNext}
                        total={totalSurveys}
                        index={selectedIndex}
                        earn={earn}
                        survey={selectedSurvey}
                      />
                    </div>
                  )}

                  <Footer className="md:hidden" />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default SurveyQuestModal
