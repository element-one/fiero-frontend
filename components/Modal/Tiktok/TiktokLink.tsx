import React, { Fragment, useState } from 'react'
import { toast } from 'react-toastify'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Button from '@components/Button/Button'
import { CloseIcon } from '@components/Icons'
import { Text } from '@components/Text'
import { usePutLinkTiktok } from '@services/api/index'
import { useStore } from '@store/store'
import { ModalType, useModal } from 'contexts/modal'

interface TiktokLinkModalProps {
  onClose?: () => void
  onClick?: () => void
}

const schema = Yup.object().shape({
  username: Yup.string().required(),
})

export const TiktokLinkModal: React.FC<TiktokLinkModalProps> = ({
  onClose,
}) => {
  const { isModalShown, hideModal, showModal } = useModal()

  const setUser = useStore((state) => state.setUser)
  const earn = useStore((state) => state.earn)

  const [, setErrorMessage] = useState<string | undefined>(undefined)

  const { mutate, isLoading } = usePutLinkTiktok(undefined, {
    onSuccess: (response) => {
      setUser(response.user)
      toast.success('Tiktok linked successfully to your account')
      closeModal()
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

  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validationSchema: schema,
    onSubmit: async ({ username }) => {
      mutate({ username })
    },
  })

  const { values, handleChange, handleSubmit } = formik

  const closeModal = () => {
    hideModal()
    if (earn) {
      showModal(ModalType.TIKTOK_CHALLENGE_MODAL)
    }
    onClose && onClose()
  }

  return (
    <Transition
      appear
      show={isModalShown(ModalType.TIKTOK_LINK_MODAL)}
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
              <Dialog.Panel className='relative mt-16 min-h-[400px] w-full max-w-[1000px] transform overflow-hidden rounded-xl bg-bg-white text-left align-middle shadow-xl transition-all md:mt-0'>
                <button
                  className='absolute right-3 top-4 text-text-black md:right-8'
                  onClick={closeModal}
                >
                  <CloseIcon />
                </button>
                <Text
                  variant='h1'
                  className='mt-16 text-center font-[800] text-text-black'
                >
                  Link Your Tiktok Account
                </Text>
                <form
                  className='mt-8 flex w-full flex-col items-center justify-between space-y-10'
                  onSubmit={handleSubmit}
                >
                  <input
                    type='username'
                    name='username'
                    value={values.username}
                    onChange={handleChange}
                    id='username'
                    placeholder={'tiktok username'}
                    className='flex h-[42px] w-1/2 rounded-lg border border-solid border-border-primary px-[16px] text-text-black md:w-[300px]'
                  ></input>
                  <Button
                    className='w-[200px] text-[16px]'
                    type='submit'
                    isLoading={isLoading}
                  >
                    Link Account
                  </Button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default TiktokLinkModal
