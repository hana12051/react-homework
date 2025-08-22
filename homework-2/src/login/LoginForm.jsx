import { useState } from 'react'
import Checkbox from './components/Checkbox.jsx'
import PasswordInput from './components/PasswordInput.jsx'
import SubmitButton from './components/SubmitButton.jsx'
import TextInput from './components/TextInput.jsx'

export default function LoginForm() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    remember: false,
  })
  const [errors, setErrors] = useState({})

  const onChange = (name, value) => setValues((v) => ({ ...v, [name]: value }))
  const validate = () => {
    const e = {}
    if (!values.email) e.email = '이메일 입력'
    if (!values.password) e.password = '비밀번호 입력'
    setErrors(e)
    return Object.keys(e).length === 0
  }
  const onSubmit = (ev) => {
    ev.preventDefault()
    if (!validate()) return
    console.log('login:', values)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <TextInput
        label="이메일"
        name="email"
        type="email"
        placeholder="user@company.io"
        value={values.email}
        onChange={onChange}
        error={errors.email}
        autoComplete="email"
      />
      <PasswordInput
        label="패스워드"
        name="password"
        placeholder="숫자, 영문 조합 6자리 이상 입력"
        value={values.password}
        onChange={onChange}
        error={errors.password}
        autoComplete="current-password"
      />
      <div className="flex items-center justify-between">
        <Checkbox
          label="로그인 상태 유지"
          name="remember"
          checked={values.remember}
          onChange={(n, c) => onChange(n, c)}
        />
        <a
          href="#"
          className="text-sm text-slate-500 underline hover:text-slate-700"
        >
          비밀번호 찾기
        </a>
      </div>

      {/* 필 버튼: 카드 하단 중앙 */}
      <SubmitButton className="absolute left-1/2 -bottom-6 -translate-x-1/2 w-[332px] max-w-[90%]">
        로그인
      </SubmitButton>
    </form>
  )
}
