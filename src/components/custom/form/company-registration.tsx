'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { CompanyRegistrationSchemaType } from '@/schema/company-registration'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'

export default function CompanyRegistrationForm ({
  form,
  onSubmit,
  submitLabel
}: {
  submitLabel?: string
  onSubmit?: (data: CompanyRegistrationSchemaType) => void
  form: ReturnType<typeof useForm<CompanyRegistrationSchemaType>>
}) {
  const defaultSubmit = async (data: CompanyRegistrationSchemaType) => {}

  const companyProfileDropzone = useDropzone({
    multiple: false
  })
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit || defaultSubmit)}
        className='flex flex-col justify-start items-stretch gap-4'
      >
        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className=''></div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
