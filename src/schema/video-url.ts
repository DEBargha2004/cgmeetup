import * as z from 'zod'

export const videoUrlSchema = z.object({
  url: z.string({ required_error: 'Url is required' }).refine(
    url => {
      console.log(url)
      return (
        url.startsWith('https://www.youtube.com/watch?v=') ||
        url.startsWith('https://youtu.be/')
      )
    },
    { message: 'Invalid url' }
  )
})

export type VideoUrlSchemaType = z.infer<typeof videoUrlSchema>
