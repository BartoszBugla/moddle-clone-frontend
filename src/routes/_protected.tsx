import { createFileRoute, Outlet } from '@tanstack/react-router'

import { Header } from '@/components/dashboard/header'

export const Route = createFileRoute('/_protected')({
  // beforeLoad: async ({ location }) => {
  // if (!useAuth.getState().isAuthenticated) {
  //   throw redirect({
  //     to: '/auth/sign-in',
  //     search: {
  //       // Use the current location to power a redirect after login
  //       // (Do not use `router.state.resolvedLocation` as it can
  //       // potentially lag behind the actual current location)
  //       redirect: location.href,
  //     },
  //   })
  // }
  // },
  component: ProtectedRouteLayout,
})

export function ProtectedRouteLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
