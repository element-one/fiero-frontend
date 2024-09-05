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
      <div className='flex w-full min-h-screen h-[100vh] overflow-y-auto flex-col items-center justify-between bg-center bg-cover bg-no-repeat bg-[url(/png/index_bg.png)]'>
        <MobileHeading />

        <div className='w-full px-4 pb-[60px] pt-6 text-text-white md:pt-[36px]'>
          <p className='text-left text-[30px] font-semibold md:text-center'>
            Welcome to
            <br />
            Harpoon Rewards!
          </p>
        </div>

        <div className='relative md:mx-[20px] h-[414px] shrink-0 w-[280px] bg-[url(/png/index-bg.png)] bg-contain bg-center bg-no-repeat scale-80 md:scale-100'>
          <div
            onClick={() => router.push('/contests')}
            className='absolute left-[-40px] top-[-50px] flex h-[66px] w-fit cursor-pointer items-center justify-center rounded-full bg-bg-white text-center uppercase text-text-black'
          >
            <div className="bg-bg-light-blue h-[66px] font-semibold w-fit items-center justify-center flex rounded-full px-[10px] -mt-3 -ml-1 border-2 border-border-1">
              JOIN CHALLENGES
            </div>
          </div>
          <div
            onClick={() => router.push('/prizes')}
            className='absolute right-[-91px] top-[110px] flex h-[66px] w-fit cursor-pointer items-center justify-center rounded-full bg-bg-white text-center uppercase text-text-black'
          >
            <div className="bg-bg-yellow h-[66px] font-semibold w-fit items-center justify-center flex rounded-full px-[10px] -mt-3 -ml-1 border-2 border-border-1">
              Unlock rewards
            </div>
          </div>
        </div>

        <div className='mt-[60px] pb-6 text-center text-text-white text-xs'>
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
