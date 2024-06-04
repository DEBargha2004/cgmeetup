import * as z from 'zod'

export const profileJobPreferenceSchema = z.object({
  job_type: z.string({ required_error: 'Job type is required' }),
  category: z.string({ required_error: 'Category is required' }),
  subcategory: z.string({ required_error: 'Subcategory is required' }),
  preferred_city: z.string({ required_error: 'Preferred city is required' }),
  expected_salary: z.object({
    currency: z.string({ required_error: 'Currency is required' }),
    lower_limit: z.string({ required_error: 'Lower Limit is required' }),
    upper_limit: z.string({ required_error: 'Upper Limit is required' })
  })
})

export type ProfileJobPreferenceSchemaType = z.infer<
  typeof profileJobPreferenceSchema
>
