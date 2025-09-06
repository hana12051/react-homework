// src/components/header.tsx (추가)
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '@/context/auth-context'

export default function Header() {
  const { status, user, signOut } = useAuth()
  return (
    <header className="site-header" role="banner">
      <div className="wrap header-inner">
        <h1 className="logo">
          <Link to="/">React × Supabase</Link>
        </h1>
        <nav aria-label="주 메뉴" className="main-nav">
          <ul>
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/sign-in">Sign In</NavLink>
            </li>
            <li>
              <NavLink to="/sign-up">Sign Up</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/posts">Posts</NavLink>
            </li>
          </ul>
        </nav>
        <div aria-live="polite" className="auth-indicator">
          {status === 'authenticated' ? (
            <>
              <span>👤 {user?.email}</span>
              <button
                type="button"
                onClick={signOut}
                style={{ marginInlineStart: '.5rem' }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <span>오프라인</span>
          )}
        </div>
      </div>
    </header>
  )
}
