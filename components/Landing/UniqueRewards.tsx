import Image from 'next/image'

import { Text } from '@components/Text'

const LandingUniqueRewards = () => {
  return (
    <div className='mt-0 flex w-full flex-row flex-wrap px-6 md:mt-24 md:pr-20'>
      <div className='basis-full md:basis-1/2'>
        <Image
          priority
          src={'/img/glass_unique_rewards.png'}
          alt='Unique rewards'
          width={570}
          height={438}
        />
      </div>
      <div className='mt-10 flex basis-full flex-col justify-center px-0 md:basis-1/2 md:px-14'>
        <Text
          variant='h2'
          size='extrabold'
          className='mb-2 italic text-primary-400 md:mb-4'
        >
          Unique rewards
        </Text>
        <div className='relative mb-0 w-fit leading-10 md:mb-3'>
          <Text variant='md' size='bold' className='relative z-10'>
            Level Up Your
          </Text>
          <div className='absolute -bottom-1.5 w-56 -rotate-1 transform border-b-[10px] border-primary-700 opacity-80'></div>
        </div>
        <Text
          variant='md'
          size='bold'
          className='mb-3 leading-title-height md:mb-5'
        >
          Evenings Out
        </Text>
        <Text variant='h3' className='mb-10'>
          Unlock access to free and discounted drinks, VIP events, personalized
          and limited-edition merchandise, and more.
        </Text>
      </div>
    </div>
  )
}

export default LandingUniqueRewards
