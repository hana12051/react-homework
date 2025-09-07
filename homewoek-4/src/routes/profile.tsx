import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useAuth } from '@/context/auth-context'
import { loadProfile, updateProfile } from '@/lib/profile-api'
import { type ProfileInput, profileSchema } from '@/utils/schemas'

export default function Profile() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    mode: 'onBlur',
  })

  useEffect(() => {
    if (!user) return
    ;(async () => {
      setLoading(true)
      const { data, error } = await loadProfile(user.id)
      if (error) console.error(error)
      reset({
        username: data?.username ?? '',
        bio: data?.bio ?? '',
        profile_url: data?.profile_url ?? '',
        phone: data?.phone ?? '',
      })
      setLoading(false)
    })()
  }, [user, reset])

  const onSubmit = async (values: ProfileInput) => {
    if (!user) return
    const { error } = await updateProfile(user.id, {
      username: values.username,
      email: user.email!,
      bio: values.bio || undefined,
      profile_url: values.profile_url || undefined,
      phone: values.phone || undefined,
    })
    if (error) {
      console.error(error)
      toast.error('프로필 저장 실패')
    } else {
      toast.success('프로필 저장 완료')
    }
  }

  if (loading) return <div>Loading…</div>

  const url = watch('profile_url')

  return (
    <section className="page" aria-labelledby="profile-heading">
      <h2 id="profile-heading">Profile</h2>

      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="field">
          <label htmlFor="username">사용자이름</label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            {...register('username')}
            aria-invalid={!!errors.username}
          />
          {errors.username && <p role="alert">{errors.username.message}</p>}
        </div>

        <div className="field">
          <label htmlFor="profile_url">프로필 URL</label>
          <input
            id="profile_url"
            type="url"
            autoComplete="url"
            {...register('profile_url')}
            aria-invalid={!!errors.profile_url}
          />
          {errors.profile_url && (
            <p role="alert">{errors.profile_url.message}</p>
          )}
          {url ? (
            <img
              src={url}
              alt="미리보기"
              style={{
                width: 96,
                height: 96,
                borderRadius: 12,
                marginTop: 8,
                objectFit: 'cover',
                border: '1px solid #e2e8f0',
              }}
            />
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="phone">전화번호</label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            {...register('phone')}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p role="alert">{errors.phone.message}</p>}
        </div>

        <div className="field">
          <label htmlFor="bio">소개</label>
          <textarea
            id="bio"
            rows={4}
            {...register('bio')}
            aria-invalid={!!errors.bio}
          />
          {errors.bio && <p role="alert">{errors.bio.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '저장 중…' : '저장'}
        </button>
      </form>
    </section>
  )
}
