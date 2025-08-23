import { useEffect, useState } from 'react'
import LoginForm from './LoginForm.jsx'
import SignupForm from './SignupForm.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import FormCard from './components/FormCard.jsx'

const TABS = [
  { key: 'signup', label: '회원가입' },
  { key: 'login', label: '로그인' },
]

export default function Login() {
  const [mode, setMode] = useState('signup')

  // 시작 시 URL ?mode=값 반영
  useEffect(() => {
    const m = new URLSearchParams(window.location.search).get('mode')
    if (m === 'login' || m === 'signup') setMode(m)
  }, [])

  // 전환 시 URL 갱신 (공유용)
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search)
    sp.set('mode', mode)
    window.history.replaceState(null, '', `?${sp.toString()}`)
    document.title = mode === 'signup' ? '회원가입' : '로그인'
  }, [mode])

  const handleNav = (e, next) => {
    e.preventDefault()
    setMode(next)
  }

  return (
    <AuthLayout>
      <div className="container">
        {/* 상단 이동 버튼(강사님 확인용 링크 포함) */}
        <nav className="topnav" aria-label="인증 전환">
          <a
            href="?mode=signup"
            onClick={(e) => handleNav(e, 'signup')}
            className={`topnav__btn ${mode === 'signup' ? 'is-active' : ''}`}
            aria-current={mode === 'signup' ? 'page' : undefined}
          >
            회원가입
          </a>
          <a
            href="?mode=login"
            onClick={(e) => handleNav(e, 'login')}
            className={`topnav__btn ${mode === 'login' ? 'is-active' : ''}`}
            aria-current={mode === 'login' ? 'page' : undefined}
          >
            로그인
          </a>
        </nav>

        {/* 패널 + 단일 카드 */}
        <div className="panel">
          <FormCard>
            {mode === 'signup' ? <SignupForm /> : <LoginForm />}
          </FormCard>
        </div>
      </div>
    </AuthLayout>
  )
}
