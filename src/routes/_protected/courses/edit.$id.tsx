import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { GoBackSubheader } from '@/components/dashboard/go-back-subheader'
import { Layout } from '@/components/dashboard/layout'
import Form from '@/components/forms/form'
import { FormInput } from '@/components/forms/form-input'
import { FormTextarea } from '@/components/forms/form-textarea'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useCourse } from '@/lib/api/hooks/course'
import {
  ManageCourseFormField,
  useCourseForm,
} from '@/lib/forms/use-course-form'

export const Route = createFileRoute('/_protected/courses/edit/$id')({
  component: ManageCourse,
})

function ManageCourse() {
  const { id } = Route.useParams<{ id: string }>()
  const { data: courseData } = useCourse(Number(id))
  const { onSubmit, formProps } = useCourseForm(
    useMemo(
      () => ({
        name: courseData?.name || '',
        description: courseData?.description || '',
      }),
      [courseData]
    )
  )

  return (
    <Layout>
      <div className="flex flex-col gap-4 w-full items-center ">
        <Form
          onSubmit={onSubmit}
          {...formProps}
          className="w-full max-w-[600px]"
        >
          <GoBackSubheader
            linkProps={{
              to: '/courses/$id',
              params: { id },
            }}
          />
          <div className="gap-4 flex flex-col w-full">
            <div className="flex flex-col items-start gap-4 w-full">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-6">
                    <FormInput name={ManageCourseFormField.Name} label="Name" />
                    <FormTextarea
                      name={ManageCourseFormField.Description}
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
