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
import { SignInSchemaType, signInSchema } from '@/schema/sign-in'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

export default function SignInForm () {
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema)
  })
  const handleFormSubmit = async (data: SignInSchemaType) => {}
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className='flex flex-col justify-start items-stretch gap-2 w-full'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='text-left'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' {...field} placeholder='Email' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='text-left'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' {...field} placeholder='Password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className=''>Sign In</Button>
        <div className='text-center'>
          <Link href={'/forgot-password'} className='text-sm text-primary'>
            Forgot Password?
          </Link>
        </div>
      </form>
    </Form>
  )
}
