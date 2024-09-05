import { type HTMLAttributes, useState } from 'react'
import OtpInput from 'react-otp-input'
import { useInterval } from 'react-use'
import { useRouter } from 'next/router'

import Button from '@components/Button/Button'
import { BackIcon } from '@components/Icons/Back'
import { useAuth } from '@contexts/auth'
import { ModalType, useModal } from '@contexts/modal'
import { postLogin, postVerify } from '@services/api'
import { useStore } from '@store/store'

interface PinFormProps extends HTMLAttributes<HTMLDivElement> {
  isLoginHide?: boolean
  email?: string
  onBack?: () => void
}

export const PinForm: React.FC<PinFormProps> = ({ email, onBack }) => {
  const router = useRouter()
  const { setAuthenticated } = useAuth()
  const { showModal, hideModal } = useModal()
  const [count, setCount] = useState(59)
  const [showError, setShowError] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [otp, setOtp] = useState('')

  const redirectUrl = useStore((state) => state.redirectUrl)

  useInterval(() => {
    setCount((count) => --count)
  }, 1000)

  const handleVerify = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!email) return
    setIsLoading(true)
    try {
      const response = await postVerify(email, otp)
      if (response.status === 200) {
        setAuthenticated(true)

        if (response.data?.user?.isFirst) {
          showModal(ModalType.SIGN_IN_SUCCESS_MODAL)
        } else {
          hideModal()
        }

        if (redirectUrl) {
          router.push(redirectUrl)
        } else {
          router.push('/')
        }
      }
      setIsLoading(false)
      setShowError(false)
    } catch (error) {
      setShowError(true)
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    if (email) await postLogin(email)
  }

  return (
    <div className='flex h-full max-w-[500px] flex-col items-center justify-start bg-bg-white p-6 md:min-w-[460px] md:justify-center'>
      <div className='relative h-full w-full md:h-fit md:w-fit md:min-w-[360px]'>
        <div className='mt-2 w-full pt-[70px]'>
          <div className='text-center text-[30px] font-[800] text-text-black'>
            Enter Code
          </div>
          <p className='w-full text-center text-[16px] font-medium text-text-black opacity-60'>
            Enter the 4-digit passcode sent to
            <br />
            {email ?? 'name@email.com'}
          </p>
        </div>
        <div className='mt-[26px] hidden w-full md:flex'>
          <OtpInput
            containerStyle={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
            value={otp}
            onChange={setOtp}
            numInputs={4}
            inputType='tel'
            inputStyle={{
              display: 'flex',
              color: '#000000',
              textAlign: 'center',
              borderRadius: '20px',
              borderWidth: '1px',
              borderColor: showError ? '#EF6A00' : '#EBEBEB',
              borderStyle: 'solid',
              marginTop: '8px',
              height: '64px',
              width: '64px',
              fontWeight: '800',
              backgroundColor: '#FFFFFF',
            }}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <div className='mt-[26px] flex w-full md:hidden'>
          <OtpInput
            containerStyle={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
            value={otp}
            onChange={setOtp}
            numInputs={4}
            inputType='tel'
            inputStyle={{
              display: 'flex',
              color: '#000000',
              textAlign: 'center',
              borderRadius: '20px',
              borderWidth: '1px',
              borderColor: showError ? '#EF6A00' : '#EBEBEB',
              borderStyle: 'solid',
              marginTop: '8px',
              height: '54px',
              width: '54px',
              fontWeight: '800',
              backgroundColor: '#ffffff',
            }}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        {showError && (
          <div className='mt-2 cursor-pointer text-center text-[14px] text-text-orange'>
            Invalid code. Please try again
          </div>
        )}
        <div className='mt-[33px] w-full'>
          <Button
            className='h-[52px] w-full text-[16px]'
            onClick={handleVerify}
            isLoading={isLoading}
          >
            Continue
          </Button>
          <p className='mt-6 flex h-6 flex-col justify-center text-center text-[14px] leading-[150%]'>
            {count > 0 && <span>Resend after {count} seconds</span>}
            {count <= 0 && (
              <span
                className='cursor-pointer text-text-orange'
                onClick={handleResend}
              >
                Resend
              </span>
            )}
          </p>
        </div>

        <div
          className='absolute left-1 top-[-40px] cursor-pointer md:left-[-32px] md:top-0'
          onClick={onBack}
        >
          <BackIcon />
        </div>
      </div>
    </div>
  )
}

export default PinForm
