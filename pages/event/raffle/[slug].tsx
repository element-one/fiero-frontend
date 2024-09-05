import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import Button from '@components/Button/Button'
import Loading from '@components/Loading/Loading'
import { Text } from '@components/Text'
import {
  useGetEventBySlug,
  usePostCreateRaffleRound,
  usePostEventRaffleWinner,
} from '@services/api/event'
import { ApiEvent } from '@type/api'

const RafflePage: NextPage = () => {
  const router = useRouter()
  const { slug } = router.query
  const [event, setEvent] = useState<ApiEvent | null>(null)

  const { data: eventData, isLoading } = useGetEventBySlug(slug as string)
  const {
    mutate: getWinner,
    data: raffleData,
    isLoading: isWinnerLoading,
  } = usePostEventRaffleWinner(eventData?.event.id)
  const { mutate: createRound, isLoading: isCreateLoading } =
    usePostCreateRaffleRound(eventData?.event.id, {
      onSuccess(data) {
        setEvent(data.event)
      },
    })

  useEffect(() => {
    if (eventData) {
      setEvent(eventData.event)
    }
  }, [eventData])

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center bg-neutral-900'>
      {isLoading && <Loading />}
      {!isLoading && (
        <div>
          <div className='my-8 flex flex-col items-center justify-center'>
            <Button
              className='mt-4'
              onClick={() => {
                createRound()
              }}
              isLoading={isCreateLoading}
            >
              Create New Raffle Round
            </Button>
          </div>

          <div className='flex flex-col items-center justify-center'>
            <img src={event?.imageUrl} alt='event image' />
            <Text>{eventData?.event.name}</Text>
            <Text className='mt-4 w-2/3 text-center'>{event?.description}</Text>
            <Text className='mt-4 w-2/3 text-center'>
              Current Round: {event?.round}
            </Text>
            <Button
              className='mt-4'
              onClick={() => {
                getWinner({ isRedraw: raffleData?.eventRaffle ? true : false })
              }}
              isLoading={isWinnerLoading}
            >
              {raffleData?.eventRaffle ? 'Redraw Winner' : 'Get Raffle Winner'}
            </Button>
          </div>
          <div>
            {raffleData && (
              <div className='mt-8 flex flex-col items-center justify-center'>
                <Text>Winner is:</Text>
                <div className='flex flex-row space-x-2'>
                  <Text>{raffleData?.eventRaffle?.user.firstName}</Text>
                  <Text>{raffleData?.eventRaffle?.user.lastName}</Text>
                </div>

                <Text>{raffleData?.eventRaffle?.user.email}</Text>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default RafflePage
