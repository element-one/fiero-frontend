import React, { useCallback } from 'react'
import clsx from 'clsx'

import { ApiInstagramPost } from '@type/api'

interface PostContentProps {
  isSelected: boolean
  post: ApiInstagramPost
  onSelect?: (postId: string) => void
}

export const PostContent: React.FC<PostContentProps> = ({
  isSelected,
  post,
  onSelect,
}) => {
  const handleSelect = useCallback(async () => {
    onSelect && onSelect(post.id)
  }, [onSelect, post.id])

  return (
    <div className='flex items-center justify-center'>
      <button
        onClick={handleSelect}
        className={clsx(
          'relative flex h-[161px] w-fit items-center justify-center rounded-lg bg-neutral-800 hover:border hover:border-primary-400',
          isSelected && 'border border-border-primary'
        )}
      >
        {isSelected && (
          <img
            src='/img/checkbox.svg'
            className='absolute right-4 top-4 h-[20px] w-[20px] rounded-lg object-fill'
            alt='content'
          />
        )}
        <img
          src={!!post.thumbnailUrl ? post.thumbnailUrl : post.mediaUrl}
          className='h-[160px] w-[216px] rounded-lg object-cover'
          alt='content'
        />
      </button>
    </div>
  )
}

export default PostContent
