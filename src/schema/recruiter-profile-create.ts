import * as z from 'zod'

export const recruiterProfileCreateSchema = z.object({
  first_name: z.string({ required_error: 'First name is required' }),
  last_name: z.string({ required_error: 'Last name is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email'),
  address: z.string({ required_error: 'Address is required' }),
  dob: z.string({ required_error: 'Date of birth is required' }),
  gender: z.string({ required_error: 'Gender is required' }),
  job_position: z.string({ required_error: 'Job Position is required' }),
  profession_type: z.string({ required_error: 'Profession Type is required' }),
  other_info: z.string({ required_error: 'Other Info is required' })
})

export type RecruiterProfileCreateSchemaType = z.infer<
  typeof recruiterProfileCreateSchema
>
