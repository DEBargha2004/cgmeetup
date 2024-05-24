'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import landing_image from '../../public/images/landing-page.png'
import { useForm } from 'react-hook-form'
import { SignInSchemaType, signInSchema } from '@/schema/sign-in'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

export default function Home () {
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema)
  })
  const handleFormSubmit = async (data: SignInSchemaType) => {}
  return (
    <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[700px]'>
      <div className='flex items-center justify-center col-span-2 mb-10'>
        <h1 className='text-2xl md:text-[40px] lg:text-[48px] font-bold text-center mt-10 w-2/3 md:w-1/2 leading-tight'>
          Welcome to the Professional Artist's Community
        </h1>
      </div>
      <div className='hidden lg:flex lg:justify-end items-start'>
        <div className='h-[90%] flex justify-end'>
          <Image
            src={landing_image}
            alt='Image'
            width='1920'
            height='1080'
            className='min-w-[350px] w-[50%] object-contain'
          />
        </div>
      </div>
      <div className='flex items-start justify-center lg:justify-start py-12'>
        <div className='lg:mx-20 grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-semibold'>Signin</h1>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className='space-y-3'
            >
              <FormField
                control={form.control}
                name='id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email/Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full rounded'>
                Signin
              </Button>
            </form>
          </Form>
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link href='/sign-up' className='underline text-primary'>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
