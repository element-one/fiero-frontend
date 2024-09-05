import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query'
import {
  ApiCustomPayload,
  ApiDeliveryPayload,
  ApiEventRewardCustomPayload,
  ApiPostRewardSpinResponse,
  ApiRewardResponse,
  ApiRewardsResponse,
  ApiUserEventRewardResponse,
  ApiUserRewardResponse,
} from '@type/api'

import axios from '../axios/client'

export const getRewards = async (filter?: string) => {
  let url = '/rewards?take=500'

  if (filter) {
    url += `&filter=${filter}`
  }

  const { data } = await axios.get(url)
  return data
}

export const getPopularRewards = async () => {
  const { data } = await axios.get(`/rewards?isPopular=true&order=DESC`)
  return data
}

export const useGetRewards = (filter?: string) => {
  return useQuery<ApiRewardsResponse, Error>(['rewards', filter], () =>
    getRewards(filter)
  )
}

export const useGetPopularRewards = () => {
  return useQuery<ApiRewardsResponse, Error>(['rewards', 'popular'], () =>
    getPopularRewards()
  )
}

export const getReward = async (rewardId: string) => {
  const { data } = await axios.get(`/rewards/${rewardId}`)
  return data
}

export const useGetReward = (rewardId: string) => {
  return useQuery<ApiRewardResponse, Error>(['rewards', rewardId], () =>
    getReward(rewardId)
  )
}

export const putRedeemReward = async (rewardId?: string) => {
  const { data } = await axios.put<ApiUserRewardResponse>(
    `/rewards/${rewardId}/claim`
  )
  return data
}

export const usePutRedeemReward = (
  rewardId?: string,
  options?: UseMutationOptions<ApiUserRewardResponse, any, void> //eslint-disable-line
) => {
  return useMutation<ApiUserRewardResponse, Error>(
    ['rewards', 'claim', rewardId],
    () => putRedeemReward(rewardId),
    options
  )
}

export const putQRcodeRedeemReward = async (qrCode?: string) => {
  const { data } = await axios.put<ApiUserRewardResponse>(
    `/rewards/${qrCode}/redeem`
  )
  return data
}

export const usePutQRcodeRedeemReward = (
  qrCode?: string,
  options?: UseMutationOptions<ApiUserRewardResponse, any, void> //eslint-disable-line
) => {
  return useMutation<ApiUserRewardResponse, Error>(
    ['rewards', 'redeem', qrCode],
    () => putQRcodeRedeemReward(qrCode),
    options
  )
}

export const postAddDelivery = async (
  rewardId?: string,
  payload?: ApiDeliveryPayload
) => {
  const { data } = await axios.post<ApiUserRewardResponse>(
    `/rewards/${rewardId}/delivery`,
    payload
  )
  return data
}

export const usePostAddDelivery = (
  rewardId?: string,
  options?: UseMutationOptions<ApiUserRewardResponse, any, any> //eslint-disable-line
) => {
  return useMutation<
    ApiUserRewardResponse,
    Error,
    { rewardId?: string; payload?: ApiDeliveryPayload }
  >(
    ['reward', 'delivery', rewardId],
    ({ rewardId, payload }) => postAddDelivery(rewardId, payload),
    options
  )
}

export const postAddCustom = async (
  rewardId?: string,
  payload?: ApiCustomPayload
) => {
  const { data } = await axios.post<ApiUserRewardResponse>(
    `/rewards/${rewardId}/custom`,
    payload
  )
  return data
}

export const usePostAddCustom = (
  rewardId?: string,
  options?: UseMutationOptions<ApiUserRewardResponse, any, any> //eslint-disable-line
) => {
  return useMutation<
    ApiUserRewardResponse,
    Error,
    { rewardId?: string; payload?: ApiCustomPayload }
  >(
    ['reward', 'custom', rewardId],
    ({ rewardId, payload }) => postAddCustom(rewardId, payload),
    options
  )
}

export const postAddEventRewardCustom = async (
  eventRewardId?: string,
  payload?: ApiCustomPayload
) => {
  const { data } = await axios.post<ApiUserEventRewardResponse>(
    `/events/reward/${eventRewardId}/custom`,
    payload
  )
  return data
}

export const usePostAddEventRewardCustom = (
  eventRewardId?: string,
  options?: UseMutationOptions<ApiUserEventRewardResponse, any, any> //eslint-disable-line
) => {
  return useMutation<
    ApiUserEventRewardResponse,
    Error,
    { eventRewardId?: string; payload?: ApiEventRewardCustomPayload }
  >(
    ['eventReward', 'custom', eventRewardId],
    ({ eventRewardId, payload }) =>
      postAddEventRewardCustom(eventRewardId, payload),
    options
  )
}

export const postRewardSpin = async (id: string) => {
  const url = `/rewards/${id}/spin`

  const { data } = await axios.post<ApiPostRewardSpinResponse>(url)

  return data
}

export const usePostRewardSpin = (
  rewardId?: string,
  options?: UseMutationOptions<ApiPostRewardSpinResponse, unknown, unknown>
) => {
  return useMutation<ApiPostRewardSpinResponse, unknown, { id: string }>(
    ['events', 'reward', rewardId, 'spin'],
    ({ id }) => postRewardSpin(id),
    options
  )
}
