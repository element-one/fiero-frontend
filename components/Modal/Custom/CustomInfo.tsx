import React, { Fragment } from 'react'
import { toast } from 'react-toastify'
import clsx from 'clsx'
import { Dialog, Transition } from '@headlessui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Button from '@components/Button/Button'
import { Text } from '@components/Text'
import { usePostAddCustom } from '@services/api'
import { useStore } from '@store/store'
import { ModalType, useModal } from 'contexts/modal'

interface CustomInfoModalProps {
  onClose?: () => void
}

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
})

export const CustomInfoModal: React.FC<CustomInfoModalProps> = ({
  onClose,
}) => {
  const reward = useStore((state) => state.reward)
  const { isModalShown, hideModal, showModal } = useModal()

  const setUserReward = useStore((state) => state.setUserReward)

  const closeModal = () => {
    hideModal()
    onClose && onClose()
  }

  const { mutate: addCustom, isLoading } = usePostAddCustom(reward?.id, {
    onSuccess: (response) => {
      setUserReward(response.userReward)
      hideModal()
      showModal(ModalType.CUSTOM_CONGRATS_MODAL)
    },
    onError: (err) => {
      console.error(err)
      toast.error('Add custom failed')
    },
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema: schema,
    onSubmit: async ({ name, email }) => {
      addCustom({
        rewardId: reward?.id,
        payload: {
          name,
          email,
        },
      })
    },
  })
  const { values, errors, touched, handleChange, handleSubmit } = formik

  return (
    <Transition
      appear
      show={isModalShown(ModalType.CUSTOM_INFO_MODAL)}
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
              <Dialog.Panel
                className={clsx(
                  'relative h-[500px] min-h-full w-[320px] transform overflow-hidden rounded-xl bg-neutral-800 text-left align-middle shadow-xl transition-all md:h-[600px] md:w-[483px]'
                )}
              >
                <div className='z-0 flex w-full flex-col items-center justify-center p-6 md:p-[42px]'>
                  <button
                    className='absolute right-2 top-2'
                    onClick={closeModal}
                  >
                    <img
                      src={'/img/icon_x.png'}
                      className='h-[32px] w-[32px] object-cover'
                      alt='close'
                    />
                  </button>
                  <Text
                    variant='h1s'
                    size='semibold'
                    className='mt-5 w-full text-center text-white md:mt-[30px]'
                  >
                    Claim Your Reward
                  </Text>
                  <form
                    onSubmit={handleSubmit}
                    className='flex w-full flex-col items-center'
                  >
                    <div className='mt-[54px] flex w-full flex-col items-start md:mt-[78px]'>
                      <Text
                        variant='b1'
                        size='normal'
                        className='mb-2 text-center text-white'
                      >
                        Name
                      </Text>
                      <input
                        type='text'
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                        id='name'
                        placeholder={'Enter your name'}
                        className='w-full rounded-[8px] border border-solid border-gray-600 bg-neutral-800 py-[10px] text-gray-400 md:py-[14px]'
                      />
                      <Text variant='b3' className='text-red-500'>
                        {errors.name && touched.name && errors.name}
                      </Text>
                    </div>
                    <div className='mt-[30px] flex w-full flex-col items-start'>
                      <Text
                        variant='b1'
                        size='normal'
                        className='mb-2 text-center text-white'
                      >
                        Your email
                      </Text>
                      <input
                        type='email'
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        id='email'
                        placeholder={'Last Name'}
                        className='w-full rounded-[8px] border border-solid border-gray-600 bg-neutral-800 py-[10px] text-gray-400 md:py-[14px]'
                      />
                      <Text variant='b3' className='text-red-500'>
                        {errors.email && touched.email && errors.email}
                      </Text>
                    </div>
                    <div className='flex w-full flex-row justify-center'>
                      <Button
                        className='mt-[60px] h-[60px] w-full bg-primary-500 py-5 md:w-[136px]'
                        type='submit'
                        isLoading={isLoading}
                      >
                        <Text
                          variant='h3'
                          size='semibold'
                          className='text-neutral-700'
                        >
                          Submit
                        </Text>
                      </Button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CustomInfoModal
