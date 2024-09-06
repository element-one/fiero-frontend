import React, { useEffect, useMemo, useRef } from 'react'
import { useClickAway } from 'react-use'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import Avatar from '@components/Avatar/Avatar'
import Button from '@components/Button/Button'
import NavButton from '@components/Button/NavButton'
import { LogOutIcon } from '@components/Icons/Logout'
import { UserSkeleton } from '@components/Skeleton/index'
import Text from '@components/Text/Text'
import { NAV_ITEMS } from '@config/constants'
import {
  postLogout,
  useGetMe,
  useGetUserEarns,
  useGetUserEventRewards,
  useGetUserHoldings,
  useGetUserRewards,
} from '@services/api'
import { useStore } from '@store/store'
import { useTempStore } from '@store/tempStore'
import { PageName } from '@type/navigation'
import { getEmailName } from '@utils/utils'
import { useAuth } from 'contexts/auth'
import { ModalType, useModal } from 'contexts/modal'

const Sidebar: React.FC = () => {
  const router = useRouter()
  const ref = useRef(null)

  const { isAuthenticated, setAuthenticated } = useAuth()
  const { showModal } = useModal()

  const {
    data: userData,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
  } = useGetMe(isAuthenticated)
  const { data: earnsData } = useGetUserEarns(isAuthenticated)
  const { data: rewardsData } = useGetUserRewards(isAuthenticated)
  const { data: eventRewardsData } = useGetUserEventRewards(isAuthenticated)
  const { data: holdingsData } =
    useGetUserHoldings(isAuthenticated)

  const pathname = usePathname()
  const user = useStore((state) => state.user)
  const setUser = useStore((state) => state.setUser)
  const removeUser = useStore((state) => state.removeUser)
  const setUserEarns = useStore((state) => state.setUserEarns)
  const setUserRewards = useStore((state) => state.setUserRewards)
  const setUserEventRewards = useStore((state) => state.setUserEventRewards)

  const setOpenDrawer = useStore((state) => state.setOpenDrawer)
  const isDrawerOpen = useStore((state) => state.isDrawerOpen)
  const setRedirectUrl = useStore((state) => state.setRedirectUrl)

  const { bonusShown, phoneNumberShown } = useTempStore((state) => ({ bonusShown: state.bonusShown, phoneNumberShown: state.phoneNumberModalShown }))

  const allHoldings = holdingsData?.holdings.reduce((pre, { points }) => {
    return pre + points
  }, 0) ?? 0;

  useEffect(() => {
    if (isAuthenticated && !isUserLoading && !userData?.user.phoneNumber && !user?.phoneNumber && !phoneNumberShown) {
      showModal(ModalType.PHONE_NUMBER_MODAL)
    }
  }, [userData, showModal, isUserLoading, phoneNumberShown, user?.phoneNumber, user, isAuthenticated])

  useEffect(() => {
    if (user?.bonus?.isCompleted && !user?.bonus?.isClaimed && !bonusShown) {
      showModal(ModalType.BONUS_MODAL)
    }
  }, [showModal, user?.bonus?.isClaimed, user?.bonus?.isCompleted, bonusShown])

  useEffect(() => {
    if (isAuthenticated && userData?.user) {
      setUser(userData.user)
      if (window.gtag) window.gtag('set', 'user_id', userData.user.id) // set user id in GA
    } else {
      removeUser()
    }
  }, [setUser, removeUser, isAuthenticated, userData])

  useEffect(() => {
    if (earnsData?.earns) {
      setUserEarns(earnsData.earns)
    }
  }, [isAuthenticated, setUserEarns, earnsData])

  useEffect(() => {
    if (rewardsData?.rewards) {
      setUserRewards(rewardsData.rewards)
    }
  }, [isAuthenticated, setUserRewards, rewardsData])

  useEffect(() => {
    if (eventRewardsData?.eventRewards) {
      setUserEventRewards(eventRewardsData.eventRewards)
    }
  }, [isAuthenticated, setUserEventRewards, eventRewardsData])

  useClickAway(ref, () => {
    setOpenDrawer(false)
  })

  const hasUnclaimed = useMemo(
    () =>
      user?.referrers.find(
        (referral) =>
          referral.isCompleted === true && referral.isClaimed === false
      ),
    [user]
  )

  const getActiveState = (pageName: PageName): boolean => {
    switch (pageName) {
      case 'Home':
        return pathname === '/'
      case 'My Profile':
        return pathname === '/profile'
      case 'Challenges':
        return pathname === '/contests'
      case 'Rewards':
        return pathname === '/prizes'
      case 'Brands':
        return pathname?.includes('/brand')
      case 'Events':
        return pathname?.includes('/event')
      default:
        break
    }
    return false
  }

  const handleLogin = () => {
    setRedirectUrl(router.asPath)
    showModal(ModalType.SIGN_IN_MODAL)
  }

  const handleGoToReferral = () => {
    router.push('/referral')
  }

  const renderUser = () => {
    if (!isAuthenticated) {
      return (
        <div className='flex h-full flex-col items-center'>
          <div className='flex h-[65px] w-[65px] items-center justify-center rounded-full p-2 shadow-md'>
            <Image
              priority
              src={'/png/fiero_logo.png'}
              alt='harpoon logo'
              width={80}
              height={40}
            />
          </div>
          <Text variant='h3' className='mt-2 font-[800] font-typewriter'>
            Guest
          </Text>
          <Button className='mt-4 w-4/5 md:w-full font-typewriter' onClick={handleLogin}>
            Log In
          </Button>
          <div className='mt-2 flex flex-row'>
            <Text variant='b2' className='mr-1 text-neutral-400'>
              To start earning
            </Text>
            <Image
              priority
              src={'/img/trophy.png'}
              alt='trophy'
              width={18}
              height={10}
            />
          </div>
        </div>
      )
    }

    if (user) {
      return (
        <div className='hidden flex-col items-center md:flex'>
          <div>
            <Avatar profile={user} />
          </div>
          <Text variant='h3' className='mt-2 font-[800] text-text-black'>
            {user?.firstName
              ? `${user?.firstName} ${user?.lastName}`
              : `${getEmailName(user?.email || 'User')}`}
          </Text>
          <div className='mt-2 flex flex-row space-x-1'>
            <span className='text-[14px] font-[800] text-text-primary'>
              {`${allHoldings} $FUN`}
            </span>
          </div>
        </div>
      )
    }

    if (isUserLoading && isUserFetching) {
      return <UserSkeleton />
    }
  }

  const handleLogout = async () => {
    try {
      const response = await postLogout()
      if (response.status === 200) {
        setAuthenticated(false)
        removeUser()
        router.push('/')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <aside
      ref={ref}
      className={clsx(
        'fixed bottom-0 top-0 z-50 font-typewriter grid w-64 self-start bg-bg-white shadow-lg duration-300 ease-in-out md:sticky',
        isDrawerOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      )}
      aria-label='Sidebar'
    >
      <button
        className='absolute right-3 top-4 md:right-8 md:hidden'
        onClick={() => {
          setOpenDrawer(false)
        }}
      >
        <img
          src={'/img/icon_x.png'}
          className='h-[32px] w-[32px] object-cover'
          alt='close'
        />
      </button>

      <nav className='flex h-100vh overflow-y-auto min-h-screen shrink-0 flex-col justify-between pb-4 pt-10 md:px-[22px] md:pb-4 md:pt-[64px]'>
        <div className='flex flex-col justify-start'>
          {renderUser()}
          <div className='mt-2 space-y-4 md:mt-4'>
            {NAV_ITEMS.map(({ name, path, icon, active }, index: number) => {
              if (path === '/profile' && !isAuthenticated) return null
              return (
                <NavButton
                  path={path}
                  key={path + index}
                  isSelected={getActiveState(name)}
                  isDisabled={!active}
                  icon={icon}
                >
                  {name}
                </NavButton>
              )
            })}
          </div>
          {userData?.user && (
            <div>
              <button
                onClick={handleGoToReferral}
                className='relative ml-16 mt-7 flex flex-row items-center justify-center space-x-1 overflow-hidden rounded-xl border border-border-3 bg-button-bg-1 py-[13px] pl-3 pr-4 md:ml-0'
              >
                <img
                  src='/png/gift_icon.png'
                  alt='glass gift'
                  className='h-6 w-6'
                />
                <div className='flex w-fit flex-col'>
                  <span className='ml-1 text-left text-[14px] font-[800] text-text-primary'>
                    Invite friends
                  </span>
                </div>
                {hasUnclaimed && (
                  <div className='absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500'></div>
                )}
              </button>
            </div>
          )}
        </div>
        {isAuthenticated && (
          <div className='mt-20 flex flex-col items-center justify-center'>
            <Link href='/' target='_blank'>
              <Image
                src='/png/fiero_logo.png'
                alt='fiero logo'
                width={70}
                height={36}
              />
            </Link>
            <div
              onClick={handleLogout}
              className='mt-10 flex cursor-pointer gap-1 rounded-xl bg-bg-gray px-[10px] py-[5px] font-[800]'
            >
              <span>LOG OUT</span>
              <LogOutIcon />
            </div>
          </div>
        )}
        <div className='mt-10 flex flex-col gap-4'>
          <p className='text-center text-[10px] font-[500] text-text-black'>
            Powered By{' '}
            <Link
              href='https://www.glass.fun'
              className='underline'
              target='_blank'
            >
              GLASS.fun
            </Link>
          </p>
          <p className='text-center text-[10px] font-[500] text-text-black'>
            <Link href='/tos'>Terms and Conditions</Link>
            <br />
            <Link href='/privacy'>Privacy Policy</Link>
          </p>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
