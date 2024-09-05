import React, { type HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

import { Text } from '@components/Text'

interface HeadingProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string | ReactNode
}

const Heading: React.FC<HeadingProps> = ({ title, description, className }) => {
  return (
    <div
      className={clsx(
        'flex flex-col md:mb-8 md:mt-16 md:space-y-4 md:px-8',
        className
      )}
    >
      <Text size='bold' className='text-[48px]'>
        {title}
      </Text>
      {description ?? ''}
    </div>
  )
}

export default Heading
