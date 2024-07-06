import * as z from 'zod'

export const urlSchema = z.object({
  url: z
    .string({ required_error: 'Url is required' })
    .url({ message: 'Invalid url' })
})

export type UrlSchemaType = z.infer<typeof urlSchema>
