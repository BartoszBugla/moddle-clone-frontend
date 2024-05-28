import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Layout } from '@/components/dashboard/layout'
import Form from '@/components/forms/form'
import { FormInput } from '@/components/forms/form-input'
import { FormSelect } from '@/components/forms/form-select'
import { Button, buttonVariants } from '@/components/ui'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AllCourseType, api, CourseListItemDTO } from '@/lib/api'
import { UserRole } from '@/lib/api/enums/user-role'
import {
  EnrollmentStatus,
  getEnrollmentStatus,
} from '@/lib/common/utils/get-enrollment-status'
import { useErrorHandler } from '@/lib/error-handler/use-error-handler'
import { useAuth } from '@/lib/store/auth'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/_protected/dashboard')({
  component: Dashboard,
})

export interface CourseCardProps {
  course: CourseListItemDTO
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const errorHandler = useErrorHandler()
  const queryClient = useQueryClient()
  const status = getEnrollmentStatus(course.adminDecision, course.userDecision)

  const { mutateAsync: enroll } = useMutation({
    mutationFn: () => api.enrollments.joinCreate(course.id || 0),

    onSuccess: () => {
      toast.success('Enrolled successfully')
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    },

    onError: (err) => {
      errorHandler(err, { notify: true })
    },
  })

  const buttonTextMap = {
    [EnrollmentStatus.InvitedTo]: 'Enroll',
    [EnrollmentStatus.Requested]: 'Waiting for approval',
    [EnrollmentStatus.CanEnroll]: 'Enroll',
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex h-auto flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className=" text-xl font-medium">{course.name}</CardTitle>

        {EnrollmentStatus.InCourse !== status && (
          <Button
            disabled={status === EnrollmentStatus.Requested}
            onClick={() => enroll()}
            className="text-xs"
          >
            {buttonTextMap[status]}
          </Button>
        )}
      </CardHeader>
      <CardContent className="h-full flex flex-col justify-between">
        <div className="text-sm line-clamp-3 min-h-6">
          {course.description || 'No description'}
        </div>

        <p className="text-xs text-muted-foreground pt-2">
          Teacher: {course?.user?.name} {course?.user?.surname} (
          {course?.user?.username})
        </p>
      </CardContent>
    </Card>
  )
}

export function Dashboard() {
  const tokenPayload = useAuth((state) => state.accessTokenPayload)
  const formProps = useForm({
    defaultValues: {
      search: '',
      type: AllCourseType.All,
    },
  })

  const { data: courses } = useQuery({
    queryKey: ['courses', formProps.watch('type')],
    queryFn: () => api.courses.coursesList({ type: formProps.watch('type') }),
  })

  return (
    <div className="flex flex-col flex-1 h-full">
      <Form
        {...formProps}
        className="w-full sticky backdrop-blur-xl mx-auto bg-background/50 p-2  top-16 z-10 border-b"
        onSubmit={() => {}}
      >
        <div className="flex flex-row gap-2 items-center mx-auto max-w-[600px] w-full">
          {/* <div className="flex-1 h-full"> */}
          <FormInput className="w-full" name="search" placeholder="Search..." />
          <FormSelect
            name="type"
            options={[
              {
                value: AllCourseType.All,
                label: 'All courses',
              },
              {
                value: AllCourseType.User,
                label: 'My courses',
              },
              {
                value: AllCourseType.NotUser,
                label: 'Courses to enroll',
              },
            ]}
          />
          {/* </div> */}

          {tokenPayload?.role === UserRole.Teacher && (
            <Link
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'flex flex-row gap-2 pt-2'
              )}
              to="/courses/create"
            >
              <span>Add new</span>
              <PlusIcon className="size-5" />
            </Link>
          )}
        </div>
      </Form>
      <Layout>
        <div className="size-full dark:bg-muted/20 bg-muted flex-1 h-full">
          <div className="flex-col gap-4 flex w-full p-4 max-w-[800px] mx-auto pt-2 ">
            {(courses || []).map((course, idx) => (
              <Link
                disabled={!course.adminDecision}
                key={idx}
                to="/courses/$id"
                params={{ id: (course?.id || 1).toString() }}
                className={cn('transition', {
                  'cursor-pointer hover:brightness-95': false,
                })}
              >
                <CourseCard key={idx} course={course} />
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  )
}
