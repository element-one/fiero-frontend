import Image from 'next/image'
import { useRouter } from 'next/router'

import Button from '@components/Button/Button'
import { Text } from '@components/Text'

const LandingEarnRewards = () => {
  const router = useRouter()

  return (
    <div className='my-10 flex w-full flex-row flex-wrap-reverse px-6 md:my-24 md:pl-20'>
      <div className='basis-full md:basis-1/2'>
        <div className='relative mb-2 w-fit leading-10 md:mb-3'>
          <Text variant='md' size='bold' className='relative z-10'>
            Earn Rewards
          </Text>
          <div className='absolute -bottom-1.5 w-full -rotate-1 transform border-b-[10px] border-primary-700 opacity-80'></div>
        </div>
        <Text
          variant='md'
          size='bold'
          className='mb-5 leading-10 md:leading-title-height'
        >
          From Your Favorite Alcohol Brands
        </Text>
        <Text variant='h3' className='mb-10 w-full md:w-4/5'>
          Unlock your cocktail’s full potential. Have fun with friends, earn
          tickets from brands, and access premium social experiences.
        </Text>
        <div className='mt-4 flex flex-row flex-wrap items-center'>
          <Button
            className='w-full md:w-auto'
            onClick={() => {
              router.push('/')
            }}
          >
            <Text
              variant='b1'
              size='semibold'
              className='px-8 py-1 text-neutral-1000'
            >
              Enter GLASS
            </Text>
          </Button>
        </div>
      </div>
      <div className='mb-8 basis-full md:mb-0 md:basis-1/2'>
        <Image
          priority
          src={'/img/glass_landing_earn_rewards.png'}
          alt='Earn Rewards'
          width={570}
          height={438}
        />
      </div>
    </div>
  )
}

export default LandingEarnRewards
