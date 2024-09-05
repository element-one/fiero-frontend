import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { useCopyToClipboard } from 'react-use'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Tab } from '@headlessui/react'

import IconButton from '@components/Button/IconButton'
import Layout from '@components/Layout/Layout'
import MobileHeading from '@components/Layout/MobileHeading'
import { Text } from '@components/Text'
import { useStore } from '@store/store'

const ReferralItem = dynamic(
  () => import('@components/Modal/Referral/ReferralItem'),
  { ssr: false }
)

const ReferralPage: NextPage = () => {
  const [referral, setReferralUrl] = useState('')
  const [selectedTab, setSelectedTab] = useState(0)

  const [, copyToClipboard] = useCopyToClipboard()

  const user = useStore((state) => state.user)

  const totalPoints = useMemo(() => {
    const claimed =
      user?.referrers.filter((referral) => !!referral.isClaimed) || []
    return claimed.reduce((total, referral) => total + referral.points, 0)
  }, [user])

  const claimed = useMemo(() => {
    return user?.referrers.filter((referral) => !!referral.isClaimed) || []
  }, [user])
  const completed = useMemo(() => {
    return (
      user?.referrers.filter(
        (referral) => !!referral.isCompleted && !referral.isClaimed
      ) || []
    )
  }, [user])
  const accepted = useMemo(() => {
    return (
      user?.referrers.filter(
        (referral) => !!referral.isAccepted && !referral.isCompleted
      ) || []
    )
  }, [user])

  const handleCopy = () => {
    copyToClipboard(referral)
    toast.success('copied!')
  }

  useEffect(() => {
    if (user) {
      setReferralUrl(
        `${process.env.NEXT_PUBLIC_WEB_URL}/signup?referralCode=${user.referralCode}`
      )
    }
  }, [user])

  return (
    <Layout>
      <div className='flex min-h-screen h-[100vh] overflow-y-auto w-full flex-col bg-bg-white'>
        <div className='bg-bg-red sticky top-0 z-10'>
          <MobileHeading />
        </div>
        <div className='flex flex-col items-center justify-center bg-bg-red pt-3'>
          <Text
            variant='h1s'
            className='mt-[45px] line-clamp-2 px-7 text-center text-[24px] text-white md:w-[530px]'
          >
            <span className='font-[600]'>
              Invite friends to
              <br />
              Harpoon Rewards
            </span>
          </Text>
          <img
            src='/png/ticket_icon.png'
            className='my-4 mt-[-60px] h-[342px]'
            alt='congrats'
          />
          <Text
            variant='b1'
            size='medium'
            className='mt-[-30px] px-4 text-center !text-[14px] text-text-white md:w-[440px] md:px-6'
          >
            {`You and your friend will each get 150 points once your friend joined.`}
          </Text>
          <div className=' mx-4 mt-[28px] flex w-fit flex-row items-center justify-between space-x-5 rounded-full border-[1px] border-gray-600 bg-bg-white px-4 py-[14px] md:mx-0 md:w-[373px]'>
            <div className='flex max-w-[280px] text-center text-[13px] font-[600] text-text-black'>
              <span className=' w-full'>{referral}</span>
            </div>
            <IconButton
              className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bg-primary p-2'
              onClick={handleCopy}
            >
              <img
                src='/img/duplicate.svg'
                alt='duplicate'
                className='h-8 w-8 object-contain'
              />
            </IconButton>
          </div>
          <div className='mt-[34px] h-[50px] w-full overflow-hidden'>
            <div className='ml-[-10%] h-[100px] w-[120%] rounded-[50%] bg-bg-white ' />
          </div>
          <div className='flex w-full bg-bg-white'>
            <div className='mx-auto mt-[-20px] flex w-full flex-col items-start justify-start bg-bg-white px-5 md:w-[520px] md:px-0'>
              <div className='w-full'>
                <Tab.Group
                  manual
                  selectedIndex={selectedTab}
                  onChange={setSelectedTab}
                >
                  <Tab.List
                    className={
                      'my-5 flex h-12 w-full items-center justify-center border-b-[1px]  font-[600] text-text-black text-opacity-80'
                    }
                  >
                    <Tab
                      className={`${selectedTab == 0
                        ? 'border-border-primary text-text-primary'
                        : 'opacity-80'
                        } ui-selected:bg-transparent border-b-[2px] h-full w-full bg-transparent text-[14px] outline-none  hover:border-border-primary  hover:text-text-primary focus:border-b-[2px] focus:border-border-primary focus:text-text-primary`}
                    >
                      Claim Rewards
                    </Tab>
                    <Tab
                      className={`${selectedTab == 1
                        ? 'border-border-primary text-text-primary'
                        : 'opacity-80'
                        } ui-selected:bg-transparent border-b-[2px] h-full w-full  bg-transparent text-[14px] outline-none hover:border-border-primary  hover:text-text-primary focus:border-b-[2px] focus:border-border-primary focus:text-text-primary`}
                    >
                      Claimed
                    </Tab>
                    <Tab
                      className={`${selectedTab == 2
                        ? 'border-border-primary text-text-primary'
                        : 'opacity-80'
                        } ui-selected:bg-transparent border-b-[2px] h-full w-full  bg-transparent text-[14px] outline-none hover:border-border-primary  hover:text-text-primary focus:border-b-[2px] focus:border-border-primary focus:text-text-primary`}
                    >
                      Accepted
                    </Tab>
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel>
                      <div className='w-full'>
                        <Text
                          variant='b1'
                          size='medium'
                          className='w-full text-left text-text-black'
                          suppressHydrationWarning
                        >
                          {totalPoints} points earned
                        </Text>
                        {completed.map((referral) => (
                          <ReferralItem key={referral.id} referral={referral} />
                        ))}
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <div className='w-full'>
                        <Text
                          variant='b1'
                          size='medium'
                          className='w-full text-left text-text-black'
                          suppressHydrationWarning
                        >
                          {totalPoints} points earned
                        </Text>
                        {claimed.map((referral) => (
                          <ReferralItem key={referral.id} referral={referral} />
                        ))}
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <div className='w-full'>
                        <Text
                          variant='b1'
                          size='medium'
                          className='w-full text-left text-text-black'
                          suppressHydrationWarning
                        >
                          {totalPoints} points earned
                        </Text>
                        {accepted.map((referral) => (
                          <ReferralItem key={referral.id} referral={referral} />
                        ))}
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ReferralPage
