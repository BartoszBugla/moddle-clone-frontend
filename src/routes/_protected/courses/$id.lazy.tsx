import { useCallback, useMemo } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createLazyFileRoute,
  Link,
  Navigate,
  useParams,
} from '@tanstack/react-router'
import { ArrowLeft, Check, Settings, Trash, X } from 'lucide-react'
import { toast } from 'sonner'

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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { api, CourseStudentDto } from '@/lib/api'
import { RoleModel } from '@/lib/api/temp-models'
import { useAuth } from '@/lib/store/auth'
import { cn } from '@/lib/utils'
import { CourseCard } from '../dashboard'

export const Route = createLazyFileRoute('/_protected/courses/$id')({
  component: CoursePage,
})

function CoursePage() {
  const { id } = Route.useParams()

  const tokenPayload = useAuth((s) => s.accessTokenPayload)

  // const isTeacherInCourse = tokenPayload?.role

  const { data: courseData } = useQuery({
    queryKey: ['course', id],
    enabled: !!id,
    queryFn: () => api.courses.coursesDetail(Number(id)),
  })

  const { mutateAsync: acceptUser } = useMutation({
    mutationFn: (userId: number) =>
      api.enrollments.acceptDetail(Number(id), userId),
  })

  console.log(tokenPayload, courseData?.user)

  const isOnwer = tokenPayload?.id === courseData?.user?.id?.toString()

  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-10">
        <div className="sm:col-span-12 col-span-1 flex flex-row justify-between items-center mt-4">
          <Link
            to="/dashboard"
            className={cn(
              'flex flex-row gap-2',
              buttonVariants({ variant: 'ghost' })
            )}
          >
            <ArrowLeft /> Back to dashboard
          </Link>
          <Button variant="outline" className="flex flex-row gap-2">
            Settings
            <Settings className="size-5"></Settings>
          </Button>
        </div>

        <div className="sm:col-span-6 col-span-1 row-span-1 ">
          {courseData && <CourseCard course={courseData} />}
        </div>
        <div className="sm:col-span-6 col-span-1">
          <Card className="flex flex-col h-[350px]">
            <CardHeader>
              <CardTitle>Student List</CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              {/* // TODO filter out logged user */}
              <ul className="flex flex-1 flex-col gap-2 overflow-y-auto max-h-[200px]">
                {(courseData?.students || []).map((student, idx) => {
                  return (
                    <li
                      key={student.id}
                      className="flex flex-row justify-between text-sm items-center h-10"
                    >
                      <div className="flex flex-row gap-2 items-center overflow-auto">
                        {/* <span>{student.username}</span> */}
                        <span>
                          {idx + 1}. {student.name} {student.surname}
                        </span>
                      </div>
                      {isOnwer && (
                        <span className="ml-auto h-10">
                          {student.adminDecision && (
                            <Button size="icon" variant="ghost">
                              <Trash className="text-destructive" />
                            </Button>
                          )}

                          {student.userDecision && (
                            <>
                              <Button size="icon" variant="ghost">
                                <X />
                              </Button>
                              <Button size="icon" variant="ghost">
                                <Check className="text-destructive" />
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
              <Button>Add</Button>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-4">
                {courseData?.exercises?.map((ex) => {
                  if (!ex.exerciseId) return null
                  return (
                    <Link to="/exercise/$id" params={{ id: ex.exerciseId }}>
                      <div className="flex w-full flex-col gap-2 border-border border p-4 rounded-md">
                        <div className="flex flex-row gap-2 w-full items-center justify-between">
                          <h4>{ex.exerciseName}</h4>
                          <p className="text-muted-foreground text-sm">
                            Deadline: {ex.deadLine}
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

        {/* <Card>
        <CardHeader>
          <CardTitle>Teachers</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {(courseData?.teachers || []).map((teacher) => (
              <li key={teacher.id}>
                {teacher.name} {teacher.surname}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exercises</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {(courseData?.exercises || []).map((exercise) => (
              <li key={exercise.id}>{exercise.name}</li>
            ))}
          </ul>
        </CardContent>
      </Card> */}
      </div>
    </Layout>
  )
}
