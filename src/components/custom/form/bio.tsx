'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { BioSchemaType, bioSchema } from '@/schema/bio'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function BioForm () {
  const form = useForm<BioSchemaType>({
    resolver: zodResolver(bioSchema)
  })

  const handleFormSubmit = async (data: BioSchemaType) => {}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className='space-y-4'
      >
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='Introduce yourself with your key skills and major achievements'
                  rows={15}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          Finish
        </Button>
      </form>
    </Form>
  )
}
