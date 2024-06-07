'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { PhoneInput } from '@/components/ui/phone-input'
import {
  PhoneNumberSchemaType,
  phoneNumberSchema
} from '@/schema/phone-number-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function PhoneNumberForm () {
  const form = useForm<PhoneNumberSchemaType>({
    resolver: zodResolver(phoneNumberSchema)
  })

  const handleSubmit = async (data: PhoneNumberSchemaType) => {}
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='flex flex-col justify-start items-stretch gap-4'
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
            </FormItem>
          )}
        />
        <Button className='w-24 mx-auto mt-3'>Send OTP</Button>
      </form>
    </Form>
  )
}
