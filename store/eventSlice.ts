import { StateCreator } from 'zustand'

import { ApiEventReward } from '@type/api'

export interface EventSlice {
  eventReward?: ApiEventReward
  setEventReward: (reward: ApiEventReward) => void
  removeEventReward: () => void
  eventRewardSlots: string[]
  setEventRewardSlots: (slots: string[]) => void
  prize: string
  setPrize: (prize: string) => void
}

export const createEventSlice: StateCreator<EventSlice> = (set) => ({
  eventReward: undefined,
  prize: '',
  eventRewardSlots: [],
  setEventRewardSlots: (slots) => {
    set({ eventRewardSlots: [...slots] })
  },
  setEventReward: (eventReward) => {
    set({ eventReward })
  },
  setPrize: (prize: string) => {
    set({ prize })
  },
  removeEventReward: () => {
    set({ eventReward: undefined })
  },
})
