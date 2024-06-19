import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useGradeExercise } from '../api/hooks/grade'

export enum GradeExerciseFormField {
  Grade = 'grade',
  Comment = 'comment',
}

export const validationSchema = z.object({
  [GradeExerciseFormField.Grade]: z.coerce
    .number()
    .min(1, 'Grade must be a number between 1 and 100')
    .max(100, 'Grade must be a number between 1 and 100'),
  [GradeExerciseFormField.Comment]: z.string(),
})

export type GradeExerciseFormValues = z.infer<typeof validationSchema>

export const useGradeExerciseForm = (
  studentId: number,
  exerciseId: number,
  initialValues?: GradeExerciseFormValues
) => {
  const formProps = useForm({
    resolver: zodResolver(validationSchema),
  })

  const { mutateAsync: gradeExercise } = useGradeExercise()
  const onSubmit = formProps.handleSubmit((values) => {
    gradeExercise({
      exerciseId,
      studentId,
      comment: values.comment,
      grade: values.grade,
    })
  })

  useEffect(() => {
    if (initialValues) formProps.reset(initialValues)
  }, [formProps, initialValues])

  return { onSubmit, formProps }
}
