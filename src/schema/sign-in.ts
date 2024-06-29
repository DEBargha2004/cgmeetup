import * as z from 'zod'

export const signInSchema = z.object({
  id: z.string({ required_error: 'Email is required' }),
  password: z.string({ required_error: 'Password is required' })
})

export type SignInSchemaType = z.infer<typeof signInSchema>

export const signInWithPasswordSchema = z.object({
  id: z.string({ required_error: 'Email is required' }),
  password: z.string({ required_error: 'Password is required' })
})

export const signInWithOtpSchema = z.object({
  id: z.string({ required_error: 'Email is required' }),
  otp: z
    .string({ required_error: 'OTP is required' })
    .max(6, 'Invalid OTP')
    .min(6, 'Invalid OTP')
})

export type SignInWithOtpSchemaType = z.infer<typeof signInWithOtpSchema>
export type SignInWithPasswordSchemaType = z.infer<
  typeof signInWithPasswordSchema
>
