import * as z from 'zod'

export const emailDigestsSchema = z.object({
  options: z.string({}).optional()
})

export const notificationsSchema = z.object({
  enable: z.boolean({}).optional()
})

export type NotificationsSchemaType = z.infer<typeof notificationsSchema>
export type EmailDigestsSchemaType = z.infer<typeof emailDigestsSchema>
