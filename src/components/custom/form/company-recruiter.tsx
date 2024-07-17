'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { getShortendName } from '@/functions'
import { RecruiterSchemaType } from '@/schema/recruiter'
import { useClickAway } from '@uidotdev/usehooks'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const roles = ['Recruiter', 'Editor', 'Admin']
const status = ['Pending', 'Approved']

export default function CompanyRecruiterForm ({
  form,
  onSubmit,
  submitLabel
}: {
  form: ReturnType<typeof useForm<RecruiterSchemaType>>
  onSubmit: (data: RecruiterSchemaType) => void
  submitLabel?: string
}) {
  const [showDropdown, setShowDropdown] = useState(false)

  const dropdownRef = useClickAway(() => setShowDropdown(false))
  return (
    <Form {...form}>
      <form
        className='flex flex-col justify-start gap-4 items-stretch'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <div
                  className='relative'
                  onFocus={() => setShowDropdown(true)}
                  //   onBlur={() => setShowDropdown(false)}
                  // @ts-ignore
                  ref={dropdownRef}
                >
                  <Input
                    // {...field}
                    {...field}
                    placeholder='@username'
                    autoComplete='off'
                  />
                  {showDropdown && (
                    <div
                      className='absolute w-full h-fit max-h-[200px] left-0 top-full 
                  translate-y-2 bg-darkAccent overflow-y-auto scroller z-30 rounded
                  space-y-1 p-1'
                    >
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className='w-full h-1/2 cursor-pointer rounded px-4 py-2
                      hover:bg-lightAccent transition-all text-sm flex justify-start gap-2 items-center'
                          onClick={() => {
                            field.onChange('Samuel')
                            setShowDropdown(false)
                          }}
                        >
                          <Avatar className='w-8 h-8'>
                            <AvatarImage src='https://cdna.artstation.com/p/users/avatars/000/078/930/large/99d98b9db85095a32a74190b5b4be7d1.jpg?1669152204' />
                            <AvatarFallback>
                              {getShortendName('John Doe')}
                            </AvatarFallback>
                          </Avatar>
                          {'Samuel'}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='role'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem value={role} key={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {status.map(role => (
                      <SelectItem value={role} key={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className='min-w-24 mx-auto'
          type='submit'
          disabled={form.formState.isSubmitting}
        >
          {submitLabel || 'Save'}
        </Button>
      </form>
    </Form>
  )
}
