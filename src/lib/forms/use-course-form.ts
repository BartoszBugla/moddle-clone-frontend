import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import { useCreateCourse, useEditCourse } from '../api/hooks/course'

export enum ManageCourseFormField {
  Name = 'name',
  Description = 'description',
}

const validationSchema = z.object({
  [ManageCourseFormField.Name]: z.string().min(1),
  [ManageCourseFormField.Description]: z.string().min(1),
})

export type CourseFormType = z.infer<typeof validationSchema>

export const useCourseForm = (
  courseId?: number,
  initialState?: CourseFormType
) => {
  const formProps = useForm({
    resolver: zodResolver(validationSchema),
  })
  const navigate = useNavigate()

  const { mutateAsync: createCourse } = useCreateCourse({
    onSuccess: (data) => {
      toast.success('Exercise created successfully')
      navigate({
        to: '/courses/$id',
        params: {
          id: data,
        },
      })
    },
  })

  const { mutateAsync: editCourse } = useEditCourse({})

  const onSubmit = formProps.handleSubmit(async (values) => {
    if (courseId) {
      const data = await editCourse({ ...values, id: courseId })

      toast.success('Exercise Edited successfully')

      navigate({
        to: '/courses/$id',
        params: {
          id: courseId,
        },
      })
      return
    }
    createCourse(values)
  })

  useEffect(() => {
    if (initialState) formProps.reset(initialState)
  }, [initialState, formProps])

  return { formProps, onSubmit }
}
