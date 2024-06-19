'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { CompanyRegistrationSchemaType } from '@/schema/company-registration'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import MaterialSymbolIcon from '../material-symbol-icon'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import imageUrl from '../../../../public/images/king.jpg'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { getShortendName } from '@/functions'
import { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

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

  useEffect(() => {
    if (companyProfileDropzone.acceptedFiles.length) {
      const reader = new FileReader()
      reader.readAsDataURL(companyProfileDropzone.acceptedFiles[0])
      reader.onloadend = () => {
        form.setValue('image', reader.result as string)
      }
    }
  }, [companyProfileDropzone.acceptedFiles])
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
            <FormItem className='flex justify-center items-center'>
              <FormControl>
                <>
                  <input
                    id='avatar'
                    type='file'
                    hidden
                    {...companyProfileDropzone.getInputProps()}
                  />

                  <div className='h-[120px] w-[120px] rounded-full bg-darkAccent relative'>
                    <Avatar className='w-full h-full border-2 box-content'>
                      <AvatarImage
                        src={field.value || imageUrl.src}
                        className='object-cover'
                      />
                      <AvatarFallback>
                        {getShortendName('John Doe')}
                      </AvatarFallback>
                    </Avatar>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className='h-6 w-6 flex justify-center items-center bg-lightAccent/60 text-primary 
              rounded-lg absolute top-[85px] right-1 cursor-pointer'
                            {...companyProfileDropzone.getRootProps()}
                          >
                            <MaterialSymbolIcon className='text-base opacity-100'>
                              edit
                            </MaterialSymbolIcon>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side='right'>
                          <div>
                            <p>Upload Avatar</p>

                            <p>512 x 512</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='company_legal_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Legal Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Company Legal Name' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='company_short_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Short Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Company Short Name' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='functional_area'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Functional Area</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent></SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='company_size'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Size</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent></SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Location' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name='website'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Website</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Company Website' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>About Company</FormLabel>
              <FormControl>
                <Textarea {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-24 mx-auto'>
          Submit
        </Button>
      </form>
    </Form>
  )
}
