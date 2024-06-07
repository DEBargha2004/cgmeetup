import * as z from 'zod'

export const passwordSchema = z
  .object({
    password: z.string({ required_error: 'Password is required' }),
    confirmPassword: z.string({
      required_error: 'Confirm Password is required'
    })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

export type PasswordSchemaType = z.infer<typeof passwordSchema>
