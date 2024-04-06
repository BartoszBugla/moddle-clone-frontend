import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'

import { Button, buttonVariants } from '@/components/ui'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { api } from '@/lib/api'
import { CourseModel } from '@/lib/api/temp-models'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/_protected/dashboard')({
  component: Dashboard,
})

export interface CourseCardProps {
  course: CourseModel
}

export const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link to="/courses/$id" params={{ id: course.id.toString() }}>
      <Card className="cursor-pointer hover:brightness-90">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className=" text-xl font-medium">{course.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-bold line-clamp-3">
            {course.description}
          </div>

          {(course.teachers || []).map((teacher) => (
            <p key={teacher.id} className="text-xs text-muted-foreground">
              Teacher: {teacher.name} {teacher.surname}
            </p>
          ))}
        </CardContent>
      </Card>
    </Link>
  )
}
export function Dashboard() {
  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: api.course.allCourseList,
  })

  return (
    <div className="flex-col gap-4 mx-auto flex w-[600px]">
      <div className="w-full flex flex-row justify-between">
        <h1 className="text-xl">Courses</h1>
        <Link
          className={buttonVariants({ size: 'icon', variant: 'outline' })}
          to="/courses/create"
        >
          <PlusIcon />
        </Link>
      </div>

      {(courses || []).map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
