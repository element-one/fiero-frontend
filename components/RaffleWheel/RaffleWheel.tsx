import React, { useState } from 'react'
import clsx from 'clsx'
import { AxiosError } from 'axios'

import { useAuth } from '@contexts/auth'
import { ModalType, useModal } from '@contexts/modal'
import { usePostRewardSpin } from '@services/api'
import { useStore } from '@store/store'
import gsap from 'gsap'

interface RaffleWheelProps {
  onSuccess?: (prized: string) => void
  disabled?: boolean
}

export const RaffleWheel: React.FC<RaffleWheelProps> = ({
  disabled,
  onSuccess,
}) => {
  const eventRewardSlots = useStore((state) => state.eventRewardSlots)
  const reward = useStore((state) => state.reward)
  const { mutateAsync: postRewardSpin } = usePostRewardSpin(reward?.id)
  const setUserReward = useStore(state => state.setUserReward)
  const { isAuthenticated } = useAuth()
  const { showModal } = useModal()
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

  const handleClick = async () => {
    if (!isAuthenticated) {
      showModal(ModalType.SIGN_IN_MODAL)
      return
    }

    if (!reward?.id) {
      return
    }

    const initTween = gsap.to('#raffleWheel', {
      rotate: 383,
      duration: 1,
      ease: 'linear',
      repeat: -1,
    })

    try {
      const result = await postRewardSpin({ id: reward.id })

      setUserReward(result.userReward);

      const rotate = 360 * 5 - (result.spinNumber + 1) * 45 + 23
      gsap.to('#raffleWheel', {
        rotate,
        duration: 6,
        ease: 'power3.out',
        onStart: () => {
          setTimeout(() => {
            initTween.kill()
          }, 2000)
        },
        onComplete: () => {
          onSuccess?.(result.isWinner ? result.name : '')
        },
      })
    } catch (error) {
      initTween.kill();

      const err = error as AxiosError<{ message: string; }>
      switch (err.response?.data.message) {
        case 'error.present-not-found':
          setErrorMessage('Present not found')
          break;
        case 'error.all-prizes-drawn':
          setErrorMessage('All prizes are sold out or expired')
          break;
      }
    }
  }

  return (
    <div
      className={clsx(
        'relative flex flex-col h-fit w-fit items-center justify-center',
        (disabled || !!errorMessage) ? 'pointer-events-none cursor-not-allowed opacity-60' : ''
      )}
    >
      <div
        className='h-[256px] w-[256px] rotate-[23deg] cursor-pointer bg-[url(/svg/raffle-wheel.svg)] bg-center bg-no-repeat'
        id='raffleWheel'
        onClick={handleClick}
      >
        {eventRewardSlots.map((slot, index) => {
          return (
            <div
              key={slot + index}
              className='absolute left-[98px] top-[17px] h-[114px] w-[60px] font-typewriter origin-bottom text-center text-b3 font-[800]'
              style={{ transform: `rotate(${index * 45 + 22.5}deg)` }}
            >
              {slot || 'None'}
            </div>
          )
        })}
      </div>
      <div className='absolute -top-[62px] ml-2 h-[82px] w-[48px] rotate-[8deg] bg-[url(/svg/raffle-wheel-arrow.svg)] bg-contain'></div>
      {errorMessage && (
        <div className='relative z-20 mt-4 p-2'>
          <span className='text-center text-[14px] text-text-primary opacity-60 font-typewriter'>
            {errorMessage}
          </span>
        </div>
      )}
    </div>
  )
}
