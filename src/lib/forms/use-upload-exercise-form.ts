import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useUploadExercise } from '../api/hooks/exercise'

export enum UploadExerciseFormField {
  File = 'file',
  Comment = 'comment',
}

export const validationSchema = z.object({
  [UploadExerciseFormField.File]: z.object({
    name: z.string().min(1),
    type: z.string().min(1),
    base64: z.string().min(1),
  }),
  [UploadExerciseFormField.Comment]: z.string(),
})

export type UploadExerciseFormValues = z.infer<typeof validationSchema>

export const useUploadExerciseForm = (
  exerciseId: number,
  initialValues?: UploadExerciseFormValues
) => {
  const formProps = useForm({
    defaultValues: {
      file: {
        name: '',
        type: '',
        base64: '',
      },
      comment: '',
    },
    resolver: zodResolver(validationSchema),
  })

  const { mutateAsync: uploadExercise } = useUploadExercise()

  const onSubmit = formProps.handleSubmit((values) => {
    const fileData = new File([values.file.base64], values.file.name, {
      type: values.file.type,
    })

    uploadExercise({ exerciseId, file: fileData })
  })

  useEffect(() => {
    if (initialValues) formProps.reset(initialValues)
  }, [formProps, initialValues])

  return { onSubmit, formProps }
}
