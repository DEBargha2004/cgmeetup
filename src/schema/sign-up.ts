import * as z from 'zod'

export const signUpSchema = z.object({
  first_name: z.string({ required_error: 'First name is required' }),
  last_name: z.string({ required_error: 'Last name is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email'),
  dob: z.string({ required_error: 'Date of birth is required' }),
  gender: z.string({ required_error: 'Gender is required' }),
  experience_level: z.string({ required_error: 'Experien level is required' }),
  accept_terms: z.boolean({ required_error: 'Accept terms is required' })
})

export type SignUpSchemaType = z.infer<typeof signUpSchema>
