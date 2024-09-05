import React, { useState } from 'react'
import { toast } from 'react-toastify'

import Button from '@components/Button/Button'
import { ApiTiktokPost } from '@type/api'

import PostContent from './PostContent'

interface TiktokPostProps {
  isLoading?: boolean
  posts: ApiTiktokPost[]
  onConfirm?: (post: ApiTiktokPost) => void
}

export const TiktokPost: React.FC<TiktokPostProps> = ({
  isLoading,
  posts,
  onConfirm,
}) => {
  const [selectedPost, setSelectedPost] = useState<ApiTiktokPost | null>(null)

  const handleSelect = (postId: string) => {
    const post = posts.find((p) => p.id === postId)
    if (post) setSelectedPost(post)
  }

  const handleConfirm = () => {
    if (!selectedPost) {
      toast.error('Please select a post')
    }
    if (selectedPost && onConfirm) onConfirm(selectedPost)
  }

  return (
    <div className='flex flex-col'>
      <div className='mt-8 grid grid-cols-2 gap-4 md:mt-12 md:grid-cols-3'>
        {posts.map((post) => {
          return (
            <PostContent
              isSelected={post.id === selectedPost?.id}
              key={post.id}
              post={post}
              onSelect={handleSelect}
            />
          )
        })}
      </div>
      <div className='mt-8 flex w-full items-center justify-center'>
        <Button
          className='w-[200px] md:w-[260px] font-[800] text-text-white'
          onClick={handleConfirm}
          isLoading={isLoading}
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}

export default TiktokPost
