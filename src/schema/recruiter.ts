import * as z from 'zod'

export const recruiterSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  role: z.string({ required_error: 'Role is required' }),
  status: z.string({ required_error: 'Status is required' })
})

export type RecruiterSchemaType = z.infer<typeof recruiterSchema>
