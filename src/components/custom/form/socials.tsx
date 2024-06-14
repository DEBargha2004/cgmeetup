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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { SocialsSchemaType, socialsSchema } from '@/schema/socials'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { socials } from '@/constants/socials'

export default function SocialsForm ({
  form,
  onSubmit,
  submitLabel
}: {
  onSubmit: (data: SocialsSchemaType) => void
  form: ReturnType<typeof useForm<SocialsSchemaType>>
  submitLabel?: string
}) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex justify-start items-center w-full gap-2'
      >
        <FormField
          control={form.control}
          name='label'
          render={({ field }) => (
            <FormItem className='w-1/5'>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className='max-h-[300px]'>
                      {socials.map(s => (
                        <SelectItem value={s.label} key={s.label}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='url'
          render={({ field }) => (
            <FormItem className='w-4/5'>
              <FormControl>
                <Input {...field} placeholder='username' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='h-9'>
          {submitLabel || 'Save'}
        </Button>
      </form>
    </Form>
  )
}
