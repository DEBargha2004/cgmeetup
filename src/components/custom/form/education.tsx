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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { EducationSchemaType, educationSchema } from '@/schema/education'
import { FieldType } from '@/types/field-type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import DatePicker from '../date-picker'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

const education_levels: FieldType[] = [
  { label: 'High School', value: 'high_school' },
  { label: 'Associate Degree', value: 'associate_degree' },
  { label: 'Bachelor Degree', value: 'bachelor_degree' },
  { label: 'Master Degree', value: 'master_degree' },
  { label: 'Doctorate Degree', value: 'doctorate_degree' }
]

export default function EducationForm ({
  form,
  submitLabel,
  onSubmit
}: {
  submitLabel?: string
  onSubmit?: (data: EducationSchemaType) => void
  form: ReturnType<typeof useForm<EducationSchemaType>>
}) {
  const handleFormSubmit = async (data: EducationSchemaType) => {}
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit || handleFormSubmit)}
        className='space-y-4'
      >
        <FormField
          control={form.control}
          name='education_level'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Education Level and Degree</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder='e.g. Post-Graduation - M.Tech' />
                  </SelectTrigger>
                  <SelectContent>
                    {education_levels.map(education_level => (
                      <SelectItem
                        key={education_level.value}
                        value={education_level.label}
                      >
                        {education_level.label}
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
          name='course'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <FormControl>
                <Input {...field} placeholder='e.g. Bachelor of Science' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='online'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex justify-start items-center gap-2'>
                  <Checkbox checked={field.value} onChange={field.onChange} />
                  <span className=''>Online</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='institution'
          render={({ field }) => (
            <FormItem>
              <FormLabel>School & Institute Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='e.g. University of Massachusetts'
                />
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
        </div>
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='e.g. Description of education'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='pt-3 flex justify-center'>
          <Button className='w-24' type='submit' variant={'success'}>
            {submitLabel || 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
