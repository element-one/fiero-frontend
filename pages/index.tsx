import React from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Layout from '@components/Layout/Layout'
import MobileHeading from '@components/Layout/MobileHeading'

const HomePage: NextPage = () => {
  const router = useRouter()

  return (
    <Layout>
      <div className='flex w-full min-h-screen h-[100vh] overflow-y-auto flex-col items-center justify-between bg-center bg-cover bg-no-repeat bg-[url(/png/onboarding_bg.png)]'>
        <MobileHeading />

        <div className='w-full px-8 md:px-4 pb-[60px] pt-6 text-text-white md:pt-[36px]'>
          <p className='text-left uppercase text-[36px] md:text-[48px] font-knockout font-medium md:text-center'>
            Welcome to
            <br />
            the heat seekers
          </p>
        </div>

        <div className='relative mt-10 md:mt-16 md:mx-[20px] h-[460px] md:h-[670px] shrink-0 w-full md:w-[628px] bg-[url(/png/index-bg.png)] bg-[length:100%_100%] md:bg-cover bg-center bg-no-repeat'>
          <div
            onClick={() => router.push('/contests')}
            className='absolute left-[40px] top-[-66px] md:left-[76px] md:top-[-94px] flex h-[65px] md:h-[92px] w-fit cursor-pointer items-center justify-center rounded-full bg-bg-white text-center uppercase text-text-black'
          >
            <div className="bg-button-primary text-text-white text-[13px] md:text-[18px] font-typewriter h-[65px] md:h-[92px] font-semibold w-fit items-center justify-center flex rounded-full px-[20px] -mt-3 -ml-1 border-2 border-border-1">
              JOIN CHALLENGES
            </div>
          </div>
          <div
            onClick={() => router.push('/prizes')}
            className='absolute right-1 md:right-[10px] top-[57px] md:top-[86px] flex h-[65px] md:h-[92px] w-fit cursor-pointer items-center justify-center rounded-full bg-bg-white text-center uppercase text-text-black'
          >
            <div className="bg-bg-red h-[65px] md:h-[92px] text-text-white text-[13px] md:text-[18px] font-typewriter font-semibold w-fit items-center justify-center flex rounded-full px-[20px] -mt-3 -ml-1 border-2 border-border-1">
              Unlock rewards
            </div>
          </div>
        </div>

        <div className='mt-0 md:mt-[60px] font-typewriter pb-6 text-center text-text-white text-xs'>
          <p className='mb-1'>
            Powered by{' '}
            <a
              href='https://www.glass.fun'
              className='underline'
              target='_blank'
            >
              GLASS.fun
            </a>
          </p>
          <p>
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
    </Layout>
  )
}

export default HomePage
