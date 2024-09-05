import React, { useCallback } from 'react'
import { toast } from 'react-toastify'
import { Tooltip } from 'flowbite-react'
import * as _ from 'lodash'

import Button from '@components/Button/Button'
import { Text } from '@components/Text'
import { usePutEarnClaim } from '@services/api'
import { useStore } from '@store/store'
import { ApiEarn, ApiUserEarn, ApiUserReferral } from '@type/api'

interface ReferralTaskProps {
  earn?: ApiEarn
  userEarn?: ApiUserEarn
  referral: ApiUserReferral
  onComplete?: () => void
}

export const ReferralTask: React.FC<ReferralTaskProps> = ({
  earn,
  userEarn,
  referral,
}) => {
  const setUserEarn = useStore((state) => state.setUserEarn)

  const invite = _.get(userEarn?.invites, referral?.id || '')
  const isInvited = _.get(invite, 'isInvited', true)
  const isAccepted = _.get(invite, 'isAccepted')
  const isCompleted = _.get(invite, 'isCompleted')
  const isClaimed = _.get(invite, 'isClaimed')

  const { mutate, isLoading: isClaimLoading } = usePutEarnClaim(earn?.id, {
    onSuccess: (response) => {
      setUserEarn(response.userEarn)
    },
    onError: () => {
      toast.error('Failed to claim earn')
    },
  })

  const handleClaim = useCallback(async () => {
    mutate({ earnId: earn?.id, payload: { referralId: referral?.id || '' } })
  }, [earn?.id, mutate, referral?.id])

  return (
    <div className='flex flex-row justify-between'>
      <div className='flex w-full flex-row items-center justify-between space-x-4'>
        <div>
          <Text variant='b1' className='text-text-secondary'>
            {referral.email}
          </Text>
        </div>
        {isInvited && !isAccepted && !isCompleted && (
          <div className='flex h-10 w-[120px] flex-row items-center justify-center rounded-[8px] bg-neutral-600'>
            <Text variant='b2' className='text-center text-text-secondary'>
              Invite Sent
            </Text>
          </div>
        )}
        {isAccepted && (
          <div className='flex flex-col items-end'>
            <div className='flex h-10 w-[120px] flex-row items-center justify-center rounded-[8px] bg-dark-green'>
              <Text variant='b2' className='text-center text-secondary-200'>
                Invite accepted
              </Text>
            </div>
            <div className='relative mt-1 flex flex-row items-center justify-center'>
              <Text variant='b2' size='normal' className='text-text-secondary'>
                Rewards pending
              </Text>
              <Tooltip
                content={
                  <Text
                    variant='b2'
                    size='normal'
                    className='w-[300px] text-text-secondary'
                  >
                    Once your friend completes their first challenge from this
                    brand, you’ll be able to claim your tickets.
                  </Text>
                }
                placement='bottom'
              >
                <img
                  src='/img/prompt.png'
                  className='ml-2 h-[18px] w-[18px]'
                  alt='prompt'
                />
              </Tooltip>
            </div>
          </div>
        )}
        {isCompleted && !isClaimed && (
          <Button
            className='w-auto'
            type='submit'
            onClick={handleClaim}
            isLoading={isClaimLoading}
          >
            Claim Rewards
          </Button>
        )}
        {isClaimed && (
          <div className='flex h-10 w-[120px] flex-row items-center justify-center rounded-[8px] bg-dark-green'>
            <Text variant='b2' className='text-center text-secondary-200'>
              Rewards Claimed
            </Text>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReferralTask
