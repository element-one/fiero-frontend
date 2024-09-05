import React from 'react'
import type { NextPage } from 'next'

import { BrandCard } from '@components/Card'
import Heading from '@components/Layout/Heading'
import Layout from '@components/Layout/Layout'
import MobileHeading from '@components/Layout/MobileHeading'
import { BrandSkeletonCard } from '@components/Skeleton'
import { useGetBrands } from '@services/api/brand'

const BrandPage: NextPage = () => {
  const { data, isLoading } = useGetBrands()

  return (
    <Layout>
      <div className='flex min-h-screen h-[100vh] overflow-y-auto w-full flex-col bg-neutral-900'>
        <MobileHeading />
        <Heading
          title='Brands'
          description='The best brands in the beverage world'
          className='mt-10 px-8'
        />
        <div className='flex px-8 py-8'>
          {isLoading && (
            <div>
              <div className='grid grid-cols-3 gap-4 md:hidden'>
                {Array.from(Array(3).keys()).map((item) => {
                  return <BrandSkeletonCard key={item} />
                })}
              </div>
            </div>
          )}
          {isLoading && (
            <div className='hidden grid-cols-6 gap-4 md:grid'>
              {Array.from(Array(6).keys()).map((item) => {
                return <BrandSkeletonCard key={item} />
              })}
            </div>
          )}
          {!isLoading && (
            // <div>
            <div className='flex flex-grow flex-col items-center md:grid md:grid-cols-2 md:grid-rows-1 md:justify-between md:gap-4 xl:grid-cols-3 xl:gap-4 2xl:grid-cols-4 2xl:gap-3'>
              {data?.data.map((brand) => {
                return <BrandCard key={brand.id} brand={brand} />
              })}
            </div>
            // </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default BrandPage
