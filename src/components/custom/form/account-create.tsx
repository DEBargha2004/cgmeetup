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
import {
  AccountCreateSchemaType,
  accountCreateSchema
} from '@/schema/account-create'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import DatePicker from '../date-picker'
import { experienceLevels } from '@/constants/experience-level'
import MaterialSymbolIcon from '../material-symbol-icon'
import { HTMLProps, useEffect, useMemo, useState } from 'react'
import { categories } from '@/constants/job-categories'
import avatar from '../../../../public/images/king.jpg'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getShortendName } from '@/functions'
import { useDropzone } from 'react-dropzone'
import NextImage from 'next/image'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import FieldsContainer from './field-container'

export default function AccountCreateForm ({
  className,
  coverImage,
  buttonLabel
}: {
  className?: string
  coverImage?: HTMLProps<HTMLDivElement>
  buttonLabel?: string
}) {
  const form = useForm<AccountCreateSchemaType>({
    resolver: zodResolver(accountCreateSchema)
  })
  const handleFormSubmit = async (data: AccountCreateSchemaType) => {}

  const subCategories = useMemo(() => {
    return (
      categories.find(cat => cat.label === form.watch('category'))
        ?.sub_category || []
    )
  }, [form.watch('category')])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className={cn(
          'flex flex-col justify-center items-stretch gap-4 w-full px-2',
          className
        )}
      >
        <>
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
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} />
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
          <div className='space-y-2'>
            <h1 className='text-sm m-2 font-semibold'>Functional Area</h1>
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select Category' />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(type => (
                          <SelectItem key={type.value} value={type.label}>
                            {type.label}
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
              name='subcategory'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={!subCategories.length}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select Sub-Category' />
                      </SelectTrigger>
                      <SelectContent>
                        {subCategories.map(type => (
                          <SelectItem key={type.value} value={type.label}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex justify-start gap-3 items-center text-sm opacity-70'>
            <Checkbox />
            <p>I accept all the terms and conditions</p>
          </div>
          <Button variant={'success'} className='w-fit mx-auto mt-3'>
            {' '}
            {buttonLabel || 'Sign Up'}
          </Button>
        </>
      </form>
    </Form>
  )
}
