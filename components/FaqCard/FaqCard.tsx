import React, { type HTMLAttributes } from 'react'
import { Disclosure } from '@headlessui/react'

interface FaqCardProps extends HTMLAttributes<HTMLDivElement> {
  question: string
  answer: string
}
const FaqCard: React.FC<FaqCardProps> = ({ question, answer }) => {
  return (
    <Disclosure as='div' className='mt-2 rounded-xl border border-[#555555]'>
      {({ open }) => (
        <>
          <Disclosure.Button className='flex w-full items-center justify-between rounded-lg p-6 text-left text-[16px] text-white'>
            <span>{question}</span>
            <img
              src='/img/arrow_bottom_yellow.png'
              alt='arrow_bottom_yellow'
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-5 w-5 text-purple-500`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className='pb-6 pl-6 text-[14px] leading-6 text-white'>
            {answer}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default FaqCard
