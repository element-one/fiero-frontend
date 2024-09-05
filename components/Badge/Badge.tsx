import { type HTMLAttributes } from 'react'
import clsx from 'clsx'

import { ApiBadge } from '@type/api'

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  badge: ApiBadge
}

export const Badge: React.FC<BadgeProps> = ({ badge, className, ...props }) => {
  return (
    <div
      className={clsx('flex flex-row items-center justify-between', className)}
      {...props}
    >
      <img
        src={badge.imageUrl || ''}
        className='h-full w-full rounded-full object-fill'
        alt='brand cover'
      />
    </div>
  )
}

export default Badge
