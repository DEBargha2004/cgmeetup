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
import { SignInWithPasswordSchemaType } from '@/schema/sign-in'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import MaterialSymbolIcon from '../material-symbol-icon'
import { Button } from '@/components/ui/button'

export default function SignInWithPassForm ({
  form,
  onSubmit,
  submitLabel,
  formToggler
}: {
  form: ReturnType<typeof useForm<SignInWithPasswordSchemaType>>
  onSubmit: (data: SignInWithPasswordSchemaType) => void
  submitLabel?: string
  formToggler?: () => void
}) {
  const [showPassword, setShowPassword] = useState(false)
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
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    {...field}
                    className='pr-10'
                  />
                  <div
                    className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    <MaterialSymbolIcon className='opacity-50'>
                      {showPassword ? 'visibility' : 'visibility_off'}
                    </MaterialSymbolIcon>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col items-center justify-start gap-1'>
          <p className=''>OR</p>
          <p className='text-primary cursor-pointer' onClick={formToggler}>
            Login with OTP
          </p>
        </div>
        <Button
          className='min-w-24 mx-auto h-8'
          type='submit'
          disabled={form.formState.isSubmitting}
        >
          {submitLabel || 'Sign In'}
        </Button>
      </form>
    </Form>
  )
}
