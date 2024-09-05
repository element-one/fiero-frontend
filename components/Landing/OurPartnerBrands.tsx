import clsx from 'clsx'

import Text from '@components/Text/Text'

const BrandItem = ({
  imageName,
  title,
  opacityImage,
}: {
  imageName: string
  title: string
  opacityImage?: string
}) => (
  <div className={clsx('mb-6 flex flex-col md:mb-0', opacityImage)}>
    <img
      src={`/img/${imageName}.png`}
      alt={title}
      className='mb-2 h-[275px] w-[180px] rounded-xl border-transparent object-cover'
    />
    <Text variant='h3' className='text-center text-text-secondary'>
      {title}
    </Text>
  </div>
)
const LandingOurPartnerBrands = () => {
  return (
    <div className='flex w-full flex-row flex-wrap items-center justify-center md:px-20'>
      <div className='mb-10 flex w-full flex-row flex-wrap items-end justify-center md:mb-14'>
        <Text variant='md' size='bold' className='mr-2 leading-title-height'>
          Our Partner
        </Text>
        <div className='relative mb-3 w-fit leading-10'>
          <Text variant='md' size='bold' className='relative z-10'>
            Brands
          </Text>
          <div className='absolute -bottom-1.5 w-full -rotate-1 transform border-b-[10px] border-primary-700 opacity-80'></div>
        </div>
      </div>
      <div className='mb-2 grid grid-cols-2 gap-x-6 md:grid-cols-6'>
        {/* <BrandItem imageName='glass_lobos_1707' title='Lobos 1707' /> */}
        <BrandItem imageName='glass_lyons_wine' title='Lyons Wine' />
        <BrandItem imageName='glass_junipero_gin' title='Junipero Gin' />
        <BrandItem imageName='glass_fiero' title='Fiero Tequila' />
        <BrandItem
          imageName='glass_wine_coming_soon'
          title='Coming Soon'
          opacityImage='opacity-20'
        />
        <BrandItem
          imageName='glass_wine_coming_soon'
          title='Coming Soon'
          opacityImage='opacity-10'
        />
      </div>
      <Text
        variant='h3'
        className='w-full text-center text-text-secondary opacity-30'
      >
        and many more coming soon ...
      </Text>
    </div>
  )
}

export default LandingOurPartnerBrands
