// src/context/auth-context.tsx
import type { Session, User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useReducer } from 'react'
import { supabase } from '@/lib/supabase'

// ← 프로젝트 경로에 맞게 수정

type AuthState = {
  status: 'loading' | 'authenticated' | 'unauthenticated'
  user: User | null
  session: Session | null
}

type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_AUTH'; user: User; session: Session | null }
  | { type: 'SET_UNAUTH' }

const initialState: AuthState = {
  status: 'loading',
  user: null,
  session: null,
}

function reducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, status: 'loading' }
    case 'SET_AUTH':
      return {
        status: 'authenticated',
        user: action.user,
        session: action.session,
      }
    case 'SET_UNAUTH':
      return { status: 'unauthenticated', user: null, session: null }
    default:
      return state
  }
}

type AuthContextValue = AuthState & {
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    // 초기 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        dispatch({ type: 'SET_AUTH', user: session.user, session })
      } else {
        dispatch({ type: 'SET_UNAUTH' })
      }
    })

    // 세션 변경 구독
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        dispatch({ type: 'SET_AUTH', user: session.user, session })
      } else {
        dispatch({ type: 'SET_UNAUTH' })
      }
    })

    return () => {
      sub.subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    // onAuthStateChange로 상태가 갱신됩니다.
  }

  const value: AuthContextValue = { ...state, signOut }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}
