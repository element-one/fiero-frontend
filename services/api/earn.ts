import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query'
import {
  ApiClaimPayload,
  ApiEarn,
  ApiEarnPayload,
  ApiEarnsResponse,
  ApiUserEarnResponse,
} from '@type/api'

import axios from '../axios/client'

export const getEarns = async () => {
  const { data } = await axios.get(`/earns?take=500&order=DESC`)
  return data
}

export const getPopularEarns = async () => {
  const { data } = await axios.get(`/earns?isPopular=true&order=DESC`)
  return data
}

export const useGetEarns = () => {
  return useQuery<ApiEarnsResponse, Error>(['earns'], () => getEarns())
}

export const useGetPopularEarns = () => {
  return useQuery<ApiEarnsResponse, Error>(['earns', 'popular'], () =>
    getPopularEarns()
  )
}

export const getEarn = async (earnId: string) => {
  const { data } = await axios.get(`/earns/${earnId}`)
  return data
}

export const useGetEarn = (earnId: string) => {
  return useQuery<ApiEarn, Error>(['earns', earnId], () => getEarn(earnId))
}

export const putEarnClaim = async (
  earnId?: string,
  payload?: ApiClaimPayload
) => {
  const { data } = await axios.put<ApiUserEarnResponse>(
    `/earns/${earnId}/claim`,
    payload
  )
  return data
}

export const usePutEarnClaim = (
  earnId?: string,
  options?: UseMutationOptions<ApiUserEarnResponse, any, any> //eslint-disable-line
) => {
  return useMutation<
    ApiUserEarnResponse,
    Error,
    { earnId?: string; payload?: ApiClaimPayload }
  >(
    ['earns', 'claim', earnId],
    ({ earnId, payload }) => putEarnClaim(earnId, payload),
    options
  )
}

export const putEarnComplete = async (
  earnId?: string,
  payload?: ApiEarnPayload
) => {
  const { data } = await axios.put<ApiUserEarnResponse>(
    `/earns/${earnId}/complete`,
    payload
  )
  return data
}

export const usePutEarnComplete = (
  earnId?: string,
  options?: UseMutationOptions<ApiUserEarnResponse, any, any> //eslint-disable-line
) => {
  return useMutation<
    ApiUserEarnResponse,
    Error,
    { earnId?: string; payload?: ApiEarnPayload }
  >(
    ['earns', 'complete', earnId],
    ({ earnId, payload }) => putEarnComplete(earnId, payload),
    options
  )
}

export const getEarnReceiptUrl = async () => {
  const { data } = await axios.get(`/earns/receipt/url`)
  return data
}

export const postCheckReceipt = async (
  earnId?: string,
  receiptUrl?: string
) => {
  const { data } = await axios.post(`/earns/check/receipt`, {
    id: earnId,
    receiptUrl,
  })
  return data
}
