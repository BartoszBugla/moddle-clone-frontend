import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useCreateGrade } from '../api/hooks/exercise'

export enum GradeExerciseFormField {
  Grade = 'grade',
  Comment = 'comment',
}

export const validationSchema = z.object({
  [GradeExerciseFormField.Grade]: z.number().min(0).max(100),
  [GradeExerciseFormField.Comment]: z.string().min(1),
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

  const { mutateAsync: gradeExercise } = useCreateGrade()
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
