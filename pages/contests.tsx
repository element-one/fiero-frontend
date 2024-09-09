import React, { useEffect, useMemo, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Tab } from '@headlessui/react'
import * as _ from 'lodash'

import { EarnCard } from '@components/Card'
import Layout from '@components/Layout/Layout'
import MobileHeading from '@components/Layout/MobileHeading'
import { EarnSkeletonCard } from '@components/Skeleton'
import { useAuth } from '@contexts/auth'
import { ModalType, useModal } from '@contexts/modal'
import { useGetEarns, usePutEarnComplete } from '@services/api'
import { useStore } from '@store/store'
import { ApiEarn } from '@type/api'
import { isPastDate } from '@utils/utils'

const tabs = ['Active', 'All']

const ChallengesPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { isAuthenticated } = useAuth()

  const { showModal } = useModal()

  const [selectedEarn, setSelectedEarn] = useState<ApiEarn | undefined>(
    undefined
  )
  const [filter, setFilter] = useState<'all' | 'active'>('active')
  const [selectedTab, setSelectedTab] = useState(0)

  const { data: earnsData, isLoading } = useGetEarns()

  const userEarns = useStore((state) => state.earns)
  const setEarn = useStore((state) => state.setEarn)
  const { receiptCache, removeReceipt } = useStore((state) => ({
    receiptCache: state.receiptCache,
    removeReceipt: state.removeReceiptCache,
  }))
  const setUserEarn = useStore((state) => state.setUserEarn)

  const { mutate: putEarnComplete } = usePutEarnComplete(receiptCache?.earnId, {
    onSuccess: async (response) => {
      setUserEarn(response.userEarn)
      showModal(ModalType.CLAIM_REWARDS_MODAL)
      removeReceipt()
    },
  })

  const { isClaimed, isCompleted } =
    useStore((state) => state.getUserEarn(selectedEarn?.id)) || {}

  useEffect(() => {
    const earn = earnsData?.data?.find((earn) => earn.id === id)
    setSelectedEarn(earn)
  }, [earnsData?.data, id])

  useEffect(() => {
    if (!isAuthenticated) return

    const earn = earnsData?.data?.find(
      (earn) => earn.id === receiptCache?.earnId
    )
    setSelectedEarn(earn)
  }, [receiptCache?.earnId, isAuthenticated, earnsData?.data])

  useEffect(() => {
    if (!selectedEarn) return

    setEarn(selectedEarn)

    if (selectedEarn.type === 'social') {
      const { earnSocial } = selectedEarn

      if (
        earnSocial?.type === 'twitter_follow' ||
        earnSocial?.type === 'twitter_like' ||
        earnSocial?.type === 'twitter_retweet'
      ) {
        if (isClaimed) {
          showModal(ModalType.BADGE_MODAL)
        } else if (isCompleted) {
          showModal(ModalType.CLAIM_REWARDS_MODAL)
        } else {
          showModal(ModalType.TWITTER_CHALLENGE_MODAL)
        }
      }

      if (
        earnSocial?.type === 'instagram_follow' ||
        earnSocial?.type === 'instagram_post'
      ) {
        if (isClaimed) {
          showModal(ModalType.BADGE_MODAL)
        } else if (isCompleted) {
          showModal(ModalType.CLAIM_REWARDS_MODAL)
        } else {
          showModal(ModalType.INSTAGRAM_CHALLENGE_MODAL)
        }
      }

      if (
        earnSocial?.type === 'tiktok_follow' ||
        earnSocial?.type === 'tiktok_post'
      ) {
        if (isClaimed) {
          showModal(ModalType.BADGE_MODAL)
        } else if (isCompleted) {
          showModal(ModalType.CLAIM_REWARDS_MODAL)
        } else {
          showModal(ModalType.TIKTOK_CHALLENGE_MODAL)
        }
      }
    }

    if (selectedEarn.type === 'survey') {
      if (isClaimed) {
        showModal(ModalType.BADGE_MODAL)
      } else if (isCompleted) {
        showModal(ModalType.CLAIM_REWARDS_MODAL)
      } else {
        showModal(ModalType.SURVEY_CHALLENGE_MODAL)
      }
    }

    if (selectedEarn.type === 'referral') {
      showModal(ModalType.REFERRAL_CHALLENGE_MODAL)
    }

    if (selectedEarn.type === 'reading') {
      if (isClaimed) {
        showModal(ModalType.BADGE_MODAL)
      } else if (isCompleted) {
        showModal(ModalType.CLAIM_REWARDS_MODAL)
      } else {
        showModal(ModalType.READING_CHALLENGE_MODAL)
      }
    }

    if (selectedEarn.type === 'receipt') {
      if (!isCompleted && receiptCache?.earnId && receiptCache.receiptId) {
        putEarnComplete({
          earnId: receiptCache.earnId,
          payload: {
            userReceiptId: receiptCache.receiptId,
          },
        })
      } else if (!isClaimed) {
        showModal(ModalType.CLAIM_REWARDS_MODAL)
      }
    }
  }, [
    id,
    isClaimed,
    isCompleted,
    putEarnComplete,
    receiptCache?.earnId,
    receiptCache?.receiptId,
    selectedEarn,
    setEarn,
    showModal,
  ])

  const handleEarnTabChange = (index: number) => {
    setSelectedTab(index)
    if (index === 1) {
      setFilter('all')
    } else {
      setFilter('active')
    }
  }

  const earns = useMemo(() => {
    if (filter === 'all')
      return _.orderBy(earnsData?.data, 'createdAt', 'desc') || []
    if (filter === 'active') {
      const inactive = userEarns?.filter((userEarn) => {
        if (userEarn.isClaimed) return true
        return false
      })

      const inactiveIds = inactive?.map((userEarn) => userEarn.earn.id) || []

      const earns = earnsData?.data.filter((earn) => {
        if (earn.expiredAt && isPastDate(earn.expiredAt)) {
          return false
        }

        if (!inactiveIds.includes(earn.id)) return true
      })

      return _.orderBy(earns, 'createdAt', 'desc') || []
    }
  }, [earnsData, filter, userEarns])

  return (
    <Layout>
      <div className='flex min-h-screen h-[100vh] overflow-y-auto w-full flex-col bg-bg-white'>
        <MobileHeading />

        <div className='flex w-full flex-grow px-4 md:px-8 py-8'>
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
                <div className='font-[500] text-[30px] uppercase font-knockout'>Challenges</div>
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
                            'w-full rounded-full font-typewriter px-6 py-3 text-[15px] font-[600] leading-5 text-text-primary',
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
                {earns?.map((earn) => {
                  return (
                    <EarnCard key={earn.id} brand={earn.brand} earn={earn} />
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default ChallengesPage
