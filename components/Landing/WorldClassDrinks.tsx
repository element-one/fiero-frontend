import Image from 'next/image'

import { Text } from '@components/Text'

const LandingWorldClassDrinks = () => {
  return (
    <div className='mt-10 flex w-full flex-row flex-wrap px-6 md:mt-24 md:px-20'>
      <div className='basis-full md:basis-1/2'>
        <Image
          priority
          src={'/img/glass_world_class_drinks.png'}
          alt='Unique rewards'
          width={570}
          height={438}
        />
      </div>
      <div className='mt-10 flex basis-full flex-col justify-center md:basis-1/2 md:px-14'>
        <Text
          variant='h2'
          size='extrabold'
          className='mb-4 italic text-primary-400 md:mb-2'
        >
          World-class drinks
        </Text>
        <div className='relative mb-2 w-fit leading-10 md:mb-3'>
          <Text variant='md' size='bold' className='relative z-10'>
            Elevate Your
          </Text>
          <div className='absolute -bottom-1.5 w-56 -rotate-1 transform border-b-[10px] border-primary-700 opacity-80'></div>
        </div>
        <Text
          variant='md'
          size='bold'
          className='mb-5 leading-10 md:mb-8 md:leading-title-height'
        >
          Cocktail Game
        </Text>
        <Text variant='h3' className='mb-10'>
          Connect with premium brands, world-leading chefs, and expert
          mixologists creating the flavors of the future.
        </Text>
      </div>
    </div>
  )
}

export default LandingWorldClassDrinks
