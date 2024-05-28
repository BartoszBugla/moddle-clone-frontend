import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { useErrorHandler } from '@/lib/error-handler/use-error-handler'
import { api } from '../api'
import {
  CreateExerciseDTO,
  CreateGradeDTO,
  EditExerciseDTO,
  ExerciseDTO,
} from '../api-client'

export const useCreateExercise = (
  options?: UseMutationOptions<unknown, unknown, CreateExerciseDTO>
) => {
  const errorHandler = useErrorHandler()

  return useMutation({
    ...options,
    mutationFn: (data: CreateExerciseDTO) => api.exercise.exerciseCreate(data),
    onError: (err) => errorHandler(err, { notify: true }),
  })
}

export const useGetExerciseTeacher = (id: number) => {
  return useQuery({
    queryKey: ['exercise-teacher', id],
    queryFn: () => {
      return api.exercise.gradesDetail(Number(id))
    },
  })
}

export const useGetExercise = (id: number) => {
  return useQuery({
    queryKey: ['exercise', id],
    queryFn: () => {
      return api.exercise.exerciseDetail(Number(id))
    },
  })
}

export interface UploadExercisePayload {
  file: File
  exerciseId: number
  comment?: string
}

export const useUploadExercise = () => {
  return useMutation({
    mutationFn: (data: UploadExercisePayload) =>
      api.exercise.uploadCreate(data.exerciseId, data),
  })
}

export const useEditExercise = (
  options?: UseMutationOptions<
    unknown,
    unknown,
    EditExerciseDTO & { id: number }
  >
) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercise-teacher'] })
    },
    mutationFn: (data: EditExerciseDTO & { id: number }) =>
      api.exercise.exercisePartialUpdate(data.id, data),
  })
}

export const useCreateGrade = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateGradeDTO & { exerciseId: number }) =>
      api.exercise.gradeCreate(data.exerciseId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercise-teacher'] })
    },
  })
}
