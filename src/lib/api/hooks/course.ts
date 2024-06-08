import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { useErrorHandler } from '@/lib/error-handler/use-error-handler'
import { api } from '../api'
import { CourseDTO } from '../api-client'

export const useCourse = (id?: number) => {
  const errorHandler = useErrorHandler()
  const navigate = useNavigate()

  return useQuery({
    queryKey: ['course', id],
    enabled: !!id,
    queryFn: () => api.courses.coursesDetail(Number(id)),
    retry(failureCount, error) {
      errorHandler(error, { notify: true })
      navigate({ to: '/dashboard' })
      return false
    },
  })
}

export const useAcceptUserToCourse = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: number) =>
      api.enrollments.acceptPartialUpdate(Number(id), userId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course', id] })
    },
  })
}

export const useKickUserFromCourse = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: number) =>
      api.enrollments.declineDelete(Number(id), userId),

    onSuccess: () => {
      toast.success('User removed successfully')
      queryClient.invalidateQueries({ queryKey: ['course', id] })
    },
  })
}

export const useCreateCourse = (
  options?: UseMutationOptions<number, unknown, CourseDTO>
) => {
  const queryClient = useQueryClient()
  const errorHandler = useErrorHandler()

  return useMutation({
    ...options,
    mutationFn: (data: CourseDTO) => api.courses.coursesCreate(data),
    onSuccess: (...vars) => {
      queryClient.invalidateQueries({ queryKey: ['course'] })
      options?.onSuccess?.(...vars)
    },
    onError: (err) => errorHandler(err, { notify: true }),
  })
}

export const useDeleteCourse = () => {
  const queryClient = useQueryClient()
  const errorHandler = useErrorHandler()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (id: number) => api.courses.coursesDelete(id),
    onSuccess: () => {
      navigate({ to: '/dashboard' })
    },
    onError: (err) => errorHandler(err, { notify: true }),
  })
}
