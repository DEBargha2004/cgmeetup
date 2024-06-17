import * as z from 'zod'

export const browsingExperienceSchema = z.object({
  show_mature_content: z.boolean().optional()
})

export type BrowsingExperienceSchemaType = z.infer<
  typeof browsingExperienceSchema
>
