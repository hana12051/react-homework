import { useState } from 'react'
import LoginForm from './LoginForm.jsx'
import SignupForm from './SignupForm.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import FormCard from './components/FormCard.jsx'
import FormFooter from './components/FormFooter.jsx'
import Logo from './components/Logo.jsx'

export default function Login() {
  const [mode, setMode] = useState('login') // 'login' | 'signup'

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto px-4">
        <Logo className="mb-6" />

        {/* 탭 */}
        <div className="mb-5 grid grid-cols-2 rounded-full bg-slate-100 p-1">
          {['login', 'signup'].map((key) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`py-2 text-sm font-medium rounded-full transition
        ${mode === key ? 'bg-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {key === 'login' ? '로그인' : '회원가입'}
            </button>
          ))}
        </div>

        <FormCard
          title={mode === 'login' ? '다시 만나서 반가워요' : '시작해볼까요?'}
        >
          {mode === 'login' ? <LoginForm /> : <SignupForm />}

          <FormFooter
            mode={mode}
            onSwitch={() => setMode(mode === 'login' ? 'signup' : 'login')}
          />
        </FormCard>
      </div>
    </AuthLayout>
  )
}
