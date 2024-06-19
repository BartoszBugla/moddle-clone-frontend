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
import { Deadline } from '@/components/ui/deadline'
import { useGetExercise } from '@/lib/api/hooks/exercise'
import { useUploadGrade } from '@/lib/api/hooks/grade'
import {
  UploadExerciseFormField,
  useUploadExerciseForm,
} from '@/lib/forms/use-upload-exercise-form'
import { cn } from '@/lib/utils'
import { APP_DATETIME_FORMAT } from '@/lib/utils/date-format'
import { getFileUrl } from '@/lib/utils/file'

export const Route = createFileRoute('/_protected/exercise/$exerciseId')({
  component: ExercisePage,
  loader: () => {},
})

export function ExercisePage() {
  const { exerciseId } = Route.useParams<{ exerciseId: string }>()

  const { data } = useGetExercise(Number(exerciseId))

  const { mutateAsync: uploadGrade } = useUploadGrade({
    onSuccess: () => {
      toast.success('Grade uploaded')
    },
  })

  const { formProps } = useUploadExerciseForm(Number(exerciseId))

  const handleSubmit = formProps.handleSubmit(async (values) => {
    const file = await fetch(values.file.base64)
      .then((res) => res.blob())
      .then(
        (blob) => new File([blob], values.file.name, { type: values.file.type })
      )

    try {
      await uploadGrade({
        exerciseId: Number(exerciseId),
        comment: values.comment,
        file: file,
      })
    } catch (e) {
      toast.error('Error uploading grade')
    }
  })

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

  const isExerciseSubmitted = !!data?.grade?.fileUploadUrl
  const isExerciseGraded = !!data?.grade?.gradePercentage

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    disabled: isExerciseSubmitted,
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

          <Deadline deadline={data?.deadLine} />

          <h4>Description: </h4>
          <p>{data?.exerciseDescription}</p>

          {isExerciseSubmitted && <h4>Your homework is submitted!</h4>}

          {isExerciseGraded && (
            <div>
              <p>
                Grade:{' '}
                {data?.grade?.gradePercentage
                  ? data?.grade?.gradePercentage + ' / 100'
                  : 'Waiting for teacher'}
              </p>
              <p>
                Submitted file:{' '}
                <a
                  className={buttonVariants({ variant: 'link' })}
                  target="_blank"
                  href={getFileUrl(Number(data?.grade?.fileUploadUrl) || 0)}
                >
                  File
                </a>
              </p>
              {data?.grade?.teacherComment && (
                <p>{data?.grade?.teacherComment}</p>
              )}
            </div>
          )}

          {!isExerciseSubmitted && (
            <>
              <h4>Upload your file here: </h4>
              <p className="text-destructive">
                Remember you can sumbit your file only once!
              </p>
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
                      {fileValue ? 'Change file' : 'Drag and drop files here.'}
                    </p>
                  </div>
                )}
              </div>
              <div>Files: {fileValue}</div>
              <Form {...formProps} onSubmit={handleSubmit}>
                <div className="max-w-[600px]">
                  <FormTextarea
                    disabled={isExerciseSubmitted}
                    name={UploadExerciseFormField.Comment}
                    label="Comment"
                  />

                  <Button disabled={!fileValue}>Upload your homowerk</Button>
                </div>
              </Form>
            </>
          )}
        </CardContent>
      </Card>
    </Layout>
  )
}
