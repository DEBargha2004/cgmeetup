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
  submitLabel,
  form,
  onSubmit,
  submitButton
}: {
  submitLabel?: string
  form: ReturnType<typeof useForm<UsernameSchemaType>>
  onSubmit: (data: UsernameSchemaType) => void
  submitButton?: React.ReactNode
}) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
        {submitButton || (
          <Button
            className='ml-auto h-9 w-24'
            disabled={form.formState.isSubmitting}
          >
            {submitLabel || 'Save'}
          </Button>
        )}
      </form>
    </Form>
  )
}
