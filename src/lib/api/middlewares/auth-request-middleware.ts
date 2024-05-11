import type { InternalAxiosRequestConfig } from 'axios'

import { useAuth } from '@/lib/store/auth'

// handle getting and refreshing token here
const getToken = async () => {
  return useAuth.getState().accessToken
}

export const authRequestMiddleware = async ({
  disableAuth = false,
  ...req
}: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  const token = await getToken()

  if (!disableAuth && token) req.headers.Authorization = `Bearer ${token}`

  return req
}
