import { StateCreator } from 'zustand'

import { ApiEventRewardCustom, ApiReward, ApiRewardDelivery } from '@type/api'

export interface RewardSlice {
  reward?: ApiReward
  delivery?: ApiRewardDelivery
  custom?: ApiEventRewardCustom
  setReward: (reward: ApiReward) => void
  removeReward: () => void
  setDelivery: (delivery: ApiRewardDelivery) => void
  removeDelivery: () => void
  getDelivery: () => ApiRewardDelivery | undefined
  setCustom: (custom: ApiEventRewardCustom) => void
  removeCustom: () => void
}

export const createRewardSlice: StateCreator<RewardSlice> = (set, get) => ({
  reward: undefined,
  delivery: undefined,
  custom: undefined,
  setReward: (reward) => {
    set({ reward })
  },
  removeReward: () => {
    set({ reward: undefined })
  },
  setDelivery: (delivery) => {
    set({ delivery })
  },
  removeDelivery: () => {
    set({ delivery: undefined })
  },
  getDelivery: () => {
    return get().delivery
  },
  setCustom: (custom) => {
    set({ custom })
  },
  removeCustom: () => {
    set({ custom: undefined })
  },
  getCustom: () => {
    return get().custom
  },
})
