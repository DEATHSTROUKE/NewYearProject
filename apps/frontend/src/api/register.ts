import { RegisterFields } from '@shared'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { baseApiRequest } from './baseApiRequest'

export const useRegister = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (mutationData: RegisterFields) => {
      return baseApiRequest({
        url: '/register',
        method: 'POST',
        data: mutationData,
      })
    },
    retry: false,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['getState'] })
    },
  })
}
