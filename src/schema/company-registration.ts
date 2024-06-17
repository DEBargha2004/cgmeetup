import * as z from 'zod'

export const companyRegistrationSchema = z.object({
  image: z.string({ required_error: 'Image is required' }),
  company_legal_name: z.string({
    required_error: 'Company Legal Name is required'
  }),
  company_short_name: z.string({
    required_error: 'Company Short Name is required'
  }),
  functional_area: z.string({ required_error: 'Functional Area is required' }),
  company_size: z.string({ required_error: 'Company Size is required' }),
  location: z.string({ required_error: 'Location is required' }),
  website: z.string({ required_error: 'Website is required' }),
  description: z.string({ required_error: 'Description is required' })
})

export type CompanyRegistrationSchemaType = z.infer<
  typeof companyRegistrationSchema
>
