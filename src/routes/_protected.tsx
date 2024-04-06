import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { Header } from '@/components/dashboard/header'
import { useAuth } from '@/lib/store/auth'

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ location }) => {
    if (!useAuth.getState().isAuthenticated) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: ProtectedRouteLayout,
})

export function ProtectedRouteLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex flex-1 flex-col p-4 dark:bg-muted/20 bg-muted/60">
        <Outlet />
      </main>
    </div>
  )
}
