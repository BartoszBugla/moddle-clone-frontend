import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import {
  createFileRoute,
  createLazyFileRoute,
  Link,
  useNavigate,
} from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { z } from 'zod'

import { Layout } from '@/components/dashboard/layout'
import Form from '@/components/forms/form'
import { FormInput } from '@/components/forms/form-input'
import { FormTextarea } from '@/components/forms/form-textarea'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { api, CourseDTO } from '@/lib/api'
import { useErrorHandler } from '@/lib/error-handler/use-error-handler'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/_protected/courses/manage/$id')({
  component: CreateCourse,
})

export enum CreateCourseFormField {
  Name = 'name',
  Description = 'description',
}

const validationSchema = z.object({
  [CreateCourseFormField.Name]: z.string().min(1),
  [CreateCourseFormField.Description]: z.string().min(1),
})

export function CreateCourse() {
  const formProps = useForm({
    resolver: zodResolver(validationSchema),
  })

  const errorHandler = useErrorHandler()
  const navigate = useNavigate()
  const { mutateAsync: createCourse } = useMutation({
    mutationFn: (data: CourseDTO) => api.course.createCourseCreate(data),
    onSuccess: () => navigate({ to: '/dashboard' }),
    onError: (err) => errorHandler(err, { notify: true }),
  })

  const onSubmit = formProps.handleSubmit((values) => {
    createCourse(values)
  })

  return (
    <Layout>
      <div className="flex flex-col gap-4 w-full items-center ">
        <Form
          onSubmit={onSubmit}
          {...formProps}
          className="w-full max-w-[600px]"
        >
          <div className="flex items-center gap-4 py-4 w-full">
            <Link
              to="/dashboard"
              className={cn('gap-4', buttonVariants({ variant: 'ghost' }))}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </Link>
          </div>
          <div className="gap-4 flex flex-col w-full">
            <div className="flex flex-col items-start gap-4 w-full">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                  <CardDescription>
                    Add descriptions to your course
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-6">
                    <FormInput name={CreateCourseFormField.Name} label="Name" />
                    <FormTextarea
                      name={CreateCourseFormField.Description}
                      label="Description"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="items-center gap-2 flex mt-5">
            <Button
              onClick={() => formProps.reset()}
              variant="outline"
              type="reset"
            >
              Reset
            </Button>
            <Button>Save</Button>
          </div>
        </Form>
      </div>
    </Layout>
  )
}
