import * as z from 'zod'

export const signInSchema = z.object({
  id: z.string({ required_error: 'Email is required' }),
  password: z.string({ required_error: 'Password is required' })
})

export type SignInSchemaType = z.infer<typeof signInSchema>
