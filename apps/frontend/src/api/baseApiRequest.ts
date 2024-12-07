import axios from 'axios'

import { envConfig } from '@/config/config'

//import { getTgParams } from '../utils/getTgParams'

interface BaseApiRequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: object
}

export const baseApiRequest = async <T>({
  url,
  method,
  data,
}: BaseApiRequestOptions): Promise<T> => {
  const headers: Record<string, string> = {
    'X-Telegram-Auth': `${envConfig.locationSearch}`,
  }

  const apiUrl = `${envConfig.apiUrl}/api/client${url}`
  const response = await axios({
    method,
    url: apiUrl,
    data,
    headers,
  })

  return response.data
}
