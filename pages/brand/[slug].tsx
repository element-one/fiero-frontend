import React, { useEffect, useMemo, useState } from 'react'
import { type NextPage } from 'next'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Tab } from '@headlessui/react'
import * as _ from 'lodash'

import CallAction from '@components/CallAction/CallAction'
import { EarnCard, RewardCard } from '@components/Card'
// import BrandFilter from '@components/Filter/BrandFilter'
import BrandHeading from '@components/Layout/BrandHeading'
import Layout from '@components/Layout/Layout'
import MobileHeading from '@components/Layout/MobileHeading'
import { EarnSkeletonCard } from '@components/Skeleton'
import { Text } from '@components/Text'
import { ModalType, useModal } from '@contexts/modal'
import { useGetBrandBySlug } from '@services/api'
import { useStore } from '@store/store'
import { isPastDate } from '@utils/utils'

export interface BrandEarnPageProps { } // eslint-disable-line

const mainTabs = ['Earn', 'Redeem']
const tabs = ['Active', 'All']

const BrandEarnPage: NextPage<BrandEarnPageProps> = () => {
  const { showModal } = useModal()
  const router = useRouter()
  const { slug, signup } = router.query
  const { data: brandData, isLoading } = useGetBrandBySlug(slug as string)

  const userEarns = useStore((state) => state.earns)
  const userRewards = useStore((state) => state.rewards)

  const [filter, setFilter] = useState<'all' | 'active'>('active')
  const [rewardFilter, setRewardFilter] = useState<'all' | 'active'>('active')

  const earns = useMemo(() => {
    if (filter === 'all')
      return _.orderBy(brandData?.brand?.earns, 'createdAt', 'desc') || []
    if (filter === 'active') {
      const inactive = userEarns?.filter((userEarn) => {
        if (userEarn.isClaimed) return true
        return false
      })

      const inactiveIds = inactive?.map((userEarn) => userEarn.earn.id) || []

      const earns = brandData?.brand.earns.filter((earn) => {
        if (earn.expiredAt && isPastDate(earn.expiredAt)) {
          return false
        }

        if (!inactiveIds.includes(earn.id)) return true
      })

      return _.orderBy(earns, 'createdAt', 'desc') || []
    }
  }, [brandData?.brand?.earns, filter, userEarns])

  const rewards = useMemo(() => {
    if (rewardFilter === 'all')
      return _.orderBy(brandData?.brand?.rewards, 'createdAt', 'desc') || []
    if (rewardFilter === 'active') {
      const inactiveIds =
        userRewards?.map((userReward) => userReward.reward?.id) || []

      const rewards = brandData?.brand?.rewards?.filter((reward) => {
        if (reward.expiredAt && isPastDate(reward.expiredAt)) {
          return false
        }

        if (!inactiveIds.includes(reward.id)) return true
      })

      return _.orderBy(rewards, 'createdAt', 'desc') || []
    }
  }, [brandData?.brand?.rewards, rewardFilter, userRewards])

  const [selectedTab, setSelectedTab] = useState(0)

  const handleEarnTabChange = (index: number) => {
    if (index === 1) {
      setFilter('all')
    } else {
      setFilter('active')
    }
  }

  const handleRewardTabChange = (index: number) => {
    if (index === 1) {
      setRewardFilter('all')
    } else {
      setRewardFilter('active')
    }
  }

  useEffect(() => {
    if (signup) {
      showModal(ModalType.SIGN_IN_MODAL)
    }
  }, [showModal, signup])

  return (
    <Layout>
      <div className='flex min-h-screen h-[100vh] overflow-y-auto w-full flex-col bg-neutral-900'>
        <MobileHeading />
        <BrandHeading brand={brandData?.brand} />

        <CallAction
          className='mt-4 md:mt-14'
          isEarn={!selectedTab}
          callAction={brandData?.brand.callAction}
        />

        <Tab.Group manual selectedIndex={selectedTab} onChange={setSelectedTab}>
          <div className='mt-4 flex w-full flex-col items-center justify-start px-5 md:items-start md:px-0'>
            <Tab.List
              className={
                'mx-5 flex h-12 w-full items-center justify-center p-1 text-white md:w-1/3'
              }
            >
              {mainTabs.map((tabName, index) => (
                <Tab
                  key={tabName}
                  className={({ selected }) =>
                    clsx(
                      'h-[54px] w-full text-[16px] font-medium sm:leading-5 sm:text-text-inactive',
                      'md:ui-selected:bg-transparent md:bg-transparent md:outline-none md:hover:border-b-[2px] md:hover:border-primary-700 md:hover:text-primary-400 md:focus:border-b-[2px] md:focus:border-primary-700 md:focus:text-primary-400',
                      (index === 0 && 'rounded-l-lg md:rounded-none') ||
                      'rounded-r-lg md:rounded-none',
                      selected
                        ? 'bg-primary-400 font-semibold text-neutral-1000 md:border-b-[2px] md:border-primary-700 md:text-primary-400'
                        : 'border-[1px] border-gray-700 text-white sm:hover:bg-tab-active-bg sm:hover:text-white md:border-0 md:text-white'
                    )
                  }
                >
                  {tabName}
                </Tab>
              ))}
            </Tab.List>
            <div className='mt-[2px] hidden w-full px-[24px] md:flex'>
              <div className='h-[2px] w-full bg-gray-700' />
            </div>
            <div className='flex w-full flex-row items-center justify-between'>
              <Text
                size='bold'
                variant='h2s'
                className='px-2 py-5  text-[20px] md:px-6 md:text-[22px]'
              >
                {selectedTab ? 'Redeem' : 'Earn'}
              </Text>
              {selectedTab === 0 && (
                <Tab.Group
                  onChange={handleEarnTabChange}
                  selectedIndex={(filter === 'all' && 1) || 0}
                >
                  <Tab.List className='mx-5 hidden h-[45px] w-1/3 space-x-1 rounded-xl bg-tab-bg p-1 md:flex md:w-[400px]'>
                    {tabs.map((tabName) => (
                      <Tab
                        key={tabName}
                        className={({ selected }) =>
                          clsx(
                            'w-full rounded-lg text-[15px] font-medium leading-5 text-text-inactive',
                            selected
                              ? 'bg-tab-active-bg text-white'
                              : 'text-text-inactive hover:bg-tab-active-bg hover:text-white'
                          )
                        }
                      >
                        {tabName}
                      </Tab>
                    ))}
                  </Tab.List>
                </Tab.Group>
              )}
              {selectedTab === 1 && (
                <Tab.Group
                  onChange={handleRewardTabChange}
                  selectedIndex={(rewardFilter === 'all' && 1) || 0}
                >
                  <Tab.List className='mx-5 hidden h-[45px] w-1/3 space-x-1 rounded-xl bg-tab-bg p-1 md:flex md:w-[400px]'>
                    {tabs.map((tabName) => (
                      <Tab
                        key={tabName}
                        className={({ selected }) =>
                          clsx(
                            'w-full rounded-lg text-[15px] font-medium leading-5 text-text-inactive',
                            selected
                              ? 'bg-tab-active-bg text-white'
                              : 'text-text-inactive hover:bg-tab-active-bg hover:text-white'
                          )
                        }
                      >
                        {tabName}
                      </Tab>
                    ))}
                  </Tab.List>
                </Tab.Group>
              )}
            </div>
          </div>
          <Tab.Panels className='px-[30px] text-white md:px-4'>
            <Tab.Panel>
              <div className='w-full'>
                <Tab.Group
                  onChange={handleEarnTabChange}
                  selectedIndex={(filter === 'all' && 1) || 0}
                >
                  <Tab.List className='flex h-[45px] w-full space-x-1 rounded-xl bg-tab-bg p-[2px] md:hidden'>
                    {tabs.map((tabName) => (
                      <Tab
                        key={tabName}
                        className={({ selected }) =>
                          clsx(
                            'w-full rounded-lg text-[15px] font-medium leading-5 text-text-inactive',
                            selected
                              ? 'bg-tab-active-bg text-white'
                              : 'text-text-inactive hover:bg-tab-active-bg hover:text-white'
                          )
                        }
                      >
                        {tabName}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel>
                      {isLoading && (
                        <div className='hidden w-full grid-cols-4 gap-4 md:mt-[50px] md:grid'>
                          {Array.from(Array(4).keys()).map((item) => {
                            return <EarnSkeletonCard key={item} />
                          })}
                        </div>
                      )}
                      {isLoading && (
                        <div className='mt-8 grid w-full grid-cols-1 gap-4 md:hidden'>
                          {Array.from(Array(3).keys()).map((item) => {
                            return <EarnSkeletonCard key={item} />
                          })}
                        </div>
                      )}
                      {!isLoading && (
                        <div className='grid grid-cols-1 gap-6 px-0 py-8 md:mt-[20px] md:grid-cols-2 md:px-4 md:py-1 lg:grid-cols-3 2xl:grid-cols-4'>
                          {earns?.map((earn) => {
                            return (
                              <EarnCard
                                key={earn.id}
                                brand={earn.brand}
                                earn={earn}
                              />
                            )
                          })}
                        </div>
                      )}
                    </Tab.Panel>
                    <Tab.Panel>
                      {isLoading && (
                        <div className='hidden w-full grid-cols-4 gap-4 md:mt-[50px] md:grid'>
                          {Array.from(Array(4).keys()).map((item) => {
                            return <EarnSkeletonCard key={item} />
                          })}
                        </div>
                      )}
                      {isLoading && (
                        <div className='mt-8 grid w-full grid-cols-1 gap-4 md:hidden'>
                          {Array.from(Array(3).keys()).map((item) => {
                            return <EarnSkeletonCard key={item} />
                          })}
                        </div>
                      )}
                      {!isLoading && (
                        <div className='grid grid-cols-1 gap-6 px-0 py-8 md:mt-[50px] md:grid-cols-2 md:px-4 md:py-2 lg:grid-cols-3 2xl:grid-cols-4'>
                          {earns?.map((earn) => {
                            return (
                              <EarnCard
                                key={earn.id}
                                brand={earn.brand}
                                earn={earn}
                              />
                            )
                          })}
                        </div>
                      )}
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </Tab.Panel>
            <Tab.Panel className='min-h-screen'>
              <div className='w-full'>
                <Tab.Group
                  onChange={handleRewardTabChange}
                  selectedIndex={(rewardFilter === 'all' && 1) || 0}
                >
                  <Tab.List className='flex h-[45px] w-full space-x-1 rounded-xl bg-tab-bg p-[2px] md:hidden'>
                    {tabs.map((tabName) => (
                      <Tab
                        key={tabName}
                        className={({ selected }) =>
                          clsx(
                            'w-full rounded-lg text-[15px] font-medium leading-5 text-text-inactive',
                            selected
                              ? 'bg-tab-active-bg text-white'
                              : 'text-text-inactive hover:bg-tab-active-bg hover:text-white'
                          )
                        }
                      >
                        {tabName}
                      </Tab>
                    ))}
                  </Tab.List>
                </Tab.Group>
                <div className='mt-[50px] grid grid-cols-1 gap-6 px-0 md:grid-cols-2 md:px-4 md:py-0 lg:grid-cols-3 2xl:grid-cols-4'>
                  {rewards?.map((reward) => {
                    return <RewardCard key={reward.id} reward={reward} />
                  })}
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </Layout>
  )
}

export default BrandEarnPage
