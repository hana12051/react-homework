import { useState } from 'react'
import Checkbox from './components/Checkbox.jsx'
import PasswordInput from './components/PasswordInput.jsx'
import SubmitButton from './components/SubmitButton.jsx'
import TextInput from './components/TextInput.jsx'

export default function SignupForm() {
  const [values, setValues] = useState({
    firstName: '',
    email: '',
    password: '',
    confirm: '',
    agree: false,
  })
  const [errors, setErrors] = useState({})

  const onChange = (name, value) => setValues((v) => ({ ...v, [name]: value }))

  const validate = () => {
    const e = {}
    if (!values.firstName || values.firstName.length < 2)
      e.firstName = '2글자 이상 입력'
    if (!values.email) e.email = '이메일 입력'
    if (!values.password || values.password.length < 6) e.password = '6자 이상'
    if (values.confirm !== values.password) e.confirm = '비밀번호가 다릅니다'
    if (!values.agree) e.agree = '약관 동의 필요'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    if (!validate()) return
    console.log('signup:', values)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <TextInput
        label="이름"
        name="firstName"
        value={values.firstName}
        onChange={onChange}
        hint="2글자 이상 입력"
        error={errors.firstName}
      />
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
        autoComplete="new-password"
      />
      <PasswordInput
        label="패스워드 확인"
        name="confirm"
        placeholder="입력한 패스워드 다시 입력"
        value={values.confirm}
        onChange={onChange}
        error={errors.confirm}
        autoComplete="new-password"
      />
      <div className="pt-1">
        <Checkbox
          label="로그인 상태 유지"
          name="agree"
          checked={values.agree}
          onChange={(n, c) => onChange(n, c)}
          error={errors.agree}
        />
      </div>

      {/* 필 버튼: 카드 아래로 살짝 튀어나오게 */}
      <SubmitButton className="absolute left-1/2 -bottom-6 -translate-x-1/2 w-[332px] max-w-[90%]">
        회원가입
      </SubmitButton>
    </form>
  )
}
