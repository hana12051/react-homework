import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email('유효한 이메일을 입력하세요.'),
  password: z.string().min(8, '비밀번호는 최소 8자입니다.'),
})

export const signUpSchema = z.object({
  email: z.string().email('유효한 이메일을 입력하세요.'),
  password: z.string().min(8, '비밀번호는 최소 8자입니다.'),
  full_name: z
    .string()
    .min(2, '이름은 2자 이상')
    .max(50, '이름은 50자 이하')
    .optional(),
})

export type SignInInput = z.infer<typeof signInSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
