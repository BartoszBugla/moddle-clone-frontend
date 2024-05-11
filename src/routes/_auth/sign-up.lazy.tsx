import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'

import Form from '@/components/forms/form'
import { FormInput } from '@/components/forms/form-input'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui'
import { api } from '@/lib/api'
import { useErrorHandler } from '@/lib/error-handler/use-error-handler'
import { useAuth } from '@/lib/store/auth'
import { Route as DashboardRoute } from '@/routes/_protected/dashboard'

export const Route = createLazyFileRoute('/_auth/sign-up')({
  component: SignUp,
})

const schema = z.object({
  username: z.string().min(1).max(40),
  password: z.string().min(8).max(40),
  name: z.string().min(1).max(40),
  surname: z.string().min(1).max(40),
})

type FormValues = z.infer<typeof schema>

export function SignUp() {
  const navigate = useNavigate()
  const errorHandler = useErrorHandler()

  const signIn = useAuth((state) => state.signIn)

  const { mutateAsync, error } = useMutation({
    mutationFn: api.user.registerCreate,
    onError: (err) => {
      errorHandler(err, { notify: true })
    },
  })

  const { mutateAsync: mutateSignIn } = useMutation({
    mutationFn: api.user.loginCreate,
    onError: (err) => errorHandler(err, { notify: true }),
  })

  const formProps = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
      name: '',
      surname: '',
    },
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    await mutateAsync({
      name: values.name,
      surname: values.surname,
      password: values.password,
      username: values.username,
      roleId: 0, // teacher 1 is for user,
    })

    const token = (await mutateSignIn(values)) as unknown as string

    signIn({
      accessToken: token,
    })
    navigate({ to: DashboardRoute.fullPath })
  }

  return (
    <Form {...formProps} onSubmit={formProps.handleSubmit(onSubmit)}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your username below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <div className="flex flex-row gap-2">
            <FormInput label="Name" name="name" />
            <FormInput label="Surname" name="surname" />
          </div>

          <FormInput label="Username" name="username" />
          <FormInput label="Password" name="password" type="password" />
        </CardContent>
        {error && (
          <p className="text-sm text-destructive p-6 pt-0">
            {errorHandler(error).message}
          </p>
        )}
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full">Sign in</Button>

          <div className="mt-4 text-center text-sm">
            Already have an account?&nbsp;
            <Link to="/sign-in" className="underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Form>
  )
}
