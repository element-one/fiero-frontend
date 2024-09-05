import { create } from 'zustand'

import { mountStoreDevtool } from 'simple-zustand-devtools'

type TempStoreState = {
  bonusShown: boolean
  setBonusShown: (shown: boolean) => void
  phoneNumberModalShown: boolean
  setPhoneNumberModalShown: (shown: boolean) => void
}

export const useTempStore = create<TempStoreState>()((set) => ({
  bonusShown: false,
  setBonusShown: (shown) => set({ bonusShown: shown }),
  phoneNumberModalShown: false,
  setPhoneNumberModalShown: (shown: boolean) =>
    set({ phoneNumberModalShown: shown }),
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useTempStore)
}
