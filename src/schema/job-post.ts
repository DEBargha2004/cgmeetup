import * as z from 'zod'

export const jobPostSchema = z.object({
  title: z.string({ required_error: 'Title is required' }),
  description: z.string({ required_error: 'Description is required' }),
  type: z.string({ required_error: 'Job Type is required' }),
  visibility: z.string({ required_error: 'Job Visibility is required' }),
  category: z.string({ required_error: 'Job Category is required' }),
  subcategory: z.string({ required_error: 'Job Subcategory is required' }),
  skills: z
    .array(z.string({ required_error: 'Skill is required' }))
    .min(1, 'Skill is required'),
  experience_level: z.string({
    required_error: 'Experience Level is required'
  }),
  education: z.string({ required_error: 'Education Level is required' }),
  salary: z.object({
    currency: z.string({ required_error: 'Currency is required' }),
    lower_limit: z.string({ required_error: 'Lower Limit is required' }),
    upper_limit: z.string({ required_error: 'Upper Limit is required' })
  }),
  mode: z.string({ required_error: 'Mode is required' })
})

export type JobPostSchemaType = z.infer<typeof jobPostSchema>
