import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query'
import {
  ApiInstagramProfileResponse,
  ApiUserBadgesResponse,
  ApiUserEarnsResponse,
  ApiUserEventRewardsResponse,
  ApiUserHoldingsResponse,
  ApiUserReferralsResponse,
  ApiUserResponse,
  ApiUserRewardsResponse,
} from '@type/api'

import axios from '../axios/client'

export const getMe = async () => {
  const { data } = await axios.get(`/users/me`)
  return data
}

export const useGetMe = (isAuthenticated: boolean) => {
  return useQuery<ApiUserResponse, Error>(
    ['me', isAuthenticated],
    () => getMe(),
    {
      enabled: isAuthenticated,
    }
  )
}

export const getUserHoldings = async () => {
  const { data } = await axios.get(`/users/holdings`)
  return data
}

export const useGetUserHoldings = (isAuthenticated: boolean) => {
  return useQuery<ApiUserHoldingsResponse, Error>(
    ['user', 'holdings'],
    () => getUserHoldings(),
    {
      enabled: isAuthenticated,
    }
  )
}

export const getUserBadges = async () => {
  const { data } = await axios.get(`/users/badges`)
  return data
}

export const useGetUserBadges = (isAuthenticated: boolean) => {
  return useQuery<ApiUserBadgesResponse, Error>(
    ['user', 'badges'],
    () => getUserBadges(),
    {
      enabled: isAuthenticated,
    }
  )
}

export const getUserEarns = async () => {
  const { data } = await axios.get(`/users/earns`)
  return data
}

export const useGetUserEarns = (isAuthenticated: boolean) => {
  return useQuery<ApiUserEarnsResponse, Error>(
    ['user', 'earns'],
    () => getUserEarns(),
    {
      enabled: isAuthenticated,
    }
  )
}

export const getUserRewards = async () => {
  const { data } = await axios.get(`/users/rewards`)
  return data
}

export const useGetUserRewards = (isAuthenticated: boolean) => {
  return useQuery<ApiUserRewardsResponse, Error>(
    ['user', 'rewards'],
    () => getUserRewards(),
    {
      enabled: isAuthenticated,
    }
  )
}

export const getUserEventRewards = async () => {
  const { data } = await axios.get(`/users/event/rewards`)
  return data
}

export const useGetUserEventRewards = (isAuthenticated: boolean) => {
  return useQuery<ApiUserEventRewardsResponse, Error>(
    ['user', 'event', 'rewards'],
    () => getUserEventRewards(),
    {
      enabled: isAuthenticated,
    }
  )
}

export const getUserReferrals = async () => {
  const { data } = await axios.get(`/users/referrals`)
  return data
}

export const useGetUserReferrals = (isAuthenticated: boolean) => {
  return useQuery<ApiUserReferralsResponse, Error>(
    ['user', 'referrals'],
    () => getUserReferrals(),
    {
      enabled: isAuthenticated,
    }
  )
}

export const getAvatarUrl = async () => {
  const { data } = await axios.get(`/users/avatar/url`)
  return data
}

export const putAvatarUrl = async (profileImageUrl: string) => {
  const { data } = await axios.put(`/users/me`, { profileImageUrl })
  return data
}

export const putUsersPhoneNumber = async (phoneNumber: string) => {
  const { data } = await axios.put('/users/me', { phoneNumber })
  return data
}

export const putLinkInstagram = async (username?: string) => {
  const { data } = await axios.put<ApiUserResponse>(`/users/instagram`, {
    username,
  })
  return data
}

export const usePutLinkInstagram = (
  username?: string,
  options?: UseMutationOptions<ApiUserResponse, any, any> //eslint-disable-line
) => {
  return useMutation<ApiUserResponse, Error, { username?: string }>(
    ['me', 'instagram', username],
    ({ username }) => putLinkInstagram(username),
    options
  )
}

export const getInstagramPosts = async () => {
  const { data } = await axios.get(`/users/instagram/posts`)
  return data
}

export const getInstagramProfile = async () => {
  const { data } = await axios.get(`/users/instagram/profile`)
  return data
}

export const useGetInstagramProfile = (hasToken: boolean) => {
  return useQuery<ApiInstagramProfileResponse, Error>(
    ['user', 'instagram'],
    () => getInstagramProfile(),
    {
      enabled: hasToken,
    }
  )
}

export const deleteSocial = async (socialId: string) => {
  const { data } = await axios.delete(`/users/social/${socialId}`)
  return data
}

export const postInviteUser = async (email?: string) => {
  const { data } = await axios.post<ApiUserResponse>(`/users/invite`, {
    email,
  })
  return data
}

export const usePostInviteUser = (
  options?: UseMutationOptions<ApiUserResponse, any, any> //eslint-disable-line
) => {
  return useMutation<ApiUserResponse, Error, { email?: string }>(
    ['me', 'invite'],
    ({ email }) => postInviteUser(email),
    options
  )
}

export const putClaimBonus = async (bonusId?: string) => {
  const { data } = await axios.put<ApiUserResponse>(
    `/users/bonus/${bonusId}/claim`
  )
  return data
}

export const usePutClaimBonus = (
  bonusId?: string,
  options?: UseMutationOptions<ApiUserResponse, any, any> //eslint-disable-line
) => {
  return useMutation<ApiUserResponse, Error>(
    ['me', 'bonus', 'claim', bonusId],
    () => putClaimBonus(bonusId),
    options
  )
}

export const putClaimReferral = async (referralId?: string) => {
  const { data } = await axios.put<ApiUserResponse>(
    `/users/referral/${referralId}/claim`
  )
  return data
}

export const usePutClaimReferral = (
  referralId?: string,
  options?: UseMutationOptions<ApiUserResponse, any, any> //eslint-disable-line
) => {
  return useMutation<ApiUserResponse, Error>(
    ['me', 'referral', 'claim', referralId],
    () => putClaimReferral(referralId),
    options
  )
}

export const putLinkTiktok = async (username?: string) => {
  const { data } = await axios.put<ApiUserResponse>(`/users/tiktok`, {
    username,
  })
  return data
}

export const usePutLinkTiktok = (
  username?: string,
  options?: UseMutationOptions<ApiUserResponse, any, any> //eslint-disable-line
) => {
  return useMutation<ApiUserResponse, Error, { username?: string }>(
    ['me', 'tiktok', username],
    ({ username }) => putLinkTiktok(username),
    options
  )
}

export const getTiktokPosts = async () => {
  const { data } = await axios.get(`/users/tiktok/posts`)
  return data
}

export const getTiktokProfile = async () => {
  const { data } = await axios.get(`/users/tiktok/profile`)
  return data
}

export const useGetTiktokProfile = (hasToken: boolean) => {
  return useQuery<ApiInstagramProfileResponse, Error>(
    ['user', 'tiktok'],
    () => getTiktokProfile(),
    {
      enabled: hasToken,
    }
  )
}
