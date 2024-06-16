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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { categories } from '@/constants/job-categories'
import { job_types } from '@/constants/job-types'
import {
  ProfileJobPreferenceSchemaType,
  profileJobPreferenceSchema
} from '@/schema/profile-job-preference'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import MaterialSymbolIcon from '../material-symbol-icon'
import { currencies } from '@/constants/job-requirements'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'

export default function JobPreferenceForm ({
  onSubmit,
  form,
  submitLabel
}: {
  onSubmit?: (data: ProfileJobPreferenceSchemaType) => void
  form: ReturnType<typeof useForm<ProfileJobPreferenceSchemaType>>
  submitLabel?: string
}) {
  const selectedCategory = form.watch('category')

  const subCategories = useMemo(() => {
    return (
      categories.find(cat => cat.label === selectedCategory)?.sub_category || []
    )
  }, [selectedCategory])

  const salaryTriggerRef = useRef<HTMLDivElement>(null)
  const [salaryPopoverWidth, setSalaryPopoverWidth] = useState(0)
  const upperLimit = parseInt(form.watch('expected_salary.upper_limit') || '0')
  const lowerLimit = parseInt(form.watch('expected_salary.lower_limit') || '0')

  const upperLimits = useMemo(() => {
    return Array.from({ length: 200 }).map((_, i) => lowerLimit + i + 1)
  }, [lowerLimit])

  useEffect(() => {
    const handleResize = (e: ResizeObserverEntry[]) => {
      for (const entry of e) {
        setSalaryPopoverWidth(entry.contentBoxSize[0].inlineSize + 26)
      }
    }

    const ro = new ResizeObserver(handleResize)

    ro.observe(salaryTriggerRef.current!)

    return () => {
      ro.disconnect()
    }
  }, [])

  const defaultSubmit = async (data: ProfileJobPreferenceSchemaType) => {}
  return (
    <Form {...form}>
      <form
        className='space-y-4'
        onSubmit={form.handleSubmit(onSubmit || defaultSubmit)}
      >
        <div>
          <h1 className='text-sm m-2 font-semibold'>Job Type</h1>
          <FormField
            control={form.control}
            name='job_type'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Job Type' />
                    </SelectTrigger>
                    <SelectContent>
                      {job_types.map(type => (
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
        <div className='space-y-2'>
          <h1 className='text-sm m-2 font-semibold'>Preferred City</h1>
          <FormField
            control={form.control}
            name='preferred_city'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder='Enter Location' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='space-y-2'>
          <h1 className='text-sm m-2 font-semibold'>Expected Salary</h1>
          <FormField
            control={form.control}
            name='preferred_city'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div
                        className='w-full h-10 rounded bg-darkAccent mt-1 border px-3 py-2 
              flex justify-between items-center cursor-pointer'
                        ref={salaryTriggerRef}
                      >
                        <span className='text-sm'>
                          {form.watch('expected_salary.currency')}
                          &nbsp;
                          {lowerLimit ? `${lowerLimit} LPA -` : null}
                          &nbsp;
                          {upperLimit ? `${upperLimit} LPA` : null}
                        </span>
                        <MaterialSymbolIcon className='select-none'>
                          keyboard_arrow_down
                        </MaterialSymbolIcon>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent
                      className='bg-darkAccent  min-w-[250px]'
                      style={{ width: salaryPopoverWidth }}
                      // align='end'
                    >
                      <div className='grid grid-cols-2 gap-2'>
                        <FormField
                          control={form.control}
                          name='expected_salary.currency'
                          render={({ field }) => (
                            <FormItem className='col-span-2'>
                              <FormLabel>Currency</FormLabel>
                              <FormControl>
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {currencies.map(currency => (
                                      <SelectItem
                                        value={currency}
                                        key={currency}
                                      >
                                        {currency}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='expected_salary.lower_limit'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Lower Limit</FormLabel>
                              <FormControl>
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  disabled={
                                    !form.watch('expected_salary.currency')
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Array.from(
                                      { length: 200 },
                                      (_, i) => i
                                    ).map(i => (
                                      <SelectItem value={i.toString()} key={i}>
                                        {`${i} ${'LPA'}`}
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
                          name='expected_salary.upper_limit'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Upper Limit</FormLabel>
                              <FormControl>
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  disabled={
                                    !form.watch('expected_salary.currency')
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {upperLimits.map(i => (
                                      <SelectItem value={i.toString()} key={i}>
                                        {`${i} ${'LPA'}`}
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
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex justify-center items-center'>
          <Button className='w-24' variant={'success'}>
            {submitLabel || 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
