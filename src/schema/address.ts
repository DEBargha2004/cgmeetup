import * as z from 'zod'

export const addressSchema = z.object({
  company_name: z.string({ required_error: 'Company name is required' }),
  address: z.string({ required_error: 'Address is required' }),
  email_id: z
    .string({ required_error: 'Email id is required' })
    .email('Invalid email'),
  phone_number: z.string({ required_error: 'Phone number is required' }),
  website: z.string({ required_error: 'Website is required' })
})

export type AddressSchemaType = z.infer<typeof addressSchema>
