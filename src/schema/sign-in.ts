import * as z from 'zod'

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email'),
  password: z.string({ required_error: 'Password is required' })
})

export type SignInSchemaType = z.infer<typeof signInSchema>
