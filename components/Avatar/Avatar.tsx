import { type HTMLAttributes } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import { ApiUser } from '@type/api'

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  profile?: ApiUser
}

const Avatar: React.FC<AvatarProps> = ({ profile, className, ...props }) => {
  const router = useRouter()
  const { profileImageUrl, name, email } = profile || {}

  const handleProfile = () => {
    if (email) {
      router.push(`/profile`)
    }
  }

  return (
    <div
      onClick={handleProfile}
      className={twMerge(
        clsx(
          'flex h-[46px] w-[46px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-bg-primary font-poppins text-b1 font-medium shadow-md md:h-[56px] md:w-[56px]',
          className
        )
      )}
      {...props}
    >
      {!profileImageUrl && (
        <Image
          src='/img/profile_placeholder.png'
          alt='avatar'
          width={34}
          height={34}
        />
      )}
      {profileImageUrl && (
        <img
          src={profileImageUrl}
          alt='avatar'
          className='h-full w-full object-fill'
        />
      )}
      {!profileImageUrl && name && 'short name'}
    </div>
  )
}

export default Avatar
