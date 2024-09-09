import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useCopyToClipboard } from 'react-use'

import { SocialText } from '@components/Text'
import { findHashtag, findMention } from '@utils/utils'

interface CopyCardProps {
  hashtagText?: string
}

export const CopyCard: React.FC<CopyCardProps> = ({ hashtagText }) => {
  const [text, setText] = React.useState('')
  const [, copyToClipboard] = useCopyToClipboard()

  const handleCopy = () => {
    copyToClipboard(text)
    toast.success('copied!')
  }

  useEffect(() => {
    const hashtag = findHashtag(hashtagText || '')
    const mentions = findMention(hashtagText || '')
    setText(`${mentions} ${hashtag}`)
  }, [hashtagText])

  return (
    <div className='flex w-full flex-row items-center justify-between rounded-2xl border border-border-4 p-2 px-3 md:flex-row md:p-4'>
      <div className=' text-neutral-300'>
        <SocialText
          variant='b1'
          hasHashtag
          hasMention
          className='text-text-black font-typewriter'
        >
          {hashtagText}
        </SocialText>
      </div>

      <button className='flex h-[42px] w-[42px] items-center justify-center rounded-full bg-primary-400 bg-opacity-10 p-2'>
        <img src='/svg/copy_icon.svg' alt='Copy Button' onClick={handleCopy} />
      </button>
    </div>
  )
}

export default CopyCard
