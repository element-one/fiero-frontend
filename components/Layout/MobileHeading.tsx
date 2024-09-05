import React from 'react'

import Avatar from '@components/Avatar/Avatar'
import { HeaderMenuIcon } from '@components/Icons/HeaderMenu'
import { useAuth } from '@contexts/auth'
import { Image } from '@nextui-org/react'
import { useGetMe, useGetUserHoldings } from '@services/api'
import { useStore } from '@store/store'

interface MobileHeadingProps { } // eslint-disable-line

const MobileHeading: React.FC<MobileHeadingProps> = ({ }) => {
  const { isAuthenticated } = useAuth()

  const { data: userData, isLoading: isUserLoading } = useGetMe(isAuthenticated)
  const { data: holdingsData } =
    useGetUserHoldings(isAuthenticated)

  const user = useStore((state) => state.user)
  const setOpenDrawer = useStore((state) => state.setOpenDrawer)
  const isDrawerOpen = useStore((state) => state.isDrawerOpen)

  const allHoldings = holdingsData?.holdings.reduce((pre, { points }) => {
    return pre + points
  }, 0) ?? 0

  return (
    <div className='mx-auto mt-4 sticky z-10 top-0 left-[3%] flex h-[66px] w-[94%] flex-row items-center justify-between rounded-full bg-bg-white p-3 shadow-lg md:hidden'>
      <div
        onClick={() => setOpenDrawer(!isDrawerOpen)}
        className='flex flex-col items-center justify-center rounded-full bg-bg-gray p-3'
      >
        <HeaderMenuIcon />
      </div>

      <Image
        src='/png/fiero_logo.png'
        alt='fiero logo'
        width={64}
        height={34}
        className='z-[1] rounded-none'
      />

      {!isUserLoading && user ? (
        <div className='flex font-typewriter flex-row items-center gap-2 relative'>
          <div className='flex flex-col items-center justify-center text-text-primary text-[12px] absolute left-[-40px]'>
            <div className='h-[14px] leading-[14px] text-[14px]'>{allHoldings}</div>
            <div className='h-[14px] leading-[14px]'>$FUN</div>
          </div>

          <div className='flex flex-col items-center'>
            <Avatar profile={userData?.user} />
          </div>
        </div>
      ) : (
        <div className='w-[46px]'></div>
      )}
    </div>
  )
}

export default MobileHeading
