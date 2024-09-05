import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { mountStoreDevtool } from 'simple-zustand-devtools'

import { AppSlice, createAppSlice } from './appSlice'
import { createEarnSlice, EarnSlice } from './earnSlice'
import { createEventSlice, EventSlice } from './eventSlice'
import { createOnBoardingSlice, OnBoardingSlice } from './onBoardingSlice'
import { createRewardSlice, RewardSlice } from './rewardSlice'
import { createUserSlice, UserSlice } from './userSlice'

type StoreState = AppSlice &
  UserSlice &
  EarnSlice &
  RewardSlice &
  EventSlice &
  OnBoardingSlice

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createAppSlice(...a),
      ...createUserSlice(...a),
      ...createEarnSlice(...a),
      ...createRewardSlice(...a),
      ...createEventSlice(...a),
      ...createOnBoardingSlice(...a),
    }),
    {
      name: 'harpoon-fun',
    }
  )
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useStore)
}
