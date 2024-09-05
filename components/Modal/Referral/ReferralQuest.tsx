import React, { Fragment, useMemo, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import _ from 'lodash'
import * as Yup from 'yup'

import IconButton from '@components/Button/IconButton'
import { Text } from '@components/Text'
import LinkText from '@components/Text/LinkText'
import { ModalType, useModal } from '@contexts/modal'
import { usePutEarnComplete } from '@services/api'
import { useStore } from '@store/store'

import { ReferralTask } from './ReferralTask'

interface ReferralQuestModalProps {
  onClose?: () => void
}

const schema = Yup.object().shape({
  email: Yup.string().required().email(),
})

export const ReferralQuestModal: React.FC<ReferralQuestModalProps> = ({
  onClose,
}) => {
  const { isModalShown, hideModal } = useModal()

  const earn = useStore((state) => state.earn)
  const removeEarn = useStore((state) => state.removeEarn)
  const userEarn = useStore((state) => state.getUserEarn(earn?.id))

  const setUserEarn = useStore((state) => state.setUserEarn)

  const [, setErrorMessage] = useState<string | undefined>(undefined)

  const { mutate: completeEarn, isLoading } = usePutEarnComplete(earn?.id, {
    onSuccess: (response) => {
      setUserEarn(response.userEarn)
      resetForm()
    },
    onError: (err) => {
      let message
      if (axios.isAxiosError(err) && err.response) {
        message = err.response.data.message
        setErrorMessage('invite failed')
      } else if ((message = String(err))) {
        setErrorMessage(message)
      }
    },
  })

  const referrals = useMemo(
    () => _.values(userEarn?.invites),
    [userEarn?.invites]
  )

  const closeModal = () => {
    removeEarn()
    hideModal()
    onClose && onClose()
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: schema,
    onSubmit: async ({ email }) => {
      completeEarn({ earnId: earn?.id, payload: { email } })
    },
  })

  const { values, handleChange, handleSubmit, resetForm } = formik

  return (
    <Transition
      appear
      show={isModalShown(ModalType.REFERRAL_CHALLENGE_MODAL)}
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
                    onClick={closeModal}
                  >
                    <img
                      src={'/img/icon_x.png'}
                      className='h-[32px] w-[32px] object-cover'
                      alt='close'
                    />
                  </button>
                  <div className='flex flex-col items-center justify-center'>
                    <div className='mt-4 flex w-full flex-col items-center justify-center md:flex md:flex-row md:justify-start'>
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
                  </div>
                  <div className='mb-3.5 mt-7'>
                    <Text variant='h3' size='bold'>
                      {`Enter your friend's email address`}
                    </Text>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className='relative flex flex-row items-center'>
                      <input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='name@example.com'
                        onChange={handleChange}
                        value={values.email}
                        className='flex h-[50px] w-full rounded-[50px] border border-solid border-gray-600 bg-neutral-800 px-[16px] text-[#9CA3AF]'
                      />
                      <IconButton
                        size='small'
                        className='absolute right-1 flex h-[44px] w-[44px] justify-center rounded-full'
                        type='submit'
                        isLoading={isLoading}
                      >
                        <img
                          src='/img/send.png'
                          alt='send'
                          className='object-fit h-[24px] w-[24px]'
                        />
                      </IconButton>
                    </div>
                  </form>
                  <div className='flex flex-col space-y-4 py-8'>
                    {referrals &&
                      referrals.map(
                        (
                          referral: any // eslint-disable-line
                        ) => (
                          <ReferralTask
                            key={referral.email}
                            referral={referral}
                            earn={earn}
                            userEarn={userEarn}
                          />
                        )
                      )}
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

export default ReferralQuestModal
