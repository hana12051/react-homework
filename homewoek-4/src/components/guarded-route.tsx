// src/components/guarded-route.tsx
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/auth-context'

export default function GuardedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { status, user } = useAuth()
  const { pathname } = useLocation()

  if (status === 'loading' || status === 'idle') return <div>Loading…</div>
  if (!user)
    return <Navigate to={`/sign-in?next=${encodeURIComponent(pathname)}`} />
  return <>{children}</>
}
