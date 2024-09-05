import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query'
import {
  ApiEventRaffleResponse,
  ApiEventResponse,
  ApiEventsResponse,
  ApiUserEventRewardResponse,
} from '@type/api'

import axios from '../axios/client'

export const getEvents = async (location?: string, type?: string) => {
  let path = '/events'
  if (location && type) {
    path += `?location=${location}&type=${type}`
  } else if (location) {
    path += `?location=${location}`
  } else if (type) {
    path += `?type=${type}`
  }
  const { data } = await axios.get(path)
  return data
}

export const useGetEvents = (location?: string, type?: string) => {
  return useQuery<ApiEventsResponse, Error>(
    ['events', location, type],
    () => getEvents(location, type),
    { keepPreviousData: true, refetchOnWindowFocus: false }
  )
}

export const getEvent = async (eventId: string) => {
  const { data } = await axios.get(`/events/${eventId}`)
  return data
}

export const useGetEvent = (eventId: string) => {
  return useQuery<ApiEventResponse, Error>(['events', eventId], () =>
    getEvent(eventId)
  )
}

export const getEventBySlug = async (slug: string) => {
  const { data } = await axios.get<ApiEventResponse>(`/events/slug/${slug}`)
  return data
}

export const useGetEventBySlug = (slug: string) => {
  return useQuery<ApiEventResponse, Error>(
    ['events', slug],
    () => getEventBySlug(slug),
    {
      enabled: !!slug,
    }
  )
}

export const putEventRewardClaim = async (rewardId?: string) => {
  const { data } = await axios.put<ApiUserEventRewardResponse>(
    `/events/reward/${rewardId}/claim`
  )
  return data
}

export const usePutEventRewardClaim = (
  rewardId?: string,
  options?: UseMutationOptions<ApiUserEventRewardResponse, any, any> //eslint-disable-line
) => {
  return useMutation<ApiUserEventRewardResponse, Error>(
    ['event', 'reward', 'claim', rewardId],
    () => putEventRewardClaim(rewardId),
    options
  )
}

export const putEventRewardRedeem = async (qrCode?: string) => {
  const { data } = await axios.put<ApiUserEventRewardResponse>(
    `/events/reward/${qrCode}/redeem`
  )
  return data
}

export const usePutEventRewardRedeem = (
  qrCode?: string,
  options?: UseMutationOptions<ApiUserEventRewardResponse, any, any> //eslint-disable-line
) => {
  return useMutation<ApiUserEventRewardResponse, Error>(
    ['event', 'reward', 'redeem', qrCode],
    () => putEventRewardRedeem(qrCode),
    options
  )
}

export const postEventRaffleWinner = async (
  eventId?: string,
  isRedraw?: boolean
) => {
  const { data } = await axios.post<ApiEventRaffleResponse>(
    `/events/raffle/winner`,
    { eventId, isRedraw }
  )
  return data
}

export const usePostEventRaffleWinner = (
  eventId?: string,
  options?: UseMutationOptions<ApiEventRaffleResponse, any, any> //eslint-disable-line
) => {
  return useMutation<ApiEventRaffleResponse, Error, { isRedraw?: boolean }>(
    ['event', 'raffle', eventId],
    ({ isRedraw }) => postEventRaffleWinner(eventId, isRedraw),
    options
  )
}

export const postCreateRaffleRound = async (eventId?: string) => {
  const { data } = await axios.post<ApiEventResponse>(`/events/raffle/round`, {
    eventId,
  })
  return data
}

export const usePostCreateRaffleRound = (
  eventId?: string,
  options?: UseMutationOptions<ApiEventResponse, any, any> //eslint-disable-line
) => {
  return useMutation<ApiEventResponse, Error>(
    ['event', 'raffle', 'round', eventId],
    () => postCreateRaffleRound(eventId),
    options
  )
}
