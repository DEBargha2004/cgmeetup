import * as z from 'zod'

export const bioSchema = z.object({
  bio: z.string({ required_error: 'Bio is required' })
})

export type BioSchemaType = z.infer<typeof bioSchema>
