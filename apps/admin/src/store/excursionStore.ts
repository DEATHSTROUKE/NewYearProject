import { create } from 'zustand'

import { TExcursion } from '@/types/excursion'

type ExcursionStore = {
  currentExcursion: TExcursion | null
  setCurrentExcursion: (arg: TExcursion | null) => void

  excursionList: TExcursion[]
  setExcursionList: (arg: TExcursion[]) => void
}

export const useExcursionStore = create<ExcursionStore>()(set => ({
  currentExcursion: null,
  setCurrentExcursion: value => set({ currentExcursion: value }),

  excursionList: [],
  setExcursionList: (list: TExcursion[]) => {
    set({ excursionList: list })
  },
}))
