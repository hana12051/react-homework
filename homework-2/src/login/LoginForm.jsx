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

  const onChange = (n, v) => setValues((s) => ({ ...s, [n]: v }))
  const validate = () => {
    const e = {}
    if (!values.email) e.email = '이메일을 입력하세요.'
    if (!values.password) e.password = '비밀번호를 입력하세요.'
    setErrors(e)
    return Object.keys(e).length === 0
  }
  const onSubmit = (ev) => {
    ev.preventDefault()
    if (validate()) console.log('login:', values)
  }

  return (
    <form onSubmit={onSubmit} className="form">
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
        label="비밀번호"
        name="password"
        placeholder="숫자·영문 조합 6자 이상"
        value={values.password}
        onChange={onChange}
        error={errors.password}
        autoComplete="current-password"
      />
      <div className="inline">
        <Checkbox
          label="로그인 상태 유지"
          name="remember"
          checked={values.remember}
          onChange={onChange}
        />
        <a
          href="#"
          style={{
            fontSize: 14,
            color: 'var(--muted)',
            textDecoration: 'underline',
          }}
        >
          비밀번호 찾기
        </a>
      </div>
      <SubmitButton>로그인</SubmitButton>
    </form>
  )
}
