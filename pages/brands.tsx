import React, { useState } from 'react'
import type { NextPage } from 'next'
import { Transition } from '@headlessui/react'

import LandingFooter from '@components/Landing/Footer'
import LandingHeader from '@components/Landing/Header'
import { Text } from '@components/Text'

const BrandsPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  setTimeout(() => {
    setIsOpen(true)
  }, 100)
  return (
    <div className='min-h-screen bg-neutral-1000'>
      <div className='container mx-auto bg-neutral-1000 pb-10'>
        <LandingHeader />
        <div className='flex h-[138px] w-full items-center justify-center px-9 text-center text-[42px]  font-semibold text-primary-400'>
          Why Work With GLASS?
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
                Alcohol brands need new ways to connect with fans.
              </Text>
              <br />
              <Text variant='ls'>
                GLASS is the first loyalty and rewards app built from the ground
                up for modern alcohol brands.
              </Text>
              <br />
              <Text variant='ls'>
                On GLASS, you’re able to engage and reward your consumers
                wherever, and whenever, drinks are enjoyed.
              </Text>
              <br />
              <Text variant='ls'>
                We help you build up your brand community, turn fans into
                advocates, and connect directly to consumers within the safety
                of the 3-tier system.
              </Text>
              <br />
              <Text variant='ls'>
                {`As alcohol industry operators, we understand the complexity -
                and the importance - of federal, state, and local alcohol
                regulation. When you issue loyalty points and badges on GLASS,
                they’re governed by a protocol layer that ensures your fans can
                only redeem them for rewards that meet their local regulatory
                requirements.`}
              </Text>
              <br />
              <Text variant='ls'>
                As alcohol consumers, meanwhile, we understand that alcohol’s an
                inherently social product. Our web3 infrastructure integrates
                with platforms across dining, nightlife, music, sports, and
                events so that your fans can earn and redeem across the social
                occasions that define your brand.
              </Text>
              <br />
              <Text variant='ls'>
                Want to learn more? Send us a note at{' '}
                <span className='text-primary-700'>cheers@glass.fun.</span>
              </Text>
            </div>
          </div>
        </Transition>
        <LandingFooter />
      </div>
    </div>
  )
}

export default BrandsPage
