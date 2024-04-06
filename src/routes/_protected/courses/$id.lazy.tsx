import { createLazyFileRoute, Link, Navigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import {
  buttonVariants,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui'
import { cn } from '@/lib/utils'

export const Route = createLazyFileRoute('/_protected/courses/$id')({
  component: CoursePage,
})

function CoursePage() {
  const courseData = {
    name: 'Course Name',
    description: 'Course Description',
    teachers: [{ id: 1, name: 'Teacher', surname: 'Surname' }],
    exercises: [{ id: 1, name: 'Exercise' }],
  }

  return (
    <div className="flex flex-col gap-4">
      <Link
        to="/dashboard"
        className={cn(
          'flex flex-row gap-2 mr-auto',
          buttonVariants({ variant: 'ghost' })
        )}
      >
        <ArrowLeft /> Back to dashboard
      </Link>

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
      </Card>
    </div>
  )
}
