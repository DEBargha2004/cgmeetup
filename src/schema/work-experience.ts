import * as z from 'zod'

export const workExperienceSchema = z.object({
  title: z.string({ required_error: 'Title is required' }),
  company_name: z.string({ required_error: 'Company name is required' }),
  industry: z.string({ required_error: 'Industry is required' }),
  from: z.string({ required_error: 'Start Date is required' }),
  to: z.string({ required_error: 'End Date is required' }),
  category: z.string({ required_error: 'Category is required' }),
  sub_category: z.string({ required_error: 'Subcategory is required' }),
  department: z.string({ required_error: 'Department is required' }),
  is_intern: z.boolean({ required_error: 'Is Intern is required' })
})

export type WorkExperienceSchemaType = z.infer<typeof workExperienceSchema>
