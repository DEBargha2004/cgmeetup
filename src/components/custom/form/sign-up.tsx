'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { genders } from '@/constants/gender'
import { SignUpSchemaType, signUpSchema } from '@/schema/sign-up'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import DatePicker from '../date-picker'
import { experienceLevels } from '@/constants/experience-level'
import MaterialSymbolIcon from '../material-symbol-icon'

export default function SignUpForm () {
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema)
  })
  const handleFormSubmit = async (data: SignUpSchemaType) => {}
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className='flex flex-col justify-start items-stretch gap-4 w-full'
      >
        <h1 className='text-2xl font-semibold'>Sign Up</h1>
        <FormField
          control={form.control}
          name='first_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='last_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type='email' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='dob'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <DatePicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='gender'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {genders.map(gender => (
                        <SelectItem key={gender.id} value={gender.value}>
                          {gender.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='experience_level'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience Level</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {experienceLevels.map(gender => (
                        <SelectItem key={gender.id} value={gender.value}>
                          {gender.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Checkbox />
        <Button variant={'success'}>
          {' '}
          <MaterialSymbolIcon className='mr-2 opacity-100'>
            person
          </MaterialSymbolIcon>
          Sign Up
        </Button>
      </form>
    </Form>
  )
}
