import React, { useState } from 'react'
import type { NextPage } from 'next'
import { Transition } from '@headlessui/react'

import LandingFooter from '@components/Landing/Footer'
import LandingHeader from '@components/Landing/Header'
import { Text } from '@components/Text'

const RulesPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  setTimeout(() => {
    setIsOpen(true)
  }, 100)
  return (
    <div className='min-h-screen bg-neutral-1000'>
      <div className='container mx-auto bg-neutral-1000 pb-10'>
        <LandingHeader />

        <div className='flex h-[138px] w-full items-center justify-center px-9 text-center text-[42px]  font-semibold text-primary-400'>
          Official Rules for Contests on GLASS
        </div>

        <Transition
          appear={true}
          show={isOpen}
          enter='transition-transform duration-12000 ease-linear'
          enterFrom='translate-y-full'
          enterTo='translate-y-0'
        >
          <div className='mx-7 mt-7 ease-linear md:mt-14'>
            <div className='m-auto max-w-[1200px] text-left font-sans text-[14px] leading-6 text-white'>
              <Text variant='b1' size='bold' className='text-[14px]'>
                Last Updated on Aug 2, 2023.
              </Text>
              <br />
              <Text variant='b1' size='bold' className='text-[14px]'>
                No contests published yet; check back soon!
              </Text>
            </div>
          </div>
        </Transition>
        <LandingFooter />
      </div>
    </div>
  )
}

export default RulesPage
