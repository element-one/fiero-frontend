import { type HTMLAttributes } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import { Text } from '@components/Text/index'
import { ModalType, useModal } from '@contexts/modal'
import { useStore } from '@store/store'
import { ApiBrand, ApiEarn } from '@type/api'
import { formatLiveAtDate } from '@utils/formatDate'
import { getDiffHours, isPastDate } from '@utils/utils'

interface EarnCardProps extends HTMLAttributes<HTMLDivElement> {
  brand: ApiBrand
  earn: ApiEarn
}

export const EarnCard: React.FC<EarnCardProps> = ({
  // brand,
  earn,
  className,
  ...props
}) => {
  const { showModal } = useModal()
  const setEarn = useStore((state) => state.setEarn)

  const { isClaimed, isCompleted } =
    useStore((state) => state.getUserEarn(earn?.id)) || {}

  let imgIcon = null
  if (earn.type === 'social') {
    const { earnSocial } = earn
    if (
      earnSocial?.type === 'twitter_follow' ||
      earnSocial?.type === 'twitter_like' ||
      earnSocial?.type === 'twitter_retweet'
    ) {
      imgIcon = '/img/twitter.svg'
    } else if (
      earnSocial?.type === 'instagram_follow' ||
      earnSocial?.type === 'instagram_post'
    ) {
      imgIcon = '/img/instagram.svg'
    } else if (
      earnSocial?.type === 'tiktok_follow' ||
      earnSocial?.type === 'tiktok_post'
    ) {
      imgIcon = '/svg/tiktok.svg'
    }
  } else if (earn.type === 'survey') {
    imgIcon = '/img/survey.svg'
  } else if (earn.type === 'referral') {
    imgIcon = '/img/referral.svg'
  } else if (earn.type === 'reading') {
    imgIcon = '/img/reading.svg'
  }

  const handleClick = () => {
    setEarn(earn)

    if (earn.type === 'social') {
      const { earnSocial } = earn

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

    if (earn.type === 'survey') {
      if (isClaimed) {
        showModal(ModalType.BADGE_MODAL)
      } else if (isCompleted) {
        showModal(ModalType.CLAIM_REWARDS_MODAL)
      } else {
        showModal(ModalType.SURVEY_CHALLENGE_MODAL)
      }
    }

    if (earn.type === 'referral') {
      showModal(ModalType.REFERRAL_CHALLENGE_MODAL)
    }

    if (earn.type === 'reading') {
      if (isClaimed) {
        showModal(ModalType.BADGE_MODAL)
      } else if (isCompleted) {
        showModal(ModalType.CLAIM_REWARDS_MODAL)
      } else {
        showModal(ModalType.READING_CHALLENGE_MODAL)
      }
    }

    if (earn.type === 'receipt') {
      if (isClaimed) {
        showModal(ModalType.BADGE_MODAL)
      } else if (isCompleted) {
        showModal(ModalType.CLAIM_REWARDS_MODAL)
      } else {
        showModal(ModalType.RECEIPT_MODAL)
      }
    }
  }

  return (
    <div
      className={clsx(
        'relative z-0 mb-5 flex cursor-pointer flex-col flex-wrap rounded-[20px] shadow-md bg-bg-white lg:w-[100%] lg:min-w-[284px]',
        earn?.expiredAt && isPastDate(earn.expiredAt) && 'cursor-not-allowed',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {getDiffHours(earn.expiredAt) ? (
        <div className='absolute right-2 top-2 z-20 flex h-[32px] flex-row items-center justify-center space-x-1 rounded-[32px] bg-neutral-800 pl-[6px] pr-[10px]'>
          <img src='/img/clock.svg' className='h-5 w-5' alt='claimed' />
          <Text size='medium' variant='b3'>
            {getDiffHours(earn.expiredAt)}
          </Text>
        </div>
      ) : null}
      {earn?.expiredAt && isPastDate(earn.expiredAt) ? (
        <div className='absolute right-2 top-2 z-20 flex h-[32px] flex-row items-center justify-center space-x-1 rounded-[32px] bg-neutral-800 pl-[6px] pr-[10px]'>
          <img src='/img/clock.svg' className='h-5 w-5' alt='active' />
          <Text size='medium' variant='b3'>
            Expired
          </Text>
        </div>
      ) : null}
      {isClaimed ? (
        <div className='absolute right-2 top-2 z-20 flex h-[32px] flex-row items-center justify-center space-x-1 rounded-[32px] bg-neutral-800 pl-[6px] pr-[10px]'>
          <img src='/img/done.svg' className='h-5 w-5' alt='claimed' />
          <Text size='medium' variant='b3'>
            Claimed
          </Text>
        </div>
      ) : null}
      {imgIcon ? (
        <div className='absolute left-2 top-2 z-20 flex items-center'>
          <img src={imgIcon} className='h-[30px] w-[30px]' alt='type' />
        </div>
      ) : null}
      <button className='relative flex h-[210px] w-full flex-wrap overflow-hidden rounded-lg'>
        <Image
          src={earn.imageUrl || ''}
          alt='earn cover'
          width='0'
          height='0'
          sizes='100vw'
          className='h-full w-full'
          style={{ objectFit: 'cover' }}
        />
        {earn?.liveAt && (
          <div className='absolute left-4 top-4 rounded-md bg-bg-yellow px-2 py-1 text-[12px] font-[600]'>
            LIVE on {formatLiveAtDate(earn.liveAt)}
          </div>
        )}
      </button>
      <div className='absolute bottom-0 left-[10px] mx-auto mb-[-20px] font-typewriter flex w-[calc(100%-20px)] flex-col justify-between rounded-lg bg-bg-primary px-6 pb-4 pt-5 shadow-lg'>
        <div className='absolute -top-4 right-4 flex h-[36px] flex-row items-center rounded-full bg-bg-white px-[8px]'>
          🌶️&nbsp;
          <span className='ml-[8px] pr-2 text-text-black text-[12px] font-semibold'>
            {earn.points}
          </span>
        </div>
        <Text
          variant='h3'
          size='semibold'
          className='mt-2 line-clamp-2 flex w-full items-center overflow-hidden text-[17px]'
        >
          <span className='block max-h-[54px] w-full overflow-hidden text-ellipsis text-[16px] text-text-white'>
            {earn.name}
          </span>
        </Text>
      </div>
    </div>
  )
}

export default EarnCard
