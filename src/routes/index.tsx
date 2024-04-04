import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    document.title = 'Hello world'
  },

  component: () => {
    return <Navigate to="/sign-in" />
  },
})
