import _ from 'lodash'
import * as z from 'zod'

export const jobPostSchema = z
  .object({
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
    apply_option: z.string({ required_error: 'Apply Option is required' }),
    apply_option_info: z.string({
      required_error: 'Apply Option Info is required'
    }),
    assigned_to: z.string({ required_error: 'Assigned To is required' }),
    location: z.string({ required_error: 'Location is required' })
  })
  .refine(
    data => {
      if (data.apply_option === 'Email') {
        return z.string().email('Invalid email').parse(data.apply_option_info)
      } else if (data.apply_option_info === 'Link') {
        return z.string().url('Invalid URL').parse(data.apply_option_info)
      }
    },
    {
      message: 'Invalid Data',
      path: ['apply_option_info']
    }
  )

export type JobPostSchemaType = z.infer<typeof jobPostSchema>
