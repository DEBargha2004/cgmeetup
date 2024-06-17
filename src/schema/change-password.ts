import * as z from 'zod'

export const changePasswordSchema = z
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

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>
