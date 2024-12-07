import { ApiError, ApiErrorString, NewAttemptData } from '@shared'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

//import Sound from '../assets/audio/magic_sound.mp3'
import Sound from '../assets/audio/train_sound.mp3'
import { checkSound } from '../utils/checkSound'
import { baseApiRequest } from './baseApiRequest'

const audio = new Audio(Sound)

type SuccessRes = {
  isCorrect: boolean
}

type NewAttemptParams = {
  callback: (data: SuccessRes) => void
}

export const useNewAttempt = ({ callback }: NewAttemptParams) => {
  const client = useQueryClient()
  return useMutation({
    mutationKey: ['newAttempt'],
    mutationFn: (mutationData: NewAttemptData) => {
      return baseApiRequest<SuccessRes>({
        url: '/new_attempt',
        method: 'POST',
        data: mutationData,
      })
    },
    retry: false,
    onSuccess: (data: SuccessRes) => {
      client.invalidateQueries({ queryKey: ['getState'] })
      callback(data)
      if (data.isCorrect && checkSound()) {
        audio.play()
      }
    },
    onError: (error: AxiosError) => {
      const err = error as AxiosError<ApiError>
      if (err.response?.data.message === ApiErrorString.OldState) {
        client.invalidateQueries({ queryKey: ['getState'] })
      }
    },
  })
}
