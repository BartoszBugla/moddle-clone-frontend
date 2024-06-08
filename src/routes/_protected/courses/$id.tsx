import { createFileRoute, Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { Check, Settings, Trash, X } from 'lucide-react'

import { GoBackSubheader } from '@/components/dashboard/go-back-subheader'
import { InviteUserDialog } from '@/components/dashboard/invite-user-dialog'
import { Layout } from '@/components/dashboard/layout'
import {
  Button,
  buttonVariants,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui'
import {
  useAcceptUserToCourse,
  useCourse,
  useKickUserFromCourse,
} from '@/lib/api/hooks/course'
import {
  EnrollmentStatus,
  getEnrollmentStatus,
} from '@/lib/common/utils/get-enrollment-status'
import { useAuth } from '@/lib/store/auth'
import { cn } from '@/lib/utils'
import { APP_DATETIME_FORMAT } from '@/lib/utils/date-format'
import { CourseCard } from '../dashboard'

export const Route = createFileRoute('/_protected/courses/$id')({
  component: CoursePage,
})

function CoursePage() {
  const { id } = Route.useParams<{ id: string }>()
  const tokenPayload = useAuth((s) => s.accessTokenPayload)

  const { data: courseData } = useCourse(Number(id))
  const { mutateAsync: acceptUser } = useAcceptUserToCourse(Number(id))
  const { mutateAsync: deleteUser } = useKickUserFromCourse(Number(id))

  const isOnwer = tokenPayload?.id === courseData?.user?.id?.toString()

  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-10">
        <div className="sm:col-span-12 col-span-1 flex flex-row justify-between items-center">
          <GoBackSubheader
            linkProps={{
              to: '/dashboard',
            }}
          />
          <Link
            to="/courses/edit/$id"
            params={{ id }}
            className={cn('gap-3', buttonVariants({ variant: 'outline' }))}
          >
            <Settings className="size-5" />
            Settings
          </Link>
        </div>

        <div className="sm:col-span-6 col-span-1 row-span-1 ">
          {courseData && (
            <CourseCard
              course={{
                ...courseData,
                adminDecision: true,
                userDecision: true,
              }}
            />
          )}
        </div>
        <div className="sm:col-span-6 col-span-1">
          <Card className="flex flex-col h-[350px]">
            <CardHeader>
              <CardTitle>Student List</CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <ul className="flex flex-1 flex-col overflow-y-auto max-h-[200px]">
                {(courseData?.students || [])
                  .filter(({ id }) => id !== courseData?.user?.id)
                  .map((student, idx) => {
                    const status = getEnrollmentStatus(
                      student.adminDecision,
                      student.userDecision
                    )

                    return (
                      <li
                        key={student.id}
                        className="flex flex-row justify-between text-sm items-center my-1 border-b border-border"
                      >
                        <div className="flex flex-col items-start overflow-auto ">
                          <div>
                            {idx + 1}.{student.username}
                          </div>
                          <div>
                            {student.name} {student.surname}
                          </div>
                        </div>
                        {isOnwer && (
                          <span className="ml-auto h-10">
                            {[
                              EnrollmentStatus.InCourse,
                              EnrollmentStatus.InvitedTo,
                            ].includes(status) && (
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => deleteUser(student.id || 0)}
                              >
                                <Trash className="text-destructive size-4" />
                              </Button>
                            )}

                            {EnrollmentStatus.Requested === status && (
                              <>
                                <Button
                                  onClick={() => deleteUser(student.id || 0)}
                                  size="icon"
                                  variant="ghost"
                                >
                                  <X className="size-4" />
                                </Button>
                                <Button
                                  onClick={() => acceptUser(student.id || 0)}
                                  size="icon"
                                  variant="ghost"
                                >
                                  <Check className="text-destructive size-4" />
                                </Button>
                              </>
                            )}
                          </span>
                        )}
                      </li>
                    )
                  })}
              </ul>
            </CardContent>
            <CardFooter>
              {isOnwer && (
                <InviteUserDialog
                  courseId={Number(id)}
                  usersInCourse={(courseData?.students || []).map(
                    ({ id }) => id || 0
                  )}
                />
              )}
            </CardFooter>
          </Card>
        </div>

        <div className="flex flex-col gap-4 col-span-1 sm:col-span-12">
          <Card>
            <CardHeader className="flex flex-row justify-between">
              <CardTitle>Exercises</CardTitle>
              {isOnwer && (
                <Link
                  to="/exercise/create/$id"
                  params={{ id }}
                  className={buttonVariants({ variant: 'default' })}
                >
                  Add
                </Link>
              )}
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-4">
                {courseData?.exercises?.map((ex) => {
                  if (!ex.exerciseId) return null
                  return (
                    <Link
                      to={
                        isOnwer
                          ? '/exercise/teacher/$exerciseId'
                          : '/exercise/$exerciseId'
                      }
                      params={{
                        exerciseId: ex.exerciseId.toString(),
                      }}
                    >
                      <div className="flex w-full flex-col gap-2 border-border border p-4 rounded-md">
                        <div className="flex flex-row gap-2 w-full items-center justify-between">
                          <h4>{ex.exerciseName}</h4>
                          <p className="text-muted-foreground text-sm">
                            Deadline:{' '}
                            {ex.deadLine &&
                              format(ex.deadLine, APP_DATETIME_FORMAT)}
                          </p>
                        </div>
                        <p className="line-clamp-3 text-sm">
                          {ex.exerciseDescription}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
