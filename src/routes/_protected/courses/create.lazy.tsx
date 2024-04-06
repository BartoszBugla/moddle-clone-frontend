import { useForm } from 'react-hook-form'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ChevronLeft } from 'lucide-react'

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
import { cn } from '@/lib/utils'

export const Route = createLazyFileRoute('/_protected/courses/create')({
  component: CreateCourse,
})

export function CreateCourse() {
  const formProps = useForm()
  const onSubmit = formProps.handleSubmit((data) => {})

  return (
    <Form
      onSubmit={onSubmit}
      {...formProps}
      className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4"
    >
      <div className="flex items-center gap-4 py-4">
        <Link
          to="/dashboard"
          className={cn('gap-4', buttonVariants({ variant: 'ghost' }))}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Go Back</span>
        </Link>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Create Course
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
              <CardDescription>Add descriptions to your course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <FormInput name="name" label="Name" />
                <FormTextarea name="description" label="Description" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Course Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="grid gap-3">
                  <Label htmlFor="category">Students</Label>
                  <Select>
                    <SelectTrigger id="category" aria-label="Select category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="subcategory">Subcategory (optional)</Label>
                  <Select>
                    <SelectTrigger
                      id="subcategory"
                      aria-label="Select subcategory"
                    >
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="t-shirts">T-Shirts</SelectItem>
                      <SelectItem value="hoodies">Hoodies</SelectItem>
                      <SelectItem value="sweatshirts">Sweatshirts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="hidden items-center gap-2 md:flex">
        <Button variant="outline" size="sm">
          Discard
        </Button>
        <Button size="sm">Save</Button>
      </div>
    </Form>
  )
}
