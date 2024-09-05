import { FC, Fragment } from 'react'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'

import { Image } from '@nextui-org/react'
import { useStore } from '@store/store'

import 'react-multi-carousel/lib/styles.css'

export type OnBoardingModalProps = {
  onClose?: () => void
}

const OnBoardingModal: FC<OnBoardingModalProps> = () => {
  const setOnBoarding = useStore((state) => state.setOnBoarding)

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as='div' className='relative z-[60]' onClose={() => null}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-bg-white' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex h-screen items-center justify-center bg-bg-white p-4 text-center'>
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
                className='fixed flex h-full w-full flex-col items-center 
                  overflow-auto
                  text-left shadow-xl transition-all'
              >
                <div className='w-full  bg-[url(/png/onboarding_bg.png)] bg-center bg-cover bg-no-repeat pt-0 md:pt-[60px] h-full relative select-none'>
                  <div className='w-full flex justify-center overflow-hidden mb-[-50px]'>
                    <div className='bg-center w-[834px] flex items-center justify-center'>
                      <Image
                        src='/png/onboarding_img.png'
                        alt=''
                        width={477}
                        height={669}
                        className='w-[477px] mx-auto'
                      />
                    </div>
                  </div>
                  <div className='overflow-hidden w-full min-h-[380px] absolute mt-[440px] md:mt-[610px] top-0 bottom-0'>
                    <div className='absolute ml-[50%] pt-[40px] flex items-center justify-start flex-col w-[2085px] md:w-[160vw] h-[2085px] left-[-1042px] md:left-[-80vw] rounded-[50%] z-10 bg-bg-white'>
                      <div className='mb-2 font-knockout uppercase max-w-[350px] px-2 text-center leading-[35px] text-[30px] font-medium relative z-10'>
                        Welcome to the
                        <br />
                        🌶️  heat seekers 🌶️
                      </div>
                      <div className='mt-8 mb-4 max-w-[350px] text-[16px] font-typewriter px-4 text-text-black-2 text-center md:px-0'>
                        Join challenges to earn points, and redeem your points for gift cards, swag, and more.
                      </div>
                      <div
                        onClick={() => setOnBoarding(false)}
                        className='mt-4 h-[62px] text-[18px] font-typewriter w-[245px] cursor-pointer rounded-[10px] bg-button-primary text-center font-semibold leading-[62px] text-button-text-primary'
                      >
                        Get Started
                      </div>
                      <div className='flex max-w-[350px] mt-4 flex-col gap-2 px-8 py-4 font-typewriter'>
                        <p className='text-center text-[12px] font-[500] text-text-black-2'>
                          Powered By{' '}
                          <a
                            href='https://www.glass.fun'
                            className='underline'
                            target='_blank'
                          >
                            GLASS.fun
                          </a>
                        </p>
                        <p className='text-center text-[12px] font-[500] text-text-black-2'>
                          <Link href='/tos' target='_blank'>
                            Terms and Conditions
                          </Link>{' '}
                          |{' '}
                          <Link href='/privacy' target='_blank'>
                            Privacy Policy
                          </Link>
                        </p>
                      </div>
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

export default OnBoardingModal
