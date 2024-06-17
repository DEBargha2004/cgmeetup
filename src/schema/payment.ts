import * as z from 'zod'

export const paymentSchema = z.object({
  platform: z.string({ required_error: 'Platform is required' }),
  account_id: z.string({ required_error: 'Account ID is required' })
})

export type PaymentSchemaType = z.infer<typeof paymentSchema>
