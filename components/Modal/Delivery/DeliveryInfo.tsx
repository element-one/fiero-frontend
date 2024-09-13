import React, { useEffect } from 'react'
import clsx from 'clsx'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Button from '@components/Button/Button'
import { Text } from '@components/Text'
import { Modal, ModalBody, ModalContent } from '@nextui-org/react'
import { useStore } from '@store/store'
import { ModalType, useModal } from 'contexts/modal'

interface DeliveryInfoModalProps {
  onClose?: () => void
}

const schema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  address: Yup.string().required(),
  address1: Yup.string(),
  city: Yup.string().required(),
  state: Yup.string().required(),
  zipCode: Yup.string().required(),
})

export const DeliveryInfoModal: React.FC<DeliveryInfoModalProps> = ({
  onClose,
}) => {
  const { isModalShown, hideModal, showModal } = useModal()

  const setDelivery = useStore((state) => state.setDelivery)
  const reward = useStore((state) => state.reward)
  const delivery = useStore((state) => state.delivery)

  const closeModal = () => {
    hideModal()
    onClose && onClose()
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
      address1: '',
      city: '',
      state: '',
      zipCode: '',
    },
    validationSchema: schema,
    onSubmit: async ({
      firstName,
      lastName,
      address,
      address1,
      city,
      state,
      zipCode,
    }) => {
      setDelivery({
        id: '', // placeholder only
        firstName,
        lastName,
        address,
        address1,
        city,
        state,
        zipCode,
      })
      showModal(ModalType.DELIVERY_CONFIRM_MODAL)
    },
  })
  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    formik

  useEffect(() => {
    if (delivery) {
      setFieldValue('firstName', delivery.firstName)
      setFieldValue('lastName', delivery.lastName)
      setFieldValue('address', delivery.address)
      setFieldValue('address1', delivery.address1)
      setFieldValue('city', delivery.city)
      setFieldValue('state', delivery.state)
      setFieldValue('zipCode', delivery.zipCode)
    }
  }, [delivery, setFieldValue])

  return (
    <Modal
      isOpen={isModalShown(ModalType.DELIVERY_INFO_MODAL)}
      size='full'
      onClose={closeModal}
      classNames={{
        closeButton: 'bg-bg-white z-20',
      }}
    >
      <ModalContent>
        <ModalBody className='overflow-y-auto p-0 bg-bg-white'>
          <div className='flex w-full transform items-center pb-10'>
            <div className='z-0 flex w-full flex-col items-center'>
              <div className='relative min-h-[200px] w-full overflow-hidden'>
                <img
                  src={reward?.imageUrl}
                  className='max-h-[440px] w-full object-fill'
                  alt='shipping address'
                />
                <div className='absolute bottom-[-100px] left-[-10%] h-[200px] w-[120%] rounded-[50%] bg-bg-white'></div>
              </div>
              <div className='z-20 -mt-10 text-center font-knockout text-[30px] font-[800] text-text-black'>
                Tell us your shipping address
              </div>
              <form
                onSubmit={handleSubmit}
                className='mt-[60px] flex w-full max-w-[364px] flex-col font-typewriter items-center'
              >
                <div className='flex w-full flex-row justify-between space-x-4'>
                  <div className='flex flex-1 flex-col items-start'>
                    <Text
                      variant='b1'
                      size='normal'
                      className={clsx(
                        'mb-2 text-center',
                        errors.firstName && touched.firstName
                          ? 'text-text-primary'
                          : 'text-text-black'
                      )}
                    >
                      First Name{' '}
                      {errors.firstName && touched.firstName && '(required)'}
                    </Text>
                    <input
                      type='text'
                      name='firstName'
                      value={values.firstName}
                      onChange={handleChange}
                      id='firstName'
                      className={clsx(
                        'w-full rounded-full border border-solid px-5 py-[14px] text-text-black',
                        errors.firstName && touched.firstName
                          ? 'border-border-primary'
                          : 'border-border-1'
                      )}
                    />
                  </div>
                  <div className='flex flex-1 flex-col items-start'>
                    <Text
                      variant='b1'
                      size='normal'
                      className={clsx(
                        'mb-2 text-center text-text-black',
                        errors.lastName && touched.lastName
                          ? 'text-text-primary'
                          : 'text-text-black'
                      )}
                    >
                      Last Name{' '}
                      {errors.lastName && touched.lastName && '(required)'}
                    </Text>
                    <input
                      type='text'
                      name='lastName'
                      value={values.lastName}
                      onChange={handleChange}
                      id='lastName'
                      className={clsx(
                        'w-full rounded-full border border-solid px-5 py-[14px] text-text-black',
                        errors.lastName && touched.lastName
                          ? 'border-border-primary'
                          : 'border-border-1'
                      )}
                    />
                  </div>
                </div>
                <Text
                  variant='b1'
                  size='normal'
                  className={clsx(
                    'text-left] mb-2 mt-[14px] w-full',
                    errors.address && touched.address
                      ? 'text-text-primary'
                      : 'text-text-black'
                  )}
                >
                  Address {errors.address && touched.address && '(required)'}
                </Text>
                <div className='relative w-full'>
                  <textarea
                    id='address'
                    value={values.address}
                    onChange={(evt) => {
                      handleChange(evt)
                    }}
                    className={clsx(
                      'min-h-[120px] w-full rounded-2xl border border-solid px-5 py-[14px] text-text-black',
                      errors.address && touched.address
                        ? 'border-border-primary'
                        : 'border-border-1'
                    )}
                  />
                </div>

                <Text
                  variant='b1'
                  size='normal'
                  className={clsx(
                    'mb-2 mt-[14px] w-full text-left',
                    errors.city && touched.city
                      ? 'text-text-primary'
                      : ' text-text-black'
                  )}
                >
                  City {errors.city && touched.city && 'required'}
                </Text>
                <input
                  type='text'
                  name='city'
                  value={values.city}
                  onChange={handleChange}
                  id='city'
                  className={clsx(
                    'w-full rounded-full border border-solid px-5 py-[14px] text-text-black',
                    errors.city && touched.city
                      ? 'border-border-primary'
                      : 'border-border-1'
                  )}
                />

                <div className='mt-[14px] flex w-full flex-row justify-between space-x-4'>
                  <div className='flex flex-col  items-start'>
                    <Text
                      variant='b1'
                      size='normal'
                      className={clsx(
                        'mb-2 text-center',
                        errors.state && touched.state
                          ? 'text-text-primary'
                          : 'text-text-black'
                      )}
                    >
                      State {errors.state && touched.state && 'required'}
                    </Text>
                    <input
                      type='text'
                      name='state'
                      value={values.state}
                      onChange={handleChange}
                      id='state'
                      className={clsx(
                        'w-full rounded-full border border-solid px-5 py-[14px] text-text-black',
                        errors.state && touched.state
                          ? 'border-border-primary'
                          : 'border-border-1'
                      )}
                    />
                  </div>
                  <div className='flex flex-col items-start'>
                    <Text
                      variant='b1'
                      size='normal'
                      className={clsx(
                        'mb-2 text-center',
                        errors.zipCode && touched.zipCode
                          ? 'text-text-primary'
                          : 'text-text-black'
                      )}
                    >
                      ZIP {errors.zipCode && touched.zipCode && 'required'}
                    </Text>
                    <input
                      type='text'
                      name='zipCode'
                      value={values.zipCode}
                      onChange={handleChange}
                      id='zipCode'
                      className={clsx(
                        'w-full rounded-full border border-solid px-5 py-[14px] text-text-black',
                        errors.zipCode && touched.zipCode
                          ? 'border-border-primary'
                          : 'border-border-1'
                      )}
                    />
                  </div>
                </div>
                <div className='flex w-full flex-row justify-center'>
                  <Button
                    className='mt-10 h-[62px] w-full px-4 text-[16px] font-[800] md:mt-[60px]'
                    type='submit'
                  >
                    Continue
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default DeliveryInfoModal
