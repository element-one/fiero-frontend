import { type HTMLAttributes } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { Text } from '@components/Text/index'
import { ApiBrand } from '@type/api'

interface BrandCardProps extends HTMLAttributes<HTMLDivElement> {
  brand: ApiBrand
}

export const BrandCard: React.FC<BrandCardProps> = ({
  brand,
  className,
  ...props
}) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/brand/${brand.slug}`)
  }

  return (
    <div
      className={clsx(
        'mb-[20px] flex h-auto w-full flex-col items-center  justify-center md:h-[284px] md:w-[180px]',
        className
      )}
      {...props}
    >
      <button
        className='flex w-full overflow-hidden rounded-xl md:h-[241px] md:w-[180px]'
        onClick={handleClick}
      >
        <Image
          src={brand.imageUrl || ''}
          alt='brand cover'
          width='0'
          height='0'
          sizes='100vw'
          className='w-full rounded-xl md:h-full'
          style={{ objectFit: 'fill' }}
        />
      </button>
      <Text
        variant='h3'
        className='mt-4 hidden text-center text-text-secondary md:flex'
      >
        {brand.name}
      </Text>
      <Text
        variant='b1'
        className='mt-4 flex text-center text-text-secondary md:hidden'
      >
        {brand.name}
      </Text>
    </div>
  )
}

export default BrandCard
