import { useEffect } from 'react'
import { createFileRoute, Navigate } from '@tanstack/react-router'

import { useAuth } from '@/lib/store/auth'

export const Route = createFileRoute('/_auth/logout')({
  component: Logout,
})

function Logout() {
  const { signOut } = useAuth()

  useEffect(() => {
    signOut()
  }, [signOut])

  return <Navigate to="/sign-in" />
}
