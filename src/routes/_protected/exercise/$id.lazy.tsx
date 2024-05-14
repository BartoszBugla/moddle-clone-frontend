import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Settings } from 'lucide-react'

import { Layout } from '@/components/dashboard/layout'
import { Button, buttonVariants, Card, CardHeader } from '@/components/ui'
import { api } from '@/lib/api'
import { cn } from '@/lib/utils'

export const Route = createLazyFileRoute('/_protected/exercise/$id')({
  component: () => <ExercisePage />,
})

function ExercisePage() {
  const { id } = Route.useParams()

  // const tokenPayload = useAuth((s) => s.accessTokenPayload)

  // const isTeacherInCourse = tokenPayload?.role

  const { data: exercise } = useQuery({
    queryKey: ['course', id],
    enabled: !!id,
    queryFn: () => api.exercise.exerciseDetail(Number(id)),
  })

  if (!exercise) return null

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-4 mb-10">
        <div className="sm:col-span-12 col-span-1 flex flex-row justify-between items-center mt-4">
          <Link
            to="/courses/$id"
            params={{ id: exercise?.courseId }}
            className={cn(
              'flex flex-row gap-2',
              buttonVariants({ variant: 'ghost' })
            )}
          >
            <ArrowLeft /> Back to Course
          </Link>
        </div>
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h1 className="text-xl font-medium">{exercise.title}</h1>
          </CardHeader>
        </Card>
      </div>
    </Layout>
  )
}
