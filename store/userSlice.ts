import { StateCreator } from 'zustand'

import {
  ApiUser,
  ApiUserEarn,
  ApiUserEventReward,
  ApiUserReward,
  ApiWallet,
} from '@type/api'

export interface UserSlice {
  user?: ApiUser
  earns?: ApiUserEarn[]
  rewards?: ApiUserReward[]
  eventRewards?: ApiUserEventReward[]
  setUser: (user: ApiUser) => void
  removeUser: () => void
  setUserEarns: (earns: ApiUserEarn[]) => void
  setUserEarn: (earn: ApiUserEarn) => void
  getUserEarn: (earnId?: string) => ApiUserEarn | undefined
  setUserRewards: (rewards: ApiUserReward[]) => void
  setUserReward: (reward: ApiUserReward) => void
  getUserReward: (rewardId?: string) => ApiUserReward | undefined
  getWallet: (type: 'eth' | 'near') => ApiWallet | undefined
  setUserEventRewards: (rewards: ApiUserEventReward[]) => void
  setUserEventReward: (reward: ApiUserEventReward) => void
  getUserEventReward: (rewardId?: string) => ApiUserEventReward | undefined
  getUserEventRewards: (rewardId?: string) => ApiUserEventReward[] | undefined
}

export const createUserSlice: StateCreator<UserSlice> = (set, get) => ({
  user: undefined,
  setUser: (user) => {
    set({ user })
  },
  removeUser: () => {
    set({ user: undefined })
  },
  setUserEarns: (earns) => {
    set({ earns })
  },
  setUserEarn: (earn) => {
    const earns = get().earns
    const found = earns?.find((item) => item.id === earn.id)

    if (found) {
      const updated = earns?.map((item) => (item.id === earn.id ? earn : item))
      if (updated && earns) set({ earns: updated })
    } else {
      earns?.push(earn)
      if (earns) set({ earns })
    }
  },
  getUserEarn: (earnId) => {
    const earns = get().earns
    const earn = earns?.find((earn) => earn.earn?.id === earnId)
    return earn
  },
  setUserRewards: (rewards) => {
    set({ rewards })
  },
  setUserReward: (reward) => {
    const rewards = get().rewards
    const found = rewards?.find((item) => item.id === reward.id)

    if (found) {
      const updated = rewards?.map((item) =>
        item.id === reward.id ? reward : item
      )
      if (updated && rewards) set({ rewards: updated })
    } else {
      rewards?.push(reward)
      if (reward) set({ rewards })
    }
  },
  getUserReward: (rewardId) => {
    const rewards = get().rewards
    const reward = rewards?.find((reward) => reward.reward?.id === rewardId)
    return reward
  },
  setUserEventRewards: (eventRewards) => {
    set({ eventRewards })
  },
  setUserEventReward: (reward) => {
    const rewards = get().eventRewards
    const found = rewards?.find((item) => item.id === reward.id)

    if (found) {
      const updated = rewards?.map((item) =>
        item.id === reward.id ? reward : item
      )
      if (updated && rewards) set({ eventRewards: updated })
    } else {
      rewards?.push(reward)
      if (reward) set({ eventRewards: rewards })
    }
  },
  getUserEventReward: (rewardId) => {
    const rewards = get().eventRewards
    const reward = rewards?.find(
      (reward) =>
        reward.eventReward?.id === rewardId && reward.isRedeemed === false
    )
    return reward
  },
  getUserEventRewards: (rewardId) => {
    const rewards = get().eventRewards
    const reward = rewards?.filter(
      (reward) => reward.eventReward?.id === rewardId
    )
    return reward
  },
  getWallet: (type: 'eth' | 'near') => {
    const user = get().user
    const ethWallet = user?.wallets?.find((wallet) => wallet.name === type)
    return ethWallet
  },
})
