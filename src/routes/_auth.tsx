import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: () => (
    <div className="flex items-center justify-center min-h-screen">
      <Outlet />
    </div>
  ),
})
