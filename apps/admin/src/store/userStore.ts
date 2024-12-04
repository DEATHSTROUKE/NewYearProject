import { create } from 'zustand'

import { TExcursion } from '@/types/excursion'

type UserStore = {
  currentExcursion: TExcursion | null
  setCurrentExcursion: (arg: TExcursion | null) => void

  finished: boolean
  setFinished: (arg: boolean) => void
}

export const useUserStore = create<UserStore>()(set => ({
  currentExcursion: null,
  setCurrentExcursion: value => set({ currentExcursion: value }),

  finished: false,
  setFinished: value => {
    set({ finished: value })
  },
}))
