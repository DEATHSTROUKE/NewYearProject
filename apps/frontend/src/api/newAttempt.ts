import { ApiError, ApiErrorString, NewAttemptData } from '@shared'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import Sound from '../assets/audio/magic_sound.mp3'
import { checkSound } from '../utils/checkSound'
import { baseApiRequest } from './baseApiRequest'

const audio = new Audio(Sound)

type SuccessRes = {
  shouldSound: boolean
}

type NewAttemptParams = {
  clearField: () => void
}

export const useNewAttempt = ({ clearField }: NewAttemptParams) => {
  const client = useQueryClient()
  return useMutation({
    mutationKey: ['newAttempt'],
    mutationFn: (mutationData: NewAttemptData) => {
      return baseApiRequest<SuccessRes>({
        url: '/game/new_attempt/v2',
        method: 'POST',
        data: mutationData,
      })
    },
    retry: false,
    onSuccess: (data: SuccessRes) => {
      client.invalidateQueries({ queryKey: ['getState'] })
      clearField()
      if (data.shouldSound && checkSound()) {
        audio.play()
      }
    },
    onError: (error: AxiosError) => {
      const err = error as AxiosError<ApiError>
      if (err.response?.data.exception === ApiErrorString.OldState) {
        client.invalidateQueries({ queryKey: ['getState'] })
      }
    },
  })
}
