import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { signUpSchema } from '@/utils/schemas'

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (values: any) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: { data: { full_name: values.full_name } },
      })
      if (error) throw error
      toast.success('회원가입 성공! 이메일 확인 필요')
    } catch (e) {
      toast.error('회원가입 실패', { description: String(e) })
    }
  }

  return (
    <section className="page" aria-labelledby="signup-heading">
      <h2 id="signup-heading">Sign Up</h2>
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
            autoComplete="new-password"
            {...register('password')}
          />
          {errors.password && (
            <span role="alert">{errors.password.message as string}</span>
          )}
        </label>
        <label>
          이름(선택)
          <input
            type="text"
            autoComplete="username"
            {...register('username')}
          />
          {errors.full_name && (
            <span role="alert">{errors.full_name.message as string}</span>
          )}
        </label>
        <button type="submit" disabled={isSubmitting}>
          회원가입
        </button>
      </form>
    </section>
  )
}
