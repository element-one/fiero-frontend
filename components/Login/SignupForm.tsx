import { type HTMLAttributes, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Button from '@components/Button/Button'
import { Text } from '@components/Text'
import { Image } from '@nextui-org/react'
import { postLogin } from '@services/api'
import { useStore } from '@store/store'

const schema = Yup.object().shape({
  email: Yup.string().required().email(),
})

interface SignupFormProps extends HTMLAttributes<HTMLDivElement> {
  isLoginHide?: boolean
  onSuccess: (email: string) => void
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
  const router = useRouter()
  const { referralCode, challenge } = router.query
  const brand = router.pathname.includes('/signup')
    ? router.pathname.split('/')[1]
    : undefined

  const setRedirectUrl = useStore((state) => state.setRedirectUrl)

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const handleSentSuccess = (email: string) => {
    onSuccess && onSuccess(email)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: schema,
    onSubmit: async ({ email }) => {
      try {
        setIsLoading(true)
        const response = await postLogin(
          email,
          referralCode as string,
          challenge as string,
          brand
        )
        if (response.status === 200) {
          handleSentSuccess(email)
        }
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        let message
        if (axios.isAxiosError(err) && err.response) {
          message = err.response.data.message
          setErrorMessage('Request OTP failed, please try again in few minutes')
        } else if ((message = String(err))) {
          setErrorMessage(message)
        }
      }
    },
  })

  const { values, handleChange, handleSubmit } = formik

  const handleGoogleLogin = (e: React.MouseEvent) => {
    e.preventDefault()

    if (setRedirectUrl) {
      setRedirectUrl(router.asPath)
    }

    if (referralCode) {
      router.push(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google?referralCode=${referralCode}`
      )
    } else {
      router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`)
    }
  }

  return (
    <div className='flex h-full max-w-[500px] overflow-hidden flex-col items-center justify-center bg-bg-white p-6 text-text-black md:min-w-[460px]'>
      <Image
        src='/png/fiero_logo.png'
        alt='fiero logo'
        width={180}
        height={94}
        className='rounded-none'
      />
      <div className='my-6 uppercase font-knockout text-center text-[30px] font-semibold'>
        Sign up or log in
      </div>

      {errorMessage && (
        <div className='mt-4 rounded-md bg-red-400 bg-opacity-50 p-2'>
          <Text variant='b1'>{errorMessage}</Text>
        </div>
      )}

      <form onSubmit={handleSubmit} className='flex w-full flex-col shrink-0'>
        <button
          className='mt-[16px] flex h-[48px] w-full cursor-pointer items-center justify-center rounded-[10px] border border-solid border-[#A2A2A2] font-semibold'
          onClick={handleGoogleLogin}
        >
          <img
            src='/img/google_logo.svg'
            alt='google login'
            className='h-[23px]'
          />
          <p className='ml-[8px] text-lg font-typewriter'>Continue with Google</p>
        </button>


        <div className='flex items-center py-[32px] shrink-0'>
          <div className='h-0 flex-grow border-[0.5px] border-solid border-border-2'></div>
          <span className='px-[20px]'>OR</span>
          <div className='h-0 flex-grow border-[0.5px] border-solid border-border-2'></div>
        </div>

        <div className='font-typewriter'>
          <label className='text-b1 font-semibold'>Your email</label>
          <input
            type='email'
            name='email'
            value={values.email}
            onChange={handleChange}
            id='email'
            placeholder='name@example.com'
            className='mt-[8px] flex h-[52px] w-full rounded-[10px] border border-solid border-border-1 bg-bg-white px-[16px]'
          />
        </div>
        <div className='mb-[16px] mt-[33px] w-full'>
          <Button
            className='h-[52px] w-full text-[16px] font-semibold'
            type='submit'
            isLoading={isLoading}
          >
            Sign Up or Log In
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignupForm
