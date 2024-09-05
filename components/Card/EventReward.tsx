import { type HTMLAttributes } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import { Text } from '@components/Text/index'
import { ModalType, useModal } from '@contexts/modal'
import { useStore } from '@store/store'
import { ApiEventReward } from '@type/api'
import { getDiffHours } from '@utils/utils'

interface EventRewardCardProps extends HTMLAttributes<HTMLDivElement> {
  eventReward: ApiEventReward
}

export const EventRewardCard: React.FC<EventRewardCardProps> = ({
  eventReward,
  className,
  ...props
}) => {
  const { showModal } = useModal()

  const setEventReward = useStore((state) => state.setEventReward)
  const userEventReward = useStore((state) =>
    state.getUserEventReward(eventReward?.id)
  )

  const handleClick = () => {
    if (eventReward.isComing) {
      return
    }

    if (userEventReward) {
      setEventReward(userEventReward?.eventReward)

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
      setEventReward(eventReward)
      showModal(ModalType.REDEEM_REWARD_MODAL)
    }
    return
  }

  return (
    <div
      className={clsx(
        'relative z-0 flex flex-col flex-wrap rounded-[20px] bg-neutral-800 pb-[15px] shadow-lg md:w-[100%] md:min-w-[284px]',
        !eventReward.isComing && 'cursor-pointer',
        eventReward.isComing && 'cursor-not-allowed',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {getDiffHours(eventReward?.expiredAt) ? (
        <div className='absolute right-2 top-2 flex h-[32px] flex-row items-center justify-center space-x-1 rounded-[32px] bg-neutral-800 pl-[6px] pr-[10px]'>
          <img src='/img/clock.svg' className='h-5 w-5' alt='claimed' />
          <Text size='medium' variant='b3'>
            {getDiffHours(eventReward.expiredAt)}
          </Text>
        </div>
      ) : null}
      {userEventReward ? (
        <div className='absolute right-2 top-2 flex h-[32px] flex-row items-center justify-center space-x-1 rounded-[32px] bg-neutral-800 pl-[6px] pr-[10px]'>
          <img src='/img/done.svg' className='h-5 w-5' alt='claimed' />
          <Text size='medium' variant='b3'>
            {eventReward.type === 'raffle' ? 'Entered' : 'Redeemed'}
          </Text>
        </div>
      ) : null}
      <div className='x-0 y-0 flex h-[210px] w-full flex-wrap overflow-hidden rounded-t-lg'>
        <Image
          src={eventReward?.imageUrl || ''}
          alt='reward cover'
          width='0'
          height='0'
          sizes='100vw'
          className='w-full'
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className='mt-[-19px] flex flex-row items-center justify-between px-[8px]'>
        <div className='flex h-[36px] flex-row items-center rounded-full bg-neutral-1100 px-[8px]'>
          <img src={'/img/points.svg'} className='h-[28px]' alt='brand cover' />
          <Text variant='b1' className='ml-[8px] pr-2 text-white'>
            {eventReward?.points}
          </Text>
        </div>
      </div>
      <div className='mb-2 flex w-full flex-col justify-between px-4 text-white'>
        <Text
          variant='h3'
          size='semibold'
          className='mt-2 line-clamp-2 flex w-full items-center overflow-hidden text-[17px]'
        >
          <span className='line block max-h-[54px] w-full overflow-hidden text-ellipsis'>
            {eventReward?.name}
          </span>
        </Text>
      </div>
    </div>
  )
}

export default EventRewardCard
