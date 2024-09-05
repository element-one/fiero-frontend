import React, { useEffect, useMemo, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Tab } from '@headlessui/react'
import * as _ from 'lodash'

import { RewardCard } from '@components/Card'
import Layout from '@components/Layout/Layout'
import MobileHeading from '@components/Layout/MobileHeading'
import { EarnSkeletonCard } from '@components/Skeleton'
import { ModalType, useModal } from '@contexts/modal'
import { useGetRewards } from '@services/api'
import { useStore } from '@store/store'
import { ApiReward } from '@type/api'
import { isPastDate } from '@utils/utils'

const tabs = ['Active', 'All']

const RedeemPage: NextPage = () => {
  const router = useRouter()
  const { showModal } = useModal()
  const { id, filter: queryFilter } = router.query

  const [selectedReward, setSelectedReward] = useState<ApiReward | undefined>(
    undefined
  )
  const [isInit, setIsInit] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active'>('active')
  const [selectedTab, setSelectedTab] = useState(0)

  const userRewards = useStore((state) => state.rewards)
  const userReward = useStore((state) =>
    state.getUserReward(selectedReward?.id)
  )
  const setReward = useStore((state) => state.setReward)
  const setEventRewardSlots = useStore((state) => state.setEventRewardSlots)

  const { data: rewardsData, isLoading } = useGetRewards(
    queryFilter as string | undefined
  )

  useEffect(() => {
    const reward = rewardsData?.data?.find((reward) => reward.id === id)
    setSelectedReward(reward)
  }, [id, rewardsData?.data])

  useEffect(() => {
    if (!selectedReward) {
      return
    }

    if (selectedReward.isComing) {
      return
    }

    if (!isInit) {
      return;
    }

    setIsInit(false);

    if (!userReward) {
      setReward(selectedReward)

      if (selectedReward.type === 'raffle') {
        showModal(ModalType.RAFFLE_MODAL)
        return
      }

      if (selectedReward.type === 'spin') {
        const slots = selectedReward.spinPrizes.map((prize) => {
          return prize.name
        })
        setEventRewardSlots(slots)
        showModal(ModalType.SPIN_MODAL)
        return
      }

      showModal(ModalType.REDEEM_MODAL, false)
    } else {
      setReward(selectedReward)

      if (selectedReward.type === 'raffle') {
        showModal(ModalType.RAFFLE_SUCCESS_MODAL)
      }

      if (selectedReward.type === 'discount') {
        showModal(ModalType.DISCOUNT_SUCCESS_MODAL)
      }

      if (selectedReward.type === 'spin') {
        if (!userReward.isClaimed) {
          showModal(ModalType.SPIN_SUCCESS_MODAL)
          return
        }

        showModal(ModalType.SPIN_CLAIMED_MODAL)
      }

      if (selectedReward.type === 'qrcode') {
        if (userReward.isClaimed) {
          showModal(ModalType.QRCODE_SUCCESS_MODAL)
          return
        }

        if (userReward.isRedeemed) {
          showModal(ModalType.REDEEM_QR_CODE_MODAL)
          return
        }
      }

      if (selectedReward.type === 'merchandise') {
        showModal(ModalType.DELIVERY_INFO_MODAL)
      }
    }
  }, [selectedReward, setEventRewardSlots, setReward, showModal, userReward, isInit])

  const handleEarnTabChange = (index: number) => {
    setSelectedTab(index)
    if (index === 1) {
      setFilter('all')
    } else {
      setFilter('active')
    }
  }

  const rewards = useMemo(() => {
    if (filter === 'all')
      return _.orderBy(rewardsData?.data, 'createdAt', 'desc') || []
    if (filter === 'active') {
      const inactiveIds =
        userRewards?.map((userReward) => userReward.reward?.id) || []

      const rewards = rewardsData?.data.filter((reward) => {
        if (reward.expiredAt && isPastDate(reward.expiredAt)) {
          return false
        }

        if (!inactiveIds.includes(reward.id)) return true
      })

      return _.orderBy(rewards, 'createdAt', 'desc') || []
    }
  }, [filter, rewardsData, userRewards])

  return (
    <Layout>
      <div className='flex min-h-screen h-[100vh] overflow-y-auto w-full flex-col bg-bg-gray-yellow'>
        <MobileHeading />

        <div className='flex w-full flex-grow px-8 py-8'>
          {isLoading && (
            <div className='mt-8 hidden w-full grid-cols-4 gap-4 md:grid'>
              {Array.from(Array(4).keys()).map((item) => {
                return <EarnSkeletonCard key={item} />
              })}
            </div>
          )}
          {isLoading && (
            <div className='grid w-full grid-cols-1 gap-4 md:hidden'>
              {Array.from(Array(3).keys()).map((item) => {
                return <EarnSkeletonCard key={item} />
              })}
            </div>
          )}

          {!isLoading && (
            <div className='w-full'>
              <div className='flex w-full flex-row items-center justify-between'>
                <div className='font-[500]'>Rewards</div>
                <Tab.Group
                  onChange={handleEarnTabChange}
                  selectedIndex={selectedTab}
                >
                  <Tab.List className='flex space-x-1 bg-tab-bg p-1 rounded-full'>
                    {tabs.map((tabName) => (
                      <Tab
                        key={tabName}
                        className={({ selected }) =>
                          clsx(
                            'w-full rounded-full px-6 py-3 text-[15px] font-[600] leading-5 text-text-primary',
                            selected
                              ? 'bg-bg-primary text-text-white'
                              : 'text-text-primary hover:bg-bg-primary hover:text-text-white'
                          )
                        }
                      >
                        {tabName}
                      </Tab>
                    ))}
                  </Tab.List>
                </Tab.Group>
              </div>
              <div className='over-hidden mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
                {rewards?.map((reward) => {
                  return <RewardCard key={reward.id} reward={reward} />
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default RedeemPage
