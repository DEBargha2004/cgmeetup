import * as z from 'zod'

export const usernameSchema = z.object({
  username: z.string({ required_error: 'Username is required' })
})

export type UsernameSchemaType = z.infer<typeof usernameSchema>
