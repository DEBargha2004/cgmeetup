import * as z from 'zod'

export const otpSchema = z.object({
  otp: z
    .string({ required_error: 'OTP is required' })
    .min(4, 'Invalid OTP')
    .max(4, 'Invalid OTP')
})

export type OtpSchemaType = z.infer<typeof otpSchema>
