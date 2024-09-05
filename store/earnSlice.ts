import { StateCreator } from 'zustand'

import { ApiEarn } from '@type/api'

export interface EarnSlice {
  earn?: ApiEarn
  receiptCache?: { earnId: string; receiptId: string }
  setEarn: (earn: ApiEarn) => void
  removeEarn: () => void
  setReceiptCache: (earnId: string, receiptId: string) => void
  removeReceiptCache: () => void
}

export const createEarnSlice: StateCreator<EarnSlice> = (set) => ({
  earn: undefined,
  setEarn: (earn) => {
    set({ earn })
  },
  removeEarn: () => {
    set({ earn: undefined })
  },
  setReceiptCache: (earnId, receiptId) => {
    set({ receiptCache: { earnId, receiptId } })
  },
  removeReceiptCache: () => {
    set({ receiptCache: undefined })
  },
})
