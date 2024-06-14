import * as z from 'zod'

export const socialsSchema = z.object({
  label: z.string({}),
  url: z.string({ required_error: 'Url is required' })
})

export type SocialsSchemaType = z.infer<typeof socialsSchema>
