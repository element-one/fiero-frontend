import React from 'react'
import { toast } from 'react-toastify'
import clsx from 'clsx'

import Button from '@components/Button/Button'
import { Text } from '@components/Text'
import { ModalType, useModal } from '@contexts/modal'
import { usePutClaimReferral } from '@services/api'
import { useStore } from '@store/store'
import { ApiUserReferral } from '@type/api'

interface ReferralItemProps {
  referral: ApiUserReferral
}

export const ReferralItem: React.FC<ReferralItemProps> = ({ referral }) => {
  const { isAccepted, isClaimed, isCompleted, id } = referral
  const { showModal } = useModal()

  const setUser = useStore((store) => store.setUser)

  const { mutate: claimReferral, isLoading } = usePutClaimReferral(id, {
    onSuccess: (response) => {
      setUser(response.user)
      showModal(ModalType.CLAIM_REFERRAL_SUCCESS_MODAL)
    },
    onError: () => {
      toast.error('Failed to claim referral reward')
    },
  })

  const handleClaim = () => {
    if (isCompleted) {
      claimReferral()
    }
  }

  return (
    <div className='mt-[14px] font-typewriter flex h-10 w-full flex-row items-center justify-between'>
      <Text
        variant='b1'
        className='mr-2 font-typewriter flex h-full w-full items-center rounded-full border border-border-orange bg-bg-white px-4 text-text-black'
      >
        {referral.email}
      </Text>
      {(!isCompleted || isClaimed) && (
        <div
          className={clsx(
            'flex h-full w-[127px] items-center justify-center rounded-full bg-btn-gray-500',
            isAccepted && 'cursor-default bg-btn-gray-500',
            isCompleted && 'cursor-default bg-btn-gray-500 ',
            isClaimed && 'cursor-default bg-btn-green-700'
          )}
        >
          <Text
            variant='b2'
            size='medium'
            className={clsx(
              'text-text-gray font-typewriter',
              isAccepted && 'text-text-gray',
              !isAccepted && !isClaimed && !isCompleted && 'text-neutral-1000',
              isClaimed ? 'text-text-green-300' : 'text-neutral-1000'
            )}
          >
            {isClaimed
              ? 'Claimed'
              : isCompleted
                ? 'Claim'
                : isAccepted
                  ? 'Accepted'
                  : 'Sent'}
          </Text>
        </div>
      )}
      {isCompleted && !isClaimed && (
        <Button
          className='flex h-full w-[127px] cursor-pointer bg-bg-primary items-center rounded-full'
          onClick={handleClaim}
          isLoading={isLoading}
        >
          <Text variant='b2' size='medium' className='text-text-white font-typewriter'>
            Claim Rewards
          </Text>
        </Button>
      )}
    </div>
  )
}

export default ReferralItem
