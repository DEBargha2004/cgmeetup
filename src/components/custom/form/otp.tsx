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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@/components/ui/input-otp'
import { OtpSchemaType, otpSchema } from '@/schema/otp'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function OtpForm () {
  const form = useForm<OtpSchemaType>({
    resolver: zodResolver(otpSchema)
  })
  const handleFormSubmit = async (data: OtpSchemaType) => {}
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className='flex flex-col justify-start items-stretch gap-4 w-full'
      >
        <FormField
          control={form.control}
          name='otp'
          render={({ field }) => (
            <FormItem className='flex flex-col justify-between items-center gap-2'>
              {/* <FormLabel>Verify OTP</FormLabel> */}
              <FormControl className='w-[200px]'>
                <InputOTP maxLength={6} {...field} className='w-full'>
                  <InputOTPGroup className='grid grid-cols-6 gap-2 w-full'>
                    <InputOTPSlot index={0} className='w-full aspect-square' />
                    <InputOTPSlot index={1} className='w-full aspect-square' />
                    <InputOTPSlot index={2} className='w-full aspect-square' />
                    <InputOTPSlot index={3} className='w-full aspect-square' />
                    <InputOTPSlot index={4} className='w-full aspect-square' />
                    <InputOTPSlot index={5} className='w-full aspect-square' />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-fit mx-auto mt-4'>Verify OTP</Button>
      </form>
    </Form>
  )
}
