import Image from 'next/image'

import { Text } from '@components/Text'

const LandingPointsThatGoWherever = () => {
  return (
    <div className='mt-10 flex w-full flex-row flex-wrap-reverse bg-cover px-6 md:mt-44 md:bg-[url("/img/glass_drinks_section_background.png")] md:bg-[50%] md:px-20 md:pb-[30rem] md:pt-[22rem]'>
      <div className='flex basis-full flex-col justify-center md:basis-1/2'>
        <Text
          variant='h2'
          size='extrabold'
          className='mb-4 italic text-primary-400 md:mb-2'
        >
          Tickets that go wherever you do
        </Text>
        <div className='relative mb-2 w-fit leading-10 md:mb-3'>
          <Text
            variant='md'
            size='bold'
            className='relative z-10 leading-[60px]'
          >
            Earn Everywhere
          </Text>
          <div className='absolute -bottom-1.5 w-56 -rotate-1 transform border-b-[10px] border-primary-700 opacity-80'></div>
        </div>
        <Text
          variant='md'
          size='bold'
          className='mb-5 leading-10 md:leading-title-height'
        >
          Drinks Are Enjoyed
        </Text>
        <Text variant='h3' className='mb-10'>
          Earn by registering online and offline purchases,
          <br className='hidden md:block' /> getting friends together, visiting
          bars, and joining <br className='hidden md:block' />
          other social challenges.
        </Text>
      </div>
      <div className='mb-10 basis-full md:mb-0 md:basis-1/2'>
        <Image
          priority
          src={'/img/glass_points_that_go_wherever.png'}
          alt='Mojito image'
          width={718}
          height={322}
        />
      </div>
    </div>
  )
}

export default LandingPointsThatGoWherever
