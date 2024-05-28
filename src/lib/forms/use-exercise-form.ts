import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import { useCreateExercise, useEditExercise } from '../api/hooks/exercise'

export enum ExerciseManageFormField {
  Name = 'name',
  Description = 'description',
  Deadline = 'deadline',
  FileTypes = 'fileTypes',
}

const validationSchema = z.object({
  [ExerciseManageFormField.Name]: z.string().min(1),
  [ExerciseManageFormField.Description]: z.string().min(1),
  [ExerciseManageFormField.Deadline]: z.string().min(1),
})

export type ExerciseFormValues = z.infer<typeof validationSchema>

export const useExerciseForm = (
  courseId?: number,
  exerciseId?: number,
  initialValues?: ExerciseFormValues
) => {
  const navigate = useNavigate()

  const formProps = useForm({
    resolver: zodResolver(validationSchema),
  })

  const { mutateAsync: createExercise } = useCreateExercise()
  const { mutateAsync: updateExercise } = useEditExercise({
    onSuccess: () => {
      navigate({
        to: '/exercise/$exerciseId',
        params: {
          exerciseId,
        },
      })
    },
  })

  const onSubmit = formProps.handleSubmit((values) => {
    if (exerciseId)
      return updateExercise({
        id: exerciseId,
        exerciseName: values.name,
        exerciseDescription: values.description,
        deadLine: new Date(values.deadline).toISOString(),
      })

    createExercise({
      courseId: Number(courseId),
      exerciseName: values.name,
      exerciseDescription: values.description,
      deadLine: new Date(values.deadline).toISOString(),
    })
  })

  useEffect(() => {
    if (initialValues) formProps.reset(initialValues)
  }, [formProps, initialValues])

  return { formProps, onSubmit }
}
