import * as z from 'zod'

export const productionExperienceSchema = z.object({
  image: z.string({ required_error: 'Image is required' }),
  title: z.string({ required_error: 'Title is required' }),
  release_year: z.string({ required_error: 'Release Year is required' }),
  type: z.string({ required_error: 'Production Type is required' }),
  role: z.string({ required_error: 'Role is required' }),
  company: z.string({ required_error: 'Cpmpany Name is required' })
})

export type ProductionExperienceSchemaType = z.infer<
  typeof productionExperienceSchema
>
