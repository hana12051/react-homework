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

  const onChange = (n, v) => setValues((s) => ({ ...s, [n]: v }))
  const validate = () => {
    const e = {}
    if (!values.firstName || values.firstName.length < 2)
      e.firstName = '2글자 이상 입력'
    if (!values.email) e.email = '이메일을 입력하세요.'
    if (!values.password || values.password.length < 6) e.password = '6자 이상'
    if (values.confirm !== values.password) e.confirm = '비밀번호가 다릅니다.'
    if (!values.agree) e.agree = '약관 동의가 필요합니다.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    if (validate()) console.log('signup:', values)
  }

  return (
    <form onSubmit={onSubmit} className="form">
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
        label="비밀번호"
        name="password"
        placeholder="숫자·영문 조합 6자 이상"
        value={values.password}
        onChange={onChange}
        error={errors.password}
        autoComplete="new-password"
      />
      <PasswordInput
        label="비밀번호 확인"
        name="confirm"
        placeholder="입력한 비밀번호 다시 입력"
        value={values.confirm}
        onChange={onChange}
        error={errors.confirm}
        autoComplete="new-password"
      />
      <div className="inline">
        <Checkbox
          label="이용약관에 동의합니다"
          name="agree"
          checked={values.agree}
          onChange={onChange}
          error={errors.agree}
        />
      </div>
      <SubmitButton>회원가입</SubmitButton>
    </form>
  )
}
