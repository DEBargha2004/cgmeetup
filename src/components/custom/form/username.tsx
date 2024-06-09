'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UsernameSchemaType, usernameSchema } from '@/schema/username'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import MaterialSymbolIcon from '../material-symbol-icon'

export default function UsernameForm ({
  submitLabel
}: {
  submitLabel?: string
}) {
  const form = useForm<UsernameSchemaType>({
    resolver: zodResolver(usernameSchema)
  })

  const handleSubmit = async (data: UsernameSchemaType) => {}
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='flex flex-col justify-start gap-4 items-stretch'
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div className='flex justify-start items-center gap-2'>
                  <MaterialSymbolIcon>alternate_email</MaterialSymbolIcon>
                  <Input {...field} placeholder='Username' />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='ml-auto h-9'>{submitLabel || 'Save'}</Button>
      </form>
    </Form>
  )
}
