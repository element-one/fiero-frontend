import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'

interface ReadingProgressProps extends HTMLAttributes<HTMLDivElement> {
  total: number
  current: number
}

export const ReadingProgress: React.FC<ReadingProgressProps> = ({
  total,
  current,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'flex w-full flex-row items-center justify-between space-x-1 md:space-x-3',
        className
      )}
      {...props}
    >
      {Array.from(Array(total).keys()).map((i) => (
        <div
          key={i}
          className={clsx(
            'h-[6px] w-full rounded-[61px]',
            i > current ? 'bg-white/[.15]' : 'bg-white'
          )}
        />
      ))}
    </div>
  )
}

export default ReadingProgress
