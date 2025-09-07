import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email('유효한 이메일을 입력하세요.'),
  password: z.string().min(8, '비밀번호는 최소 8자입니다.'),
})

export const signUpSchema = z.object({
  email: z.string().email('유효한 이메일을 입력하세요.'),
  password: z.string().min(8, '비밀번호는 최소 8자입니다.'),
  username: z.string().min(2, '사용자이름은 2자 이상').max(30, '최대 30자'),
})

export const profileSchema = z.object({
  username: z.string().min(2, '2자 이상').max(30, '최대 30자'),
  bio: z.string().max(300, '최대 300자').optional(),
  profile_url: z
    .string()
    .url('URL 형식이 아닙니다.')
    .optional()
    .or(z.literal('')),
  phone: z.string().max(30, '최대 30자').optional().or(z.literal('')),
})

export type SignInInput = z.infer<typeof signInSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
export type ProfileInput = z.infer<typeof profileSchema>
