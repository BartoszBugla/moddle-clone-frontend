import { Link1Icon } from '@radix-ui/react-icons'
import { createFileRoute, Link } from '@tanstack/react-router'
import { format } from 'date-fns'

import { GoBackSubheader } from '@/components/dashboard/go-back-subheader'
import { Layout } from '@/components/dashboard/layout'
import Form from '@/components/forms/form'
import { FormInput } from '@/components/forms/form-input'
import { FormTextarea } from '@/components/forms/form-textarea'
import {
  Button,
  buttonVariants,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
} from '@/components/ui'
import { Deadline } from '@/components/ui/deadline'
import { Textarea } from '@/components/ui/textarea'
import { useCourse } from '@/lib/api/hooks/course'
import { useGetExerciseTeacher } from '@/lib/api/hooks/exercise'
import {
  GradeExerciseFormField,
  useGradeExerciseForm,
} from '@/lib/forms/use-grade-exercise-form'
import { cn } from '@/lib/utils'
import { APP_DATETIME_FORMAT } from '@/lib/utils/date-format'
import { getFileUrl } from '@/lib/utils/file'

export const Route = createFileRoute(
  '/_protected/exercise/teacher/$exerciseId'
)({
  component: ExercisePageTeacher,
})

export const GradeForm = ({
  studentID,
  exerciseId,
  initialValues,
}: {
  studentID: number
  exerciseId: number
  initialValues?: { grade: number; comment: string }
}) => {
  const { formProps, onSubmit } = useGradeExerciseForm(
    studentID,
    exerciseId,
    initialValues
  )

  return (
    <Form {...formProps} onSubmit={onSubmit}>
      <div className="flex flex-col gap-2 w-[400px]">
        <div className="flex flex-row gap-2 items-center">
          <FormInput name={GradeExerciseFormField.Grade} type="number" />

          <Button className="w-full">Grade</Button>
        </div>
      </div>
    </Form>
  )
}
export function ExercisePageTeacher() {
  const { exerciseId } = Route.useParams<{ exerciseId: string }>()

  const { data } = useGetExerciseTeacher(Number(exerciseId))
  const { data: course } = useCourse(data?.courseId)

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
          <div>
            <Link
              to="/exercise/edit/$exerciseId"
              params={{
                exerciseId,
              }}
              className={cn(buttonVariants({ variant: 'outline' }))}
            >
              Edit
            </Link>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 h-auto">
          <h4>Deadline: </h4>

          <Deadline deadline={data?.deadLine} />

          <h4>Description: </h4>
          <p className="break-words">{data?.exerciseDescription}</p>
          <hr />
          <div className="flex flex-col gap-4">
            {(course?.students || [])
              .filter(({ id }) => id !== course?.user?.id)
              .map((student) => {
                const item = data?.grades?.find(
                  ({ userId }) => userId === student.id
                )

                const isSubmitted = !!item?.fileUploadUrl
                const isGraded = !!item?.gradePercentage

                return (
                  <div className="flex flex-col gap-2">
                    <h4 className={isGraded ? 'text-green-500' : ''}>
                      {student.name} {student.surname} ({student.username})
                    </h4>
                    {isSubmitted ? (
                      <div>
                        <p>
                          {item?.studentComment
                            ? `Comment: ${item?.studentComment}`
                            : 'No comment provided by student'}
                        </p>
                        <a
                          href={getFileUrl(Number(item?.fileUploadUrl))}
                          target="_blank"
                          className={`flex flex-row gap-2 items-center mb-2 ${buttonVariants({ variant: 'link' })}`}
                        >
                          <Link1Icon />
                          Submitted File Link
                        </a>
                        <GradeForm
                          studentID={student.id || 0}
                          exerciseId={Number(exerciseId)}
                          initialValues={{
                            grade: item?.gradePercentage || 0,
                            comment: item?.teacherComment || '',
                          }}
                        />
                      </div>
                    ) : (
                      <div>Not submitted Solution yet</div>
                    )}
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>
    </Layout>
  )
}
