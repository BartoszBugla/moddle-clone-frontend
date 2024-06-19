import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query'

import { api } from '../api'
import { CreateGradeDTO } from '../api-client'

export const useUploadGrade = (
  options?: UseMutationOptions<
    void,
    unknown,
    { exerciseId: number; file: File; comment: string }
  >
) => {
  const queryClient = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (data: { exerciseId: number; file: File; comment: string }) =>
      api.grades.addTaskCreate(data.exerciseId, data),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['exercise-teacher'] })
      queryClient.refetchQueries({ queryKey: ['exercise'] })
      options?.onSuccess?.(...args)
    },
  })
}

export const useGradeExercise = (
  options?: UseMutationOptions<CreateGradeDTO, unknown, CreateGradeDTO>
) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (data: CreateGradeDTO) =>
      api.grades.updateGradePartialUpdate(data),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['exercise-teacher'] })
      queryClient.refetchQueries({ queryKey: ['exercise'] })
      options?.onSuccess?.(...args)
    },
  })
}
