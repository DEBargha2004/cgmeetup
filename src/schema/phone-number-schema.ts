import * as z from 'zod'

export const phoneNumberSchema = z.object({
  phoneNumber: z.string({ required_error: 'Phone number is required' })
})

export type PhoneNumberSchemaType = z.infer<typeof phoneNumberSchema>
