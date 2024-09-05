import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import Loading from '@components/Loading/Loading'
import { Text } from '@components/Text'
import { usePutEventRewardRedeem } from '@services/api/event'

const RedeemPage: NextPage = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )
  const router = useRouter()
  const { qr } = router.query

  const {
    mutate: redeemReward,
    data: rewardData,
    isLoading,
  } = usePutEventRewardRedeem(qr as string, {
    onSuccess() {
      setIsSuccess(true)
    },
    onError(error) {
      console.log(error.response.data)
      const { message } = error.response.data
      if (message === 'error.event-reward-already-redeemed') {
        setErrorMessage('Already redeemed this reward.')
      } else {
        setErrorMessage('Something went wrong')
      }
    },
  })

  useEffect(() => {
    if (qr) redeemReward()
  }, [qr, redeemReward])

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center bg-neutral-900'>
      {isLoading && <Loading />}
      {!isLoading && isSuccess && (
        <div className='flex flex-col items-center justify-center'>
          <img src='/svg/success_redeem.svg' alt='success' />
          <Text className='mt-4'>Successfully redeemed</Text>
          <Text variant='h3' className='mt-4'>
            Redeemed Count: {`${rewardData?.count}`}
          </Text>
        </div>
      )}
      {!isLoading && !isSuccess && (
        <div className='flex flex-col items-center justify-center'>
          <img src='/svg/fail_redeem.svg' alt='success' />
          <Text className='mt-4'>{errorMessage}</Text>
        </div>
      )}
    </div>
  )
}

export default RedeemPage
