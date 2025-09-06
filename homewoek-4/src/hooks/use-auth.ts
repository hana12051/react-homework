import { useAuthContext } from '@/context/auth-context'

export function useAuth() {
  const { status, user } = useAuthContext()
  return { status, user }
}
