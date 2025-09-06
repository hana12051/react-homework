// src/routes/sign-up.tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { humanizeError } from '@/utils/errors'
import { type SignUpInput, signUpSchema } from '@/utils/schemas'

export default function SignUp() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get('next') || '/'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (values: SignUpInput) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: { data: { full_name: values.full_name } },
      })
      if (error) throw error
      toast.success('가입 완료! 메일 인증이 필요한 경우 안내를 확인하세요.')
      navigate(`/sign-in?next=${encodeURIComponent(next)}`, { replace: true })
    } catch (e) {
      toast.error(humanizeError(e, '가입에 실패했습니다.'))
    }
  }

  return (
    <section className="page" aria-labelledby="signup-heading">
      <h2 id="signup-heading">Sign Up</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="field">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register('email')}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p role="alert">{errors.email.message}</p>}
        </div>
        <div className="field">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            {...register('password')}
            aria-invalid={!!errors.password}
          />
          {errors.password && <p role="alert">{errors.password.message}</p>}
        </div>
        <div className="field">
          <label htmlFor="full_name">이름(선택)</label>
          <input
            id="full_name"
            type="text"
            autoComplete="name"
            {...register('full_name')}
            aria-invalid={!!errors.full_name}
          />
          {errors.full_name && <p role="alert">{errors.full_name.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '가입 중…' : '가입'}
        </button>
      </form>
      <p>
        이미 계정이 있나요?{' '}
        <Link to={`/sign-in?next=${encodeURIComponent(next)}`}>Sign In</Link>
      </p>
    </section>
  )
}
