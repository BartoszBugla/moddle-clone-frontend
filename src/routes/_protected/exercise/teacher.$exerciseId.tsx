import { Link1Icon } from '@radix-ui/react-icons'
import { createFileRoute, Link } from '@tanstack/react-router'
import { format } from 'date-fns'

import { GoBackSubheader } from '@/components/dashboard/go-back-subheader'
import { Layout } from '@/components/dashboard/layout'
import Form from '@/components/forms/form'
import {
  Button,
  buttonVariants,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
} from '@/components/ui'
import { Textarea } from '@/components/ui/textarea'
import { useCourse } from '@/lib/api/hooks/course'
import { useGetExerciseTeacher } from '@/lib/api/hooks/exercise'
import { useGradeExerciseForm } from '@/lib/forms/use-grade-exercise-form'
import { cn } from '@/lib/utils'
import { APP_DATETIME_FORMAT } from '@/lib/utils/date-format'

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
        <Textarea />
        <div className="flex flex-row gap-2">
          <Input type="number" />

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
          <p>{data?.deadLine && format(data?.deadLine, APP_DATETIME_FORMAT)}</p>
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

                const isSubmitted = true

                return (
                  <div className="flex flex-col gap-2">
                    <h4>
                      {student.name} {student.surname} ({student.username})
                    </h4>
                    {isSubmitted ? (
                      <div>
                        <p>
                          {item?.studentComment ||
                            'No comment provided by student'}
                        </p>
                        <a
                          href="#"
                          target="_blank"
                          className="flex flex-row gap-2 items-center mb-2"
                        >
                          <Link1Icon />
                          Submitted File Link
                        </a>
                        <GradeForm
                          studentID={student.id || 0}
                          exerciseId={Number(exerciseId)}
                          initialValues={{
                            grade: 0,
                            comment: '',
                          }}
                        />
                        {item?.gradePercentage && <p>Already graded</p>}
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
