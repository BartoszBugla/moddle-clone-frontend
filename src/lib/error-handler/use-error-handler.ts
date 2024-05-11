import { useCallback } from 'react'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { errorMessages } from './error-message'

interface ErrorHandlerOptions {
  notify?: boolean
  customMessage?: string
}

const errorExists = (error: string): error is keyof typeof errorMessages => {
  if (error in errorMessages) return true
  return false
}

export const useErrorHandler = () => {
  return useCallback(
    (err: unknown, options: ErrorHandlerOptions = { notify: false }) => {
      let message = ''

      /** Handle loop backend error */
      if (isAxiosError(err)) {
        const backendError = err.response?.data

        message = backendError
      }

      if (!message) message = errorMessages.somethingWentWrong

      if (options?.customMessage) message = options.customMessage

      if (options?.notify) toast.error(message)

      return { message }
    },
    []
  )
}
