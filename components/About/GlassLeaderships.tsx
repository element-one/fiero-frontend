import React from 'react'
import Image from 'next/image'

import { Text } from '@components/Text'

const GlassLeaderships = ({
  imageName,
  name,
  role,
  logosImage,
  twitterUsername,
  linkedinUsername,
}: {
  imageName: string
  name: string
  role: string
  logosImage: string
  twitterUsername: string
  linkedinUsername: string
}) => (
  <div className='mb-12 flex flex-col items-center md:mb-0'>
    <Image
      src={`/img/${imageName}.png`}
      width={270}
      height={270}
      alt={name}
      className='mb-1'
    />
    <Text variant='h1' size='semibold'>
      {name}
    </Text>
    <Text variant='b1' className='mb-4 text-primary-400'>
      {role}
    </Text>
    <div className='mb-6 flex flex-row space-x-4'>
      <a
        href={`https://twitter.com/${twitterUsername}`}
        target='_blank'
        rel='noreferrer'
      >
        <img
          src='/img/twitter_rounded.svg'
          alt='Twitter icon'
          className='cursor-pointer'
        />
      </a>
      <a
        href={`https://www.linkedin.com/in/${linkedinUsername}`}
        target='_blank'
        rel='noreferrer'
      >
        <img
          src='/img/linkedin_rounded.svg'
          alt='Linkedin icon'
          className='cursor-pointer'
        />
      </a>
    </div>
    <img
      className='max-w-xs md:max-h-32 md:max-w-md'
      src={`/img/${logosImage}.png`}
      alt={logosImage}
    />
  </div>
)

export default GlassLeaderships
