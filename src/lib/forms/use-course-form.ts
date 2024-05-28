import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useCreateCourse } from '../api/hooks/course'

export enum ManageCourseFormField {
  Name = 'name',
  Description = 'description',
}

const validationSchema = z.object({
  [ManageCourseFormField.Name]: z.string().min(1),
  [ManageCourseFormField.Description]: z.string().min(1),
})

export type CourseFormType = z.infer<typeof validationSchema>

export const useCourseForm = (initialState?: CourseFormType) => {
  const formProps = useForm({
    resolver: zodResolver(validationSchema),
  })

  const { mutateAsync: createCourse } = useCreateCourse()

  const onSubmit = formProps.handleSubmit((values) => {
    createCourse(values)
  })

  useEffect(() => {
    if (initialState) formProps.reset(initialState)
  }, [initialState, formProps])

  return { formProps, onSubmit }
}
