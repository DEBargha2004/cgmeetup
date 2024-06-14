import * as z from 'zod'

export const educationSchema = z.object({
  education_level: z
    .string({ required_error: 'Education level is required' })
    .min(1, 'Education level is required'),
  course: z.string({ required_error: 'Course is required' }),
  online: z.boolean({ required_error: 'Online is required' }),
  description: z.string({}).optional(),
  institution: z.string({ required_error: 'Institution is required' }),
  from: z.string({ required_error: 'Start Date is required' }),
  to: z.string({ required_error: 'End Date is required' })
})

export type EducationSchemaType = z.infer<typeof educationSchema>
