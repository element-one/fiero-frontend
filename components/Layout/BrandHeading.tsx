import React from 'react'

import { Text } from '@components/Text'
import { ApiBrand } from '@type/api'

interface BrandHeadingProps {
  brand?: ApiBrand
}

const BrandHeading: React.FC<BrandHeadingProps> = ({ brand }) => {
  return (
    <div className='relative z-0 flex flex-col lg:mb-14 lg:h-[330px]'>
      <img
        src={brand?.bannerUrl}
        className='z-0 h-[165px] w-full object-cover opacity-80 md:h-[250px]'
        alt='banner'
      />
      <div className='relative z-10 -mt-[40px] flex flex-col px-4 py-4 lg:flex-row lg:items-center lg:px-8 lg:py-0'>
        <div className='flex h-fit w-fit items-center justify-center rounded-full bg-black p-2'>
          <img
            src={brand?.iconUrl}
            className='h-[80px] w-[80px] rounded-full object-fill md:min-h-[156px] md:min-w-[156px]'
            alt='brand'
          />
        </div>

        <div className='mt-4 space-y-2 lg:absolute lg:left-[220px] lg:top-4 lg:mt-[30px]'>
          <Text size='bold' className='md:text-[30px]'>
            {brand?.title}
          </Text>
          <Text variant='b1' className='w-5/6 text-text-secondary'>
            {brand?.description}
          </Text>
        </div>
      </div>
    </div>
  )
}

export default BrandHeading
