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
import { PasswordSchemaType, passwordSchema } from '@/schema/password'
import { zodResolver } from '@hookform/resolvers/zod'
import { HTMLProps, useState } from 'react'
import { useForm } from 'react-hook-form'
import MaterialSymbolIcon from '../material-symbol-icon'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  VisibilityOff,
  Visibility as VisibilityIcon
} from '@mui/icons-material'

export default function PasswordForm () {
  const form = useForm<PasswordSchemaType>({
    resolver: zodResolver(passwordSchema)
  })

  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false
  })

  const handleFormSubmit = async (data: PasswordSchemaType) => {}

  return (
    <Form {...form}>
      <form
        className='w-full flex flex-col justify-start items-stretch gap-4'
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel></FormLabel> */}
              <FormControl>
                <div className='relative'>
                  <Input
                    placeholder='Password'
                    type={visibility.password ? 'text' : 'password'}
                    {...field}
                    className='pr-8'
                  />
                  <Visibility
                    visibility={visibility.password}
                    onClick={() =>
                      setVisibility(prev => ({
                        ...prev,
                        password: !prev.password
                      }))
                    }
                    className='absolute right-2 top-1/2 -translate-y-1/2'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel></FormLabel> */}
              <FormControl>
                <div className='relative'>
                  <Input
                    placeholder='Confirm Password'
                    type={visibility.confirmPassword ? 'text' : 'password'}
                    {...field}
                    className='pr-8'
                  />
                  <Visibility
                    visibility={visibility.confirmPassword}
                    onClick={() =>
                      setVisibility(prev => ({
                        ...prev,
                        confirmPassword: !prev.confirmPassword
                      }))
                    }
                    className='absolute right-2 top-1/2 -translate-y-1/2'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='h-9 rounded-sm w-24 mx-auto mt-3'>
          Next
        </Button>
      </form>
    </Form>
  )
}

function Visibility ({
  visibility,
  className,
  ...props
}: { visibility: boolean } & HTMLProps<HTMLDivElement>) {
  return (
    <div {...props} className={cn('select-none cursor-pointer', className)}>
      {visibility ? <VisibilityIcon /> : <VisibilityOff />}
    </div>
  )
}
