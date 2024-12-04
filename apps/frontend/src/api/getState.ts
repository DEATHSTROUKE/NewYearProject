import { useQuery } from '@tanstack/react-query'

import { GetState } from '../../../shared/src/api/gameState'
import { baseApiRequest } from './baseApiRequest'

export const useGetState = () => {
  return useQuery({
    queryKey: ['getState'],
    retry: false,
    queryFn: () => {
      return baseApiRequest<GetState>({
        url: '/getState/v2',
        method: 'GET',
      })
    },
  })
}
