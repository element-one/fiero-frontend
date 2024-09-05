import React, { useEffect, useState } from 'react'
import { type NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Tab } from '@headlessui/react'

import Button from '@components/Button/Button'
import { EarnCard } from '@components/Card'
import EventRewardCard from '@components/Card/EventReward'
import Layout from '@components/Layout/Layout'
import { EarnSkeletonCard } from '@components/Skeleton'
import EventSkeleton from '@components/Skeleton/EventSkeleton'
import { Text } from '@components/Text'
import { ModalType, useModal } from '@contexts/modal'
import { useGetEventBySlug } from '@services/api/event'
import { useStore } from '@store/store'
import { ApiEventReward } from '@type/api'

export interface EventPageProps {} // eslint-disable-line

const mainTabs = ['Earn', 'Redeem']

const EventPagePage: NextPage<EventPageProps> = () => {
  const { showModal } = useModal()
  const router = useRouter()
  const { slug, signup, tab, id } = router.query

  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedReward, setSelectedReward] = useState<
    ApiEventReward | undefined
  >(undefined)

  const user = useStore((store) => store.user)

  const eventReward = useStore((store) => store.eventReward)
  const setEventReward = useStore((state) => state.setEventReward)
  const userEventReward = useStore((state) =>
    state.getUserEventReward(eventReward?.id)
  )

  const { data: eventData, isLoading } = useGetEventBySlug(slug as string)

  useEffect(() => {
    const reward = eventData?.event.eventRewards.find(
      (reward) => reward.id === id
    )
    if (reward) {
      setEventReward(reward)
      setSelectedReward(reward)
    }
  }, [eventData?.event.eventRewards, id, setEventReward])

  useEffect(() => {
    if (!eventReward || !id) return

    setSelectedTab(1)

    if (userEventReward) {
      if (eventReward.type === 'raffle') {
        showModal(ModalType.EVENT_RAFFLE_SUCCESS_MODAL)
      } else if (eventReward.type === 'merchandise') {
        showModal(ModalType.REDEEM_QR_CODE_MODAL)
      } else if (eventReward.type === 'custom') {
        if (userEventReward?.eventRewardCustom?.email) {
          showModal(ModalType.EVENT_CUSTOM_CONGRATS_MODAL)
        } else {
          showModal(ModalType.EVENT_CUSTOM_INFO_MODAL)
        }
      }
    } else {
      // one time event
      if (slug === 'punkxmas') {
        showModal(ModalType.PUNK_MODAL)
        return
      }

      showModal(ModalType.REDEEM_REWARD_MODAL)
    }
  }, [
    eventReward,
    id,
    selectedReward,
    setEventReward,
    showModal,
    slug,
    userEventReward,
  ])

  useEffect(() => {
    if (signup) {
      showModal(ModalType.SIGN_IN_MODAL)
    }
  }, [showModal, signup])

  useEffect(() => {
    if (tab === 'redeem') setSelectedTab(1)
  }, [tab])

  return (
    <Layout>
      <div className='relative flex min-h-screen w-full flex-col items-center bg-neutral-900 md:items-start'>
        <div className='absolute z-0 h-[237px] w-full md:h-[573px]'>
          {eventData?.event?.headerUrl && (
            <img
              src={eventData.event.headerUrl}
              alt='header'
              className='absolute z-0 h-[237px] w-full object-cover md:h-[373px]'
            />
          )}
          <div className='absolute z-10 h-[237px] w-full bg-bottomToTop md:h-[373px]' />
        </div>
        <div className='z-10 w-full'>
          <Button
            onClick={() => {
              router.push('/')
            }}
            className='bg-transparent hover:bg-transparent active:bg-transparent'
          >
            <img
              src='/img/arrow_left.svg'
              className='mt-5 w-[27px]'
              alt='back'
            />
          </Button>
        </div>
        {!isLoading && (
          <div className='z-10 mt-5 flex flex-col items-start px-[46px]'>
            <Text size='semibold' variant='h1' className=''>
              {eventData?.event.name}
            </Text>
            <Text size='normal' variant='h3' className='mt-[8px] opacity-80'>
              {eventData?.event.description}
            </Text>
            {/* <Text size='medium' variant='b1' className='mt-[8px]'>
              {moment(eventData?.event.eventAt).format('LLL')}
            </Text>
            <div className='mt-[8px] flex flex-row items-center justify-start space-x-[8px]'>
              <img
                src='/img/ic_nav.svg'
                className='h-[18px] w-[18px]'
                alt='nav'
              />
              <Text size='medium' variant='b1' className=''>
                {eventData?.event.location}
              </Text>
            </div> */}
            <div className='mt-[20px] flex flex-row justify-start space-x-[22px]'>
              {eventData?.event.rsvp && (
                <Link href={eventData?.event.rsvp || ''} target='_blank'>
                  <div className='mt-[20px] flex flex-row items-center justify-start space-x-2 rounded-md border border-white p-2'>
                    <img
                      src='/img/ic_world.svg'
                      className='w-[24px]'
                      alt='world'
                    />
                    <Text size='medium' variant='b3'>
                      Register on the event site
                    </Text>
                  </div>
                </Link>
              )}
              {!isLoading &&
                user?.email &&
                ['rick@glass.fun', 'zoe@glass.fun', 'ellie@glass.fun'].includes(
                  user?.email
                ) && (
                  <Link href={`/event/raffle/${slug}`}>
                    <div className='mt-[20px] flex flex-row items-center justify-start space-x-2 rounded-md border border-white p-2'>
                      <Text size='medium' variant='b3'>
                        Admin Raffle
                      </Text>
                    </div>
                  </Link>
                )}
            </div>
          </div>
        )}
        {isLoading && <EventSkeleton className='flex w-full' />}
        <Tab.Group manual selectedIndex={selectedTab} onChange={setSelectedTab}>
          <div className='z-10 mt-6 flex w-full flex-col justify-between self-start px-5 md:mt-[50px] md:w-full'>
            <Tab.List
              className={
                'flex h-[54px] w-full items-center justify-center md:w-2/5'
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
            <div className='hidden w-full px-0 md:flex'>
              <div className=' h-[2px] w-full bg-gray-700' />
            </div>
            <Text
              size='bold'
              variant='h2s'
              className='px-0 pt-5  text-[20px] md:text-[22px]'
            >
              {selectedTab ? 'Redeem' : 'Earn'}
            </Text>
          </div>
          <Tab.Panels className='h-full w-full'>
            <Tab.Panel>
              {isLoading && (
                <div className='mt-8 hidden w-full flex-1 grid-cols-4 gap-4 px-4 md:grid'>
                  {Array.from(Array(4).keys()).map((item) => {
                    return <EarnSkeletonCard key={item} />
                  })}
                </div>
              )}
              {isLoading && (
                <div className='mt-8 grid w-full grid-cols-1 gap-4 px-4 md:hidden'>
                  {Array.from(Array(3).keys()).map((item) => {
                    return <EarnSkeletonCard key={item} />
                  })}
                </div>
              )}
              {!isLoading && (
                <div className='grid grid-cols-1 gap-6 px-6 py-8 md:mt-[50px] md:grid-cols-2 md:px-4 md:py-2 lg:grid-cols-3 2xl:grid-cols-4'>
                  {eventData?.event.earns?.map((earn) => {
                    return (
                      <EarnCard key={earn.id} brand={earn.brand} earn={earn} />
                    )
                  })}
                </div>
              )}
            </Tab.Panel>
            <Tab.Panel>
              {isLoading && (
                <div className='mt-8 hidden w-full flex-1 grid-cols-4 gap-4 px-4 md:grid'>
                  {Array.from(Array(4).keys()).map((item) => {
                    return <EarnSkeletonCard key={item} />
                  })}
                </div>
              )}
              {isLoading && (
                <div className='mt-8 grid w-full grid-cols-1 gap-4 px-4 md:hidden'>
                  {Array.from(Array(3).keys()).map((item) => {
                    return <EarnSkeletonCard key={item} />
                  })}
                </div>
              )}
              {!isLoading && (
                <div className='grid grid-cols-1 gap-6 px-6 py-8 md:mt-[50px] md:grid-cols-2 md:px-4 md:py-2 lg:grid-cols-3 2xl:grid-cols-4'>
                  {eventData?.event.eventRewards?.map((reward) => {
                    return (
                      <EventRewardCard key={reward.id} eventReward={reward} />
                    )
                  })}
                </div>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </Layout>
  )
}

export default EventPagePage
