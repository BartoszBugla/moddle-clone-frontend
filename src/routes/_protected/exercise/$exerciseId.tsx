import { useCallback } from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'
import { createFileRoute, Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { FileUp } from 'lucide-react'
import { toast } from 'sonner'

import { GoBackSubheader } from '@/components/dashboard/go-back-subheader'
import { Layout } from '@/components/dashboard/layout'
import Form from '@/components/forms/form'
import { FormTextarea } from '@/components/forms/form-textarea'
import {
  Button,
  buttonVariants,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui'
import { useGetExercise } from '@/lib/api/hooks/exercise'
import {
  UploadExerciseFormField,
  useUploadExerciseForm,
} from '@/lib/forms/use-upload-exercise-form'
import { cn } from '@/lib/utils'
import { APP_DATETIME_FORMAT } from '@/lib/utils/date-format'

export const Route = createFileRoute('/_protected/exercise/$exerciseId')({
  component: ExercisePage,
  loader: () => {},
})

export function ExercisePage() {
  const { exerciseId } = Route.useParams<{ exerciseId: string }>()

  const { data } = useGetExercise(Number(exerciseId))

  const { formProps, onSubmit } = useUploadExerciseForm(Number(exerciseId))

  const onDrop = useCallback<Required<DropzoneOptions>['onDrop']>(
    async (acceptedFiles) => {
      if (acceptedFiles.length === 0) {
        toast.error('No file selected')
        return
      }

      acceptedFiles.forEach(async (file) => {
        formProps.setValue(UploadExerciseFormField.File, {
          name: file.name,
          type: file.type,
          base64: URL.createObjectURL(file),
        })
      })
    },
    [formProps]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
  })

  const fileValue = formProps.watch(`${UploadExerciseFormField.File}.name`)

  return (
    <Layout>
      <GoBackSubheader
        linkProps={{
          disabled: !data?.courseId,
          to: '/courses/$id',
          params: { id: data?.courseId },
        }}
      />

      <Card>
        <CardHeader className="justify-between flex flex-row">
          <CardTitle>{data?.exerciseName}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 h-auto">
          <h4>Until: </h4>
          <p>{data?.deadLine && format(data?.deadLine, APP_DATETIME_FORMAT)}</p>
          <h4>Description: </h4>
          <p>{data?.exerciseDescription}</p>

          <h4>Upload your file here: </h4>
          <div
            {...getRootProps()}
            className="w-40 border border-dashed border-border p-4"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="flex flex-col gap-2 justify-center items-center rounded-sm">
                <FileUp className="size-36" />
                <p>Drop the files here ...</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2 justify-center items-center rounded-sm">
                <FileUp />
                <p>
                  {' '}
                  {fileValue ? 'Change file' : 'Drag and drop files here.'}
                </p>
              </div>
            )}
          </div>
          <div>Files: {fileValue}</div>
          <Form {...formProps} onSubmit={onSubmit}>
            <div className="max-w-[600px]">
              <FormTextarea
                name={UploadExerciseFormField.Comment}
                label="Comment"
              />

              <Button disabled={!fileValue}>Upload your homowerk</Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </Layout>
  )
}
