import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'

import Form from '@/components/forms/form'
import { FormInput } from '@/components/forms/form-input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { api } from '@/lib/api'
import { useAuth } from '@/lib/store/auth'
import { Route as DashboardRoute } from '@/routes/_protected/dashboard'

export const Route = createLazyFileRoute('/_auth/sign-in')({
  component: SignIn,
})

const schema = z.object({
  username: z.string().min(1).max(40),
  password: z.string().min(8).max(40),
})

type FormValues = z.infer<typeof schema>

export function SignIn() {
  const navigate = useNavigate()
  const signIn = useAuth((state) => state.signIn)

  const { mutateAsync, error } = useMutation({
    mutationFn: api.user.loginCreate,
    onSuccess: () => {
      navigate({ to: DashboardRoute.fullPath })
    },
  })

  const formProps = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const token = (await mutateAsync(values)) as unknown as string
    signIn({
      accessToken: token,
    })
    navigate({ to: DashboardRoute.fullPath })
  }

  return (
    <Form {...formProps} onSubmit={formProps.handleSubmit(onSubmit)}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <FormInput name="username" />
          <FormInput name="password" type="password" />
        </CardContent>
        <p className="text-sm text-destructive p-6 pt-0">{error?.message}</p>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full">Sign in</Button>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to={'/sign-up'} className="underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Form>
  )
}
