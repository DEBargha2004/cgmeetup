'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { PhoneInput } from '@/components/ui/phone-input'
import { cn } from '@/lib/utils'
import {
  PhoneNumberSchemaType,
  phoneNumberSchema
} from '@/schema/phone-number-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function PhoneNumberForm ({
  form,
  onSubmit,
  submitLabel,
  className
}: {
  form: ReturnType<typeof useForm<PhoneNumberSchemaType>>
  onSubmit: (data: PhoneNumberSchemaType) => void
  submitLabel?: string
  className?: string
}) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          'flex flex-col justify-start items-stretch gap-4',
          className
        )}
      >
        <FormField
          control={form.control}
          name='phoneNumber'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PhoneInput
                  value={field.value}
                  onChange={field.onChange}
                  international
                  defaultCountry='IN'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className='w-24 mx-auto mt-3'
          type='submit'
          disabled={form.formState.isSubmitting}
        >
          {submitLabel || 'Send OTP'}
        </Button>
      </form>
    </Form>
  )
}
