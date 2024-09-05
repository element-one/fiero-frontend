import { type HTMLAttributes } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import moment from 'moment'

import { Text } from '@components/Text'
import { ApiEvent } from '@type/api'

interface EventCardProps extends HTMLAttributes<HTMLDivElement> {
  event: ApiEvent
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  className,
  ...props
}) => {
  const router = useRouter()
  const handleClick = () => {
    router.push(`/event/${event.slug}`)
    return
  }

  return (
    <div
      className={clsx(
        'mx-5 flex cursor-pointer flex-row justify-between space-x-[25px] rounded-[16px] bg-neutral-800 px-4 py-[15px] shadow-lg md:mx-0 md:w-full md:pl-[25px] md:pr-[16px]',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <div className='flex flex-col items-start justify-start'>
        <img
          src={event.imageUrl}
          className='mb-[13px] flex w-full rounded-[16px] md:hidden'
          alt='event'
        />
        <Text size='bold' variant='h2s' className='line-clamp-2 text-white'>
          {event.name}
        </Text>
        <Text
          size='medium'
          variant='b3'
          className='mt-[10px] line-clamp-2 text-white opacity-80'
        >
          {event.description}
        </Text>
        <div className='mt-[22px] flex flex-row justify-start space-x-4'>
          <Text size='bold' variant='b1' className='text-white'>
            {moment(event.eventAt).format('LLL')}
          </Text>
          <div className='flex flex-row items-center justify-start space-x-[4px]'>
            <img
              src='/img/ic_nav.svg'
              className='h-[18px] w-[18px]'
              alt='nav'
            />
            <Text size='bold' variant='b1' className='text-white'>
              {event.location}
            </Text>
          </div>
        </div>
        {event.rsvp && (
          <Link href={event.rsvp}>
            <div className='mt-[20px] flex flex-row items-center justify-start space-x-2 rounded-md border border-white p-2'>
              <img src='/img/ic_world.svg' className='w-[24px]' alt='world' />
              <Text size='medium' variant='b3'>
                Register on the event site
              </Text>
            </div>
          </Link>
        )}
      </div>
      <img
        src={event.imageUrl}
        className='hidden h-[200px] w-[200px] rounded-[16px] object-cover md:flex'
        alt='event'
      />
    </div>
  )
}

export default EventCard
