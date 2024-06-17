import * as z from 'zod'

export const loginEmailSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email')
})

export type LoginEmailSchemaType = z.infer<typeof loginEmailSchema>
