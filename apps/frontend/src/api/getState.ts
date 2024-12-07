import { GetState } from '@shared'
import { useQuery } from '@tanstack/react-query'

import { baseApiRequest } from './baseApiRequest'

export const useGetState = () => {
  return useQuery({
    queryKey: ['getState'],
    retry: false,
    queryFn: () => {
      return baseApiRequest<GetState>({
        url: '/getState',
        method: 'GET',
      })
    },
  })
}
