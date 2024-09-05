import React from 'react'
import type { NextPage } from 'next'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

import Layout from '@components/Layout/Layout'
import MobileHeading from '@components/Layout/MobileHeading'
import { Image } from '@nextui-org/react'

const EventsPage: NextPage = () => {
  return (
    <Layout>
      <div className='flex min-h-screen h-[100vh] overflow-y-auto w-full flex-col justify-between bg-bg-white'>
        <MobileHeading />
        <div className='mx-auto flex w-[400px] flex-1 flex-col items-center justify-center'>
          <div className='mb-[23px] mt-[23px] w-full whitespace-nowrap px-2 text-left text-[20px] font-[400] uppercase md:mb-[46px] md:text-center md:text-[30px] md:font-[800]'>
            Dunkin scavenger hunt
          </div>
          <Image src='/png/event_frame.png' alt='' width={386} height={250} />
          <p className='mt-[30px] text-center text-[16px] font-[500] opacity-60'>
            Welcome to the world of Dunkin: where the beer is flowing, the
            burgers are sizzling, and there are great friends at every step.
            Join us this summer at some of our favorite culinary spots around
            Boston - and for every check-in, you’ll earn chances to unlock tasty
            prizes!{' '}
          </p>
        </div>
        <div className='relative mt-16 flex items-center justify-center'>
          <Image
            src='/svg/yellow-round.svg'
            alt='round'
            height={400}
            className='h-[300px] w-full rounded-none object-cover md:h-[300px]'
          />
          <img
            src='/svg/event-locate.svg'
            alt='locate'
            height={100}
            className='absolute -top-[34px] z-10'
          />
          <div className='absolute z-10 flex items-center justify-center gap-[110px]'>
            <div className='flex flex-col items-center justify-center'>
              <div className='mb-[34px] text-[20px] uppercase'>
                Ready To Play?
              </div>
              <img src='/png/event_frame2.png' alt='frame' width={138} />
            </div>
            <div className='flex h-[146px] w-[102px] cursor-pointer flex-col items-center justify-center gap-4 rounded-lg bg-bg-orange text-text-white'>
              <span className='font-[800] uppercase'>Enter</span>
              <ArrowRightIcon width={27} height={27} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default EventsPage
