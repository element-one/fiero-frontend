import { StateCreator } from 'zustand'

export interface OnBoardingSlice {
  isAgeVerified: boolean
  setAgeVerified: (verified: boolean) => void
  onBoarding: boolean
  setOnBoarding: (onBoarding: boolean) => void
}

export const createOnBoardingSlice: StateCreator<OnBoardingSlice> = (set) => ({
  isAgeVerified: false,
  setAgeVerified: (verified) => {
    set({ isAgeVerified: verified })
  },
  onBoarding: true,
  setOnBoarding: (onBoarding) => set({ onBoarding }),
})
