import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/exercise/$id')({
  parseParams: (params) => {
    return { id: Number(params.id) }
  },
})
