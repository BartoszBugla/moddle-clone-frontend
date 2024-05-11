import { useQuery } from '@tanstack/react-query'
import {
  createLazyFileRoute,
  Link,
  Navigate,
  useParams,
} from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

import { Layout } from '@/components/dashboard/layout'
import {
  buttonVariants,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui'
import { api } from '@/lib/api'
import { cn } from '@/lib/utils'

export const Route = createLazyFileRoute('/_protected/courses/$id')({
  component: CoursePage,
})

function CoursePage() {
  const { id } = Route.useParams()

  const courseData = {
    name: 'Course Name',
    description: 'Course Description',
    teachers: [{ id: 1, name: 'Teacher', surname: 'Surname' }],
    exercises: [{ id: 1, name: 'Exercise' }],
  }

  const { data } = useQuery({
    queryKey: ['course', id],
    enabled: !!id,
    queryFn: () => api.course.courseDetail(Number(id)),
  })

  if (!id) {
    toast.error('Course not found')
    return <Navigate to="/dashboard" />
  }

  return (
    <Layout>
      <div className="grid grid-cols-12 gap-4">
        <Link
          to="/dashboard"
          className={cn(
            'flex flex-row gap-2 mr-auto mt-4 col-span-12',
            buttonVariants({ variant: 'ghost' })
          )}
        >
          <ArrowLeft /> Back to dashboard
        </Link>
        <div className=" flex flex-col gap-4 col-span-9">
          <Card>
            <CardHeader>
              <CardTitle>{courseData?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{courseData?.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exercises</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{courseData?.description}</p>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Student List</CardTitle>
            </CardHeader>
            <CardContent>DSds</CardContent>
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
