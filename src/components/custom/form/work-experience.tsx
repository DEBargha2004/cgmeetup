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
  WorkExperienceSchemaType,
  workExperienceSchema
} from '@/schema/work-experience'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import DatePicker from '../date-picker'
import { useMemo } from 'react'
import { categories } from '@/constants/job-categories'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'

export default function WorkExperienceForm ({
  submitLabel,
  onSubmit,
  form
}: {
  submitLabel?: string
  onSubmit?: (data: WorkExperienceSchemaType) => void
  form: ReturnType<typeof useForm<WorkExperienceSchemaType>>
}) {
  const selectedCategory = form.watch('category')

  const subCategories = useMemo(() => {
    return (
      categories.find(cat => cat.label === selectedCategory)?.sub_category || []
    )
  }, [selectedCategory])

  const handleFormSubmit = async (data: WorkExperienceSchemaType) => {}
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit || handleFormSubmit)}
        className='space-y-4 w-full'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder='Title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='company_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder='e.g. Company Name' {...field} />
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
            name='sub_category'
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
        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder='e.g. Location' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='space-y-2'>
          <p className='text-sm'>Start & End Date</p>
          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='from'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='to'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex justify-start items-center gap-2'>
            <Checkbox className='mr-2' />{' '}
            <span className='text-sm'>I am Currently Working</span>
          </div>
        </div>

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='e.g. Detail about your work experience'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='is_intern'
          render={({ field }) => (
            <FormItem className='flex justify-between items-center'>
              <FormLabel>This is an internship</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className='flex justify-center pt-3'>
          <Button type='submit' className='w-24' variant={'success'}>
            {submitLabel || 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
