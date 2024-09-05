import { StateCreator } from 'zustand'

export interface AppSlice {
  isDrawerOpen: boolean
  redirectUrl?: string
  setOpenDrawer: (isOpen: boolean) => void
  setRedirectUrl: (url: string) => void
  removeRedirectUrl: () => void
}

export const createAppSlice: StateCreator<AppSlice> = (set) => ({
  isDrawerOpen: false,
  redirectUrl: undefined,
  setOpenDrawer: (isOpen) => {
    set({ isDrawerOpen: isOpen })
  },
  setRedirectUrl: (url) => {
    set({ redirectUrl: url })
  },
  removeRedirectUrl: () => {
    set({ redirectUrl: undefined })
  },
})
