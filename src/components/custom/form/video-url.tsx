'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { VideoUrlSchemaType } from '@/schema/video-url'
import { useForm } from 'react-hook-form'

export default function VideoUrlForm ({
  form,
  onSubmit,
  submitLabel
}: {
  form: ReturnType<typeof useForm<VideoUrlSchemaType>>
  onSubmit: (data: VideoUrlSchemaType) => void
  submitLabel?: string
}) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-[calc(100%-64px)]'
      >
        <FormField
          control={form.control}
          name='url'
          render={({ field }) => (
            <FormItem className=''>
              <FormControl>
                <div className='flex items-center'>
                  <Input
                    placeholder='Paste Youtube and Vimeo Url'
                    className='rounded-r-none '
                    {...field}
                  />
                  <Button className='h-10 rounded-l-none' variant={'success'}>
                    {submitLabel || 'Add'}
                  </Button>
                </div>
              </FormControl>
              <FormMessage className='block' />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
