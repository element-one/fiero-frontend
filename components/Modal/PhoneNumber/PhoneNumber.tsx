import { ChangeEventHandler, Fragment, useState } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'

import Button from '@components/Button/Button'
import { Text } from '@components/Text'
import { ModalType, useModal } from '@contexts/modal'
import { putUsersPhoneNumber } from '@services/api'
import { useStore } from '@store/store'
import { useTempStore } from '@store/tempStore'

interface PhoneNumberModalProps {
  onClose?: () => void
}

const PhoneNumberReg = /^(\+?1-?)?\(?(\d{3})\)?[-.]?(\d{3})[-.]?(\d{4})$/

export const PhoneNumberModal: React.FC<PhoneNumberModalProps> = ({
  onClose,
}) => {
  const { isModalShown, hideModal } = useModal()

  const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)

  const setUser = useStore((user) => user.setUser)
  const setPhoneNumberShown = useTempStore(state => state.setPhoneNumberModalShown)

  const closeModal = async () => {
    hideModal()
    onClose && onClose()
    setPhoneNumberShown(true)
  }

  const handlePhoneNumberChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value

    const cleaned = value.replace(/\D/g, '').slice(0, 10)

    setPhoneNumber(cleaned)

    setPhoneNumberIsValid(PhoneNumberReg.test(cleaned))
  }

  const handleSaveButtonClick = async () => {
    try {
      setLoading(true)
      const data = await putUsersPhoneNumber(phoneNumber)

      if (data.statusCode === 200) {
        closeModal()
        setUser(data.user)
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const formatPhoneNumber = (phoneNumber: string) => {
    const match = phoneNumber.match(/^(\d{3})(\d{0,3})(\d{0,4})$/)

    if (match) {
      const formatted = [match[1], match[2], match[3]].filter(Boolean).join('-')
      return formatted
    }

    return phoneNumber
  }

  return (
    <Transition
      appear
      show={isModalShown(ModalType.PHONE_NUMBER_MODAL)}
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
          <div className='flex min-h-full items-center justify-center p-4 text-center backdrop-blur-lg'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='flex h-fit w-full max-w-[480px] transform items-center justify-center overflow-hidden rounded-xl border border-border-white bg-bg-white shadow-xl transition-all'>
                <div className='relative flex w-full flex-col items-center justify-start'>
                  <div className='pt-[56px]'>
                    <Text variant='h2' size='medium' className='mb-2 !font-knockout font-bold text-text-black'>
                      Can we get your number?
                    </Text>
                  </div>
                  <div className='mt-8 flex w-full flex-col font-typewriter items-start px-4 text-text-black md:px-20'>
                    <span className='text-b2 md:text-b3'>Phone number</span>
                    <div className='mt-2 flex w-full items-center justify-start gap-2 rounded-md border-2 border-neutral-500 px-2 py-1 md:py-2'>
                      <span>+ 1</span>
                      <input
                        onChange={handlePhoneNumberChange}
                        value={formatPhoneNumber(phoneNumber)}
                        className='flex-1 border-none bg-transparent text-b1 outline-none ring-0 focus:ring-0'
                      />
                    </div>
                  </div>
                  <div className='my-[37px] flex flex-col items-center justify-between'>
                    <Button
                      onClick={handleSaveButtonClick}
                      isLoading={loading}
                      disabled={!phoneNumberIsValid}
                      color='primary'
                    >
                      Save
                    </Button>
                    <div className='mx-16 mt-2'>
                      <Text variant='b3' className='text-text-black font-typewriter'>
                        By providing my phone number, I understand that I am
                        consenting to receive autodialed and manual text
                        messages and phone calls from Fiero on my mobile
                        phone.{' '}
                        <Link
                          href='/privacy'
                          className='text-blue-500'
                          onClick={hideModal}
                        >
                          Privacy Policy
                        </Link>
                      </Text>
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

export default PhoneNumberModal
