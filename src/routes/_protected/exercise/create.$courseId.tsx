import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

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
} from '@/components/ui'
import {
  ExerciseManageFormField,
  useExerciseForm,
} from '@/lib/forms/use-exercise-form'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/_protected/exercise/create/$courseId')({
  component: ExerciseManage,
})

export function ExerciseManage() {
  const { courseId } = Route.useParams<{ courseId: string }>()
  const { formProps, onSubmit } = useExerciseForm()

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
              to={'/courses/$id'}
              params={{
                id: courseId,
              }}
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
                  <CardTitle>Create Exercise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-6">
                    <FormInput
                      label="Name"
                      name={ExerciseManageFormField.Name}
                    />
                    <FormTextarea
                      label="Description"
                      name={ExerciseManageFormField.Description}
                    />
                    <FormInput
                      label="Deadline"
                      name={ExerciseManageFormField.Deadline}
                      type="datetime-local"
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
