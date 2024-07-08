'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
import {
  SignInWithOtpSchemaType,
  SignInWithPasswordSchemaType
} from '@/schema/sign-in'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import MaterialSymbolIcon from '../material-symbol-icon'
import { Button } from '@/components/ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@/components/ui/input-otp'

export default function SignInWithOtpForm ({
  form,
  onSubmit,
  submitLabel,
  formToggler
}: {
  form: ReturnType<typeof useForm<SignInWithOtpSchemaType>>
  onSubmit: (data: SignInWithOtpSchemaType) => void
  submitLabel?: string
  formToggler?: () => void
}) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col justify-start items-stretch gap-4 w-full'
      >
        <FormField
          control={form.control}
          name='id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <PhoneInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='otp'
          render={({ field }) => (
            <FormItem>
              <FormLabel>OTP</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup className='w-full grid grid-cols-6 gap-2'>
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
        <div className='flex flex-col items-center justify-start gap-1'>
          <p className=''>OR</p>
          <p className='text-primary cursor-pointer' onClick={formToggler}>
            Login with Password
          </p>
        </div>
        <Button
          className='min-w-24 mx-auto'
          type='submit'
          disabled={form.formState.isSubmitting}
        >
          {submitLabel || 'Sign In'}
        </Button>
      </form>
    </Form>
  )
}
