import { TFeedbackData } from '@shared'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { baseApiRequest } from './baseApiRequest'

type SendFeedbackParams = {
  setIsFeedbackJustSent: (value: boolean) => void
}

export const useSendFeedback = ({
  setIsFeedbackJustSent,
}: SendFeedbackParams) => {
  const client = useQueryClient()
  return useMutation({
    mutationKey: ['feedback'],
    mutationFn: (mutationData: TFeedbackData) => {
      return baseApiRequest({
        method: 'POST',
        url: '/sendFeedback',
        data: mutationData,
      })
    },
    retry: false,
    onSuccess: () => {
      setIsFeedbackJustSent(true)
      setTimeout(() => {
        client.invalidateQueries({ queryKey: ['getState'] })
      }, 5000)
    },
  })
}
