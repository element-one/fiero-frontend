import React, { useCallback, useMemo } from 'react'

import Text from '@components/Text/Text'
import { ApiSocial } from '@type/api'

interface TwitterTaskProps {
  isCompleted?: boolean
  social?: ApiSocial
  onComplete?: () => void
}

export const TwitterTask: React.FC<TwitterTaskProps> = ({
  isCompleted,
  social,
  onComplete,
}) => {
  const handleClick = useCallback(async () => {
    onComplete && onComplete()
  }, [onComplete])

  const getButtonText = useMemo(() => {
    switch (social?.type) {
      case 'twitter_follow':
        return 'Follow'
      case 'twitter_like':
        return 'Like'
      default:
        return 'Like'
    }
  }, [social])

  const getSocialText = useMemo(() => {
    switch (social?.type) {
      case 'twitter_follow':
        return 'Follow Twitter'
      case 'twitter_like':
        return 'Like Tweet'
      default:
        return 'Retweet Tweet'
    }
  }, [social])

  const getUrlPath = useMemo(() => {
    switch (social?.type) {
      case 'twitter_follow':
        return `https://twitter.com/intent/follow?screen_name=${social?.account}`

      case 'twitter_like':
        return `https://twitter.com/intent/like?tweet_id=${social?.tweetId}`

      default:
        return 'Like'
    }
  }, [social])

  return (
    <div className='flex w-full flex-col items-center justify-between rounded-[10px] border border-white border-opacity-20 p-4 md:px-4 md:py-0'>
      <div className='flex flex-col items-center py-2 md:flex-row'>
        <img
          src={'/img/twitter.svg'}
          className='mt-4 h-[98px] w-[98px] md:mr-10'
          alt='twitter'
        />
        <div className='w-8/10 mt-3 md:my-auto md:ml-4'>
          <Text
            variant='h23'
            className='mb-4 line-clamp-2 flex-grow text-center font-[500] uppercase text-text-black'
          >
            {getSocialText}
          </Text>
        </div>
      </div>
      {!isCompleted && (
        <a
          href={getUrlPath}
          target='_blank'
          rel='noopener noreferrer'
          className='my-3 flex w-full items-center justify-center rounded-full bg-bg-primary px-4 py-[10px] md:mt-12 md:w-auto'
          onClick={handleClick}
        >
          <Text
            variant='b1'
            className='min-w-[180px] py-[14px] text-center uppercase text-text-white'
          >
            <span className='font-[800]'>{getButtonText}</span>
          </Text>
        </a>
      )}
      {isCompleted && (
        <div className='flex h-10 w-full flex-row items-center justify-center rounded-[8px] bg-dark-green md:w-28'>
          <img src={'/img/posted.png'} className='h-6' alt='checkbox' />
          <Text variant='b2' className='ml-2 text-center text-secondary-200'>
            {social?.type === 'twitter_follow' && 'Followed'}
            {social?.type === 'twitter_like' && 'Liked'}
          </Text>
        </div>
      )}
    </div>
  )
}

export default TwitterTask
