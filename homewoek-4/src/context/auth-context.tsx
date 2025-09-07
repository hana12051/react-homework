// src/context/auth-context.tsx
import { createContext, useContext, useEffect, useReducer } from 'react'
import { supabase } from '@/lib/supabase'

export type AuthStatus =
  | 'idle'
  | 'loading'
  | 'authenticated'
  | 'unauthenticated'

export type AuthState = {
  status: AuthStatus
  user: import('@supabase/supabase-js').User | null
}

type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_AUTH'; user: AuthState['user'] }
  | { type: 'SET_UNAUTH' }

const AuthCtx = createContext<
  (AuthState & { signOut: () => Promise<void> }) | null
>(null)

function reducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, status: 'loading' }
    case 'SET_AUTH':
      return { status: 'authenticated', user: action.user }
    case 'SET_UNAUTH':
      return { status: 'unauthenticated', user: null }
    default:
      return state
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { status: 'idle', user: null })

  useEffect(() => {
    let alive = true

    const init = async () => {
      dispatch({ type: 'SET_LOADING' })
      const { data } = await supabase.auth.getSession()
      if (!alive) return
      const user = data.session?.user ?? null
      dispatch(user ? { type: 'SET_AUTH', user } : { type: 'SET_UNAUTH' })
    }
    init()

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null
      dispatch(user ? { type: 'SET_AUTH', user } : { type: 'SET_UNAUTH' })
    })

    return () => {
      alive = false
      sub.subscription.unsubscribe()
    }
  }, [])

  async function signOut() {
    await supabase.auth.signOut()
  }

  return (
    <AuthCtx.Provider value={{ ...state, signOut }}>
      {children}
    </AuthCtx.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
