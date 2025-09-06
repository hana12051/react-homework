// src/routes/sign-in.tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { humanizeError } from '@/utils/errors'
import { type SignInInput, signInSchema } from '@/utils/schemas'

export default function SignIn() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get('next') || '/'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (values: SignInInput) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })
      if (error) throw error
      toast.success('로그인 성공!')
      navigate(next, { replace: true })
    } catch (e) {
      toast.error(humanizeError(e, '이메일 또는 비밀번호를 확인하세요.'))
    }
  }

  return (
    <section className="page" aria-labelledby="signin-heading">
      <h2 id="signin-heading">Sign In</h2>
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
            autoComplete="current-password"
            {...register('password')}
            aria-invalid={!!errors.password}
          />
          {errors.password && <p role="alert">{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '로그인 중…' : '로그인'}
        </button>
      </form>
      <p>
        계정이 없나요?{' '}
        <Link to={`/sign-up?next=${encodeURIComponent(next)}`}>Sign Up</Link>
      </p>
    </section>
  )
}
