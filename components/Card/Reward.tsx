import { type HTMLAttributes } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import { Text } from '@components/Text/index'
import { ModalType, useModal } from '@contexts/modal'
import { useStore } from '@store/store'
import { ApiReward } from '@type/api'
import { formatLiveAtDate } from '@utils/formatDate'
import { getDiffHours } from '@utils/utils'

interface RewardCardProps extends HTMLAttributes<HTMLDivElement> {
  reward: ApiReward
}

export const RewardCard: React.FC<RewardCardProps> = ({
  reward,
  className,
  ...props
}) => {
  const { showModal } = useModal()

  const setReward = useStore((state) => state.setReward)
  const userReward = useStore((state) => state.getUserReward(reward?.id))
  const setEventRewardSlots = useStore((state) => state.setEventRewardSlots)

  const handleClick = () => {
    if (reward.isComing) {
      return
    }

    if (!userReward) {
      setReward(reward)

      if (reward.type === 'raffle') {
        showModal(ModalType.RAFFLE_MODAL)
        return
      }

      if (reward.type === 'spin') {
        const slots = reward.spinPrizes.map((prize) => {
          return prize.name
        })

        setEventRewardSlots(slots)
        showModal(ModalType.SPIN_MODAL)
        return
      }

      showModal(ModalType.REDEEM_MODAL, false)
    } else {
      setReward(reward)

      if (reward.type === 'raffle') {
        showModal(ModalType.RAFFLE_SUCCESS_MODAL)
      }

      if (reward.type === 'discount') {
        showModal(ModalType.DISCOUNT_SUCCESS_MODAL)
      }

      if (reward.type === 'merchandise') {
        if (userReward.delivery) {
          showModal(ModalType.DELIVERY_CONGRATS_MODAL)
          return
        }
        showModal(ModalType.DELIVERY_INFO_MODAL)
      }

      if (reward.type === 'spin') {
        if (!userReward.isClaimed) {
          showModal(ModalType.SPIN_SUCCESS_MODAL)
          return
        }

        showModal(ModalType.SPIN_CLAIMED_MODAL)
      }

      if (reward.type === 'qrcode') {
        if (userReward.isRedeemed) {
          showModal(ModalType.QRCODE_SUCCESS_MODAL)
          return
        }

        showModal(ModalType.REDEEM_QR_CODE_MODAL)
      }
    }
  }

  return (
    <div
      className={clsx(
        'relative z-0 mb-5 flex flex-col flex-wrap rounded-[20px] bg-bg-white md:w-[100%] md:min-w-[284px]',
        !reward.isComing && 'cursor-pointer',
        reward.isComing && 'cursor-not-allowed grayscale-[50%]',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {getDiffHours(reward?.expiredAt) ? (
        <div className='absolute right-2 top-2 z-10 flex h-[32px] flex-row items-center justify-center space-x-1 rounded-[32px] bg-bg-white pl-[6px] pr-[10px]'>
          <img src='/img/clock.svg' className='h-5 w-5' alt='claimed' />
          <Text size='medium' variant='b3'>
            {getDiffHours(reward.expiredAt)}
          </Text>
        </div>
      ) : null}
      {userReward ? (
        <div className='absolute right-2 top-2 z-10 flex h-[32px] flex-row items-center justify-center space-x-1 rounded-[32px] bg-bg-primary pl-[6px] pr-[10px] text-text-black'>
          <img src='/img/done.svg' className='h-5 w-5' alt='claimed' />
          <Text size='medium' variant='b3'>
            Redeemed
          </Text>
        </div>
      ) : null}
      <div className='relative flex h-[210px] w-full flex-wrap overflow-hidden rounded-lg'>
        <Image
          src={reward?.imageUrl || ''}
          alt='reward cover'
          width='0'
          height='0'
          sizes='100vw'
          className='h-full w-full'
          style={{ objectFit: 'cover' }}
        />
        {reward?.liveAt && (
          <div className='absolute left-4 top-4 rounded-md bg-bg-yellow px-2 py-1 text-[12px] font-[600]'>
            LIVE on {formatLiveAtDate(reward.liveAt)}
          </div>
        )}
      </div>

      <div className='absolute bottom-0 left-[10px] mx-auto mb-[-20px] flex w-[calc(100%-20px)] flex-col justify-between rounded-lg bg-bg-white px-6 pb-4 pt-5 shadow-lg'>
        <div className='absolute -top-4 right-4 flex h-[36px] flex-row items-center rounded-full bg-bg-primary px-[8px]'>
          <img
            src={'/png/icon-can.png'}
            className='h-[24px]'
            alt='brand cover'
          />
          <Text variant='b1' className='ml-[8px] pr-2 text-white text-[12px] font-semibold'>
            {reward?.points}
          </Text>
        </div>
        <Text
          variant='h3'
          size='semibold'
          className='mt-2 line-clamp-2 flex w-full items-center overflow-hidden text-[17px]'
        >
          <span className='block max-h-[54px] w-full overflow-hidden text-ellipsis text-[16px] text-text-black'>
            {reward?.name}
          </span>
        </Text>
        <Text
          variant='b2'
          size='medium'
          className='block max-h-[54px] w-full overflow-hidden text-ellipsis text-[16px] text-text-black'
        >
          {reward?.restriction}
        </Text>
      </div>
    </div>
  )
}

export default RewardCard
