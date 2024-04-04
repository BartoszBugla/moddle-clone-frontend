import type { InternalAxiosRequestConfig } from 'axios'

// handle getting and refreshing token here
const getToken = async () => {
  return ''
}

export const authRequestMiddleware = async ({
  disableAuth = false,
  ...req
}: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  const token = await getToken()

  if (!disableAuth && token) req.headers.Authorization = `Bearer ${token}`

  return req
}
