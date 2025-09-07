import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { signInSchema } from '@/utils/schemas'

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (values: any) => {
    try {
      const { error } = await supabase.auth.signInWithPassword(values)
      if (error) throw error
      toast.success('로그인 성공!')
    } catch (e) {
      toast.error('로그인 실패', { description: String(e) })
    }

    const [params] = useSearchParams()
    const next = params.get('next') || '/'

    const onSubmit = async (values: SignInInput) => {
      try {
        const { error } = await supabase.auth.signInWithPassword(values)
        if (error) throw error
        toast.success('로그인 성공!')
        navigate(next, { replace: true }) // ← next 경로로 이동
      } catch (e) {
        toast.error('로그인 실패', { description: String(e) })
      }
    }
  }

  return (
    <section className="page" aria-labelledby="signin-heading">
      <h2 id="signin-heading">Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
        <label>
          이메일
          <input type="email" autoComplete="email" {...register('email')} />
          {errors.email && (
            <span role="alert">{errors.email.message as string}</span>
          )}
        </label>
        <label>
          비밀번호
          <input
            type="password"
            autoComplete="current-password"
            {...register('password')}
          />
          {errors.password && (
            <span role="alert">{errors.password.message as string}</span>
          )}
        </label>
        <button type="submit" disabled={isSubmitting}>
          로그인
        </button>
      </form>
    </section>
  )
}
