import React, { useCallback, useMemo, useState } from 'react'
import clsx from 'clsx'

import Button from '@components/Button/Button'
import Text from '@components/Text/Text'
import { ApiSocial } from '@type/api'
import { isTrue } from '@utils/utils'

interface TiktokTaskProps {
  isPosted?: boolean
  isCompleted?: boolean
  isPending?: boolean
  social?: ApiSocial
  onComplete?: (postUrl?: string) => void
  errorMessage?: string
  isLoading?: boolean
}

export const TiktokTask: React.FC<TiktokTaskProps> = ({
  isPosted,
  isPending,
  isCompleted,
  social,
  onComplete,
  errorMessage,
  isLoading
}) => {
  const [postUrl, setPostUrl] = useState("")
  const handleClick = useCallback(async () => {
    onComplete && onComplete(postUrl)
  }, [onComplete, postUrl])

  const getButtonText = useMemo(() => {
    switch (social?.type) {
      case 'tiktok_follow':
        return 'Follow'
      default:
        return isPosted ? 'Refresh' : 'Post'
    }
  }, [isPosted, social?.type])

  const getTitleText = useMemo(() => {
    switch (social?.type) {
      case 'tiktok_follow':
        return 'Follow us on Tiktok'
      default:
        return isPosted
          ? 'Click Refresh to verify your posting'
          : 'Share your video on Tiktok'
    }
  }, [isPosted, social?.type])

  const getUrlPath = useMemo(() => {
    switch (social?.type) {
      case 'tiktok_follow':
        return `https://www.tiktok.com`

      case 'tiktok_post':
        return `https://www.tiktok.com`

      default:
        return 'https://www.tiktok.com'
    }
  }, [social])

  return (
    <div className='flex w-full flex-col items-center justify-between rounded-[10px] border border-white border-opacity-20 p-4'>
      {!isPosted && (
        <div className='flex flex-col items-center py-2'>
          <img
            src={'/svg/tiktok.svg'}
            className='h-[98px] w-[98px] shadow-xl rounded-full'
            alt='tiktok'
          />
          <div className='w-8/10 mt-6'>
            <Text
              variant='h23'
              className='line-clamp-2 flex-grow text-center !font-[600] text-text-black'
            >
              {getTitleText}
            </Text>
          </div>
        </div>
      )}
      {!isCompleted &&
        !isPending &&
        (isPosted ? (
          isTrue(process.env.NEXT_PUBLIC_TIKTOK_ENABLED) ?
            <button
              className='mt-4 mb-2 flex items-center justify-center rounded-full bg-bg-primary px-4 w-[190px] h-[52px]'
              onClick={handleClick}
            >
              <Text
                variant='b1'
                className='min-w-[180px] text-center text-text-white'
              >
                <span className='font-[600]'>{getButtonText}</span>
              </Text>
            </button>
            : (
              <div className='flex items-center justify-center flex-col'>
                <img
                  src={'/svg/tiktok.svg'}
                  className='h-[98px] w-[98px] shadow-xl rounded-full'
                  alt='tiktok'
                />
                <div className='flex items-center gap-2 mt-4'>
                  <div>Post URL:</div>
                  <input className='border rounded px-2 h-10 w-[280px]' value={postUrl} onChange={(e) => setPostUrl(e.target.value)} />
                </div>

                {!!errorMessage && <div className='text-text-pink mt-1 text-[14px]'>{errorMessage}</div>}

                <Button
                  className={
                    clsx(
                      'my-3 flex w-[190px] items-center justify-center rounded-full bg-bg-primary h-[52px]',
                      !postUrl && 'cursor-not-allowed opacity-60'
                    )
                  }
                  onClick={handleClick}
                  disabled={!postUrl}
                  isLoading={isLoading}
                >
                  <Text
                    variant='b1'
                    className='text-center text-text-white'
                  >
                    <span className='font-[800]'>Complete</span>
                  </Text>
                </Button>
              </div>
            )
        ) : (
          <a
            href={getUrlPath}
            target='_blank'
            rel='noopener noreferrer'
            className='mt-4 mb-2 flex items-center justify-center rounded-full bg-bg-primary px-4 w-[190px] h-[52px]'
            onClick={handleClick}
          >
            <Text
              variant='b1'
              className='min-w-[180px] text-center text-text-white'
            >
              <span className='font-[600]'>{getButtonText}</span>
            </Text>
          </a>
        ))}
      {isPending && (
        <div className='my-3 flex w-full flex-row items-center justify-center rounded-[8px]  bg-text-disabled bg-opacity-50 px-4 py-[10px] md:w-auto'>
          <Text variant='b1' className='text-text-secondary'>
            Pending
          </Text>
        </div>
      )}
      {isCompleted && (
        <div className='my-3 flex h-10 w-full flex-row items-center justify-center rounded-[8px] bg-dark-green md:w-28'>
          <img src={'/img/posted.png'} className='h-6' alt='checkbox' />
          <Text variant='b1' className='ml-2 text-center text-secondary-200'>
            {social?.type === 'tiktok_follow' && 'Followed'}
            {social?.type === 'tiktok_post' && 'Posted'}
          </Text>
        </div>
      )}
    </div>
  )
}

export default TiktokTask
