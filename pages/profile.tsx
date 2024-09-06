import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import Button from '@components/Button/Button'
import { Footer } from '@components/Footer/Footer'
import Layout from '@components/Layout/Layout'
import MobileHeading from '@components/Layout/MobileHeading'
import { HoldingSkeleton } from '@components/Skeleton'
import ProfileSkeleton from '@components/Skeleton/ProfileSkeleton'
import SocialConnect from '@components/Social/SocialConnect'
import { Text } from '@components/Text'
import { useAuth } from '@contexts/auth'
import { ModalType, useModal } from '@contexts/modal'
import {
  useGetInstagramProfile,
  useGetMe,
  useGetTiktokProfile,
  useGetUserHoldings,
} from '@services/api/user'
import { useStore } from '@store/store'
import {
  formatMemberSince,
  getEmailName,
  isInstagramVerified,
  isTiktokVerified,
} from '@utils/utils'

const ProfilePage: NextPage = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { showModal } = useModal()

  const { data: userData, isLoading: isUserLoading } = useGetMe(isAuthenticated)
  const { data: holdingsData, isLoading: isHoldingsLoading } =
    useGetUserHoldings(isAuthenticated)

  const isInstagramConnected = isInstagramVerified(userData?.user)
  const { data: instagramData } = useGetInstagramProfile(isInstagramConnected)

  const isTiktokConnected = isTiktokVerified(userData?.user)
  const { data: tiktokData } = useGetTiktokProfile(isTiktokConnected)

  const user = useStore((state) => state.user)
  const setUser = useStore((state) => state.setUser)

  const allHoldings = holdingsData?.holdings.reduce((pre, { points }) => {
    return pre + points
  }, 0)

  const handleChangeAvatar = () => {
    showModal(ModalType.IMAGE_CROP_MODAL)
  }

  const handleGoToReferral = () => {
    router.push('/referral')
  }

  useEffect(() => {
    if (isAuthenticated && userData?.user) {
      setUser(userData.user)
    }
  }, [userData, setUser, isAuthenticated])

  return (
    <Layout>
      <div className='flex min-h-screen h-[100vh] overflow-y-auto w-full flex-col bg-bg-white'>
        <div className='bg-bg-black sticky top-0 z-10'>
          <MobileHeading />
        </div>
        <div className='relative h-[380px] shrink-0 w-full overflow-hidden bg-[url(/png/onboarding_bg.png)] bg-center bg-cover'>
          <div className='absolute bottom-[-150px] left-[-5%] h-[300px] w-[110%] rounded-[50%] bg-bg-white'></div>
        </div>
        <div className='flex flex-col px-4 md:flex-row md:space-x-8 md:px-20'>
          {isUserLoading && (
            <div className='mt-[-340px] flex h-[475px] w-full flex-col items-center justify-center rounded-xl py-6 md:py-0'>
              <ProfileSkeleton />
            </div>
          )}
          {userData && (
            <div className='relative mt-[-286px] flex w-full flex-col items-center justify-center overflow-hidden rounded-xl py-8'>
              <div className='relative h-[212px] w-[212px] rounded-full border-[4px] border-border-white shadow-sm'>
                <div className='h-full w-full rounded-full bg-bg-primary p-2'>
                  <img
                    src={user?.profileImageUrl || '/img/person.svg'}
                    className='h-full w-full rounded-full object-fill'
                    alt='avatar'
                  />
                </div>
                <Button
                  className='absolute bottom-1 right-1 flex h-12 w-12 items-center justify-center rounded-full bg-white p-0 shadow-lg'
                  onClick={handleChangeAvatar}
                >
                  <img
                    src='/img/pencil.png'
                    className='h-4 w-4 object-fill'
                    alt='pencil'
                  />
                </Button>
              </div>
              <Text variant='h1s' className='mt-6 text-text-black'>
                <span className='font-[600] font-knockout uppercase'>
                  {userData?.user.firstName
                    ? `${userData?.user.firstName} ${userData?.user.lastName}`
                    : `${getEmailName(userData?.user.email)}`}
                </span>
              </Text>
              <Text variant='b1' className='mt-2 text-text-black opacity-60 font-typewriter'>
                {`Heat Seeker Since ${formatMemberSince(userData?.user.createdAt)}`}
              </Text>

              <div className='mt-6 flex flex-col items-center justify-center gap-2'>
                <div className='my-6 flex flex-row w-[217px] h-[47px] items-center justify-center rounded-full border border-border-orange bg-bg-light px-4 py-2'>
                  <Text
                    variant='b3'
                    className='ml-2 text-center !text-[14px] text-text-light-orange font-typewriter'
                  >
                    🌶️ &nbsp;&nbsp;{`${isHoldingsLoading ? '-' : allHoldings} points earned`}
                  </Text>
                </div>

                <div
                  onClick={handleGoToReferral}
                  className='flex cursor-pointer w-[217px] h-[52px] items-center justify-center gap-2 rounded-full border border-border-primary px-6 py-[9px] text-text-primary'
                >
                  <img
                    src='/svg/profile-add.svg'
                    alt='profile add'
                    className='h-6 w-6'
                  />
                  <span className='text-[16px] font-[600] font-typewriter'>Invite Friends</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {isUserLoading && (
          <div className='px-4 py-8 md:px-20'>
            <HoldingSkeleton className='flex w-full' />
          </div>
        )}
        {!isUserLoading && (
          <div className='mt-[10px] flex items-center justify-center gap-2 md:gap-4 px-4 py-8 md:mt-[100px] md:gap-8 md:px-20 '>
            <SocialConnect
              socialType='instagram'
              mediaCount={instagramData?.profile.mediaCount ?? 0}
            />
            <div className='h-[70%] shrink-0 w-[2px] bg-bg-gray'></div>
            <SocialConnect
              socialType='tiktok'
              mediaCount={tiktokData?.profile.mediaCount ?? 0}
            />
            <div className='h-[70%] shrink-0 w-[2px] bg-bg-gray'></div>
            <SocialConnect socialType='twitter' />
          </div>
        )}

        <Footer className='md:hidden' />
      </div>
    </Layout>
  )
}

export default ProfilePage
