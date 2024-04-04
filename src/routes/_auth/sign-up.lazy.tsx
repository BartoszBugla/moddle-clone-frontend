import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/sign-up')({
  component: () => <div>Hello /sign-up!</div>,
})
