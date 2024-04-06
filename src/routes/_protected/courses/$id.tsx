import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/courses/$id')({
  loader: async ({ params }) => {},
})
