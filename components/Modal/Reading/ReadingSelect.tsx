import React, { useCallback } from 'react'
import { toast } from 'react-toastify'

import Button from '@components/Button/Button'
import { usePutEarnComplete } from '@services/api/index'
import { ApiEarn, ApiReading, ApiUserEarn } from '@type/api'

import ReadingProgress from './ReadingProgress'

interface ReadingSelectProps {
  earn: ApiEarn | undefined
  reading: ApiReading | undefined
  total: number
  index: number
  onCompleted: (userEarn: ApiUserEarn, index: number) => void
  onNext: (index: number) => void
}

export const ReadingSelect: React.FC<ReadingSelectProps> = ({
  earn,
  reading,
  total,
  index,
  onCompleted,
  onNext,
}) => {
  const { name, description, imageUrl } = reading || {}

  const { isLoading, mutate } = usePutEarnComplete(earn?.id, {
    onSuccess: (response) => {
      onCompleted(response.userEarn, index)
    },
    onError: (err) => {
      console.log(err)
      toast.error('Submit Failed')
    },
  })

  const handleNextOrSubmit = useCallback(async () => {
    if (reading) {
      if (index + 1 !== total) {
        onNext(index)
        return
      }

      mutate({
        earnId: earn?.id,
        payload: { answers: JSON.stringify({ readCount: index + 1 }) },
      })
    }
  }, [reading, index, total, mutate, earn?.id, onNext])

  return (
    <div className='flex flex-col items-center justify-center'>
      <ReadingProgress total={total} current={index} className='mb-[24px]' />
      <img src={imageUrl} alt='imageUrl' className='w-full object-contain' />
      <p className='mt-[40px] w-full font-poppins text-[26px] font-semibold text-neutral-0'>
        {name}
      </p>
      <p className='mt-[22px] h-[190px] w-full text-left font-poppins text-[16px] font-normal text-neutral-0 md:h-[150px] md:text-[18px]'>
        {description}
      </p>
      <Button
        onClick={handleNextOrSubmit}
        className='mt-[20px] h-[52px] w-[52px] rounded-full'
        isLoading={isLoading}
      >
        {index + 1 !== total && (
          <img src='/img/ic_next.svg' alt='next' className='w-[22px]' />
        )}
        {index + 1 === total && (
          <img src='/img/ic_next.svg' alt='next' className='w-[22px]' />
        )}
      </Button>
    </div>
  )
}

export default ReadingSelect
