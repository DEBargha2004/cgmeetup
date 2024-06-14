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
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ProductionExperienceSchemaType } from '@/schema/production'
import Image from 'next/image'
import { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'

const productionTypes: string[] = [
  'Movie',
  'TV Show',
  'Music Video',
  'Video Game',
  'TV Production',
  'Board & Card Games'
]

export default function ProductionsForm ({
  form,
  onSubmit,
  submitLabel
}: {
  submitLabel?: string
  form: ReturnType<typeof useForm<ProductionExperienceSchemaType>>
  onSubmit: (data: ProductionExperienceSchemaType) => void
}) {
  const productionImageDropzone = useDropzone({ multiple: false })

  useEffect(() => {
    if (productionImageDropzone.acceptedFiles.length) {
      const reader = new FileReader()

      reader.readAsDataURL(productionImageDropzone.acceptedFiles[0])

      reader.onloadend = () => {
        form.setValue('image', reader.result as string)
      }
    }
  }, [productionImageDropzone.acceptedFiles])
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col justify-start gap-4 items-stretch'
      >
        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Art</FormLabel>
              <FormControl>
                <div
                  {...productionImageDropzone.getRootProps()}
                  className='w-1/2 aspect-square border border-dashed rounded-lg mx-auto bg-lightAccent cursor-pointer'
                >
                  <input
                    type='file'
                    accept='image/*'
                    hidden
                    {...productionImageDropzone.getInputProps()}
                  />
                  {field.value && (
                    <Image
                      src={field.value}
                      alt='cover art'
                      height={300}
                      width={300}
                      className='h-full w-full object-cover'
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Production Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Title of the movie,gave' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='release_year'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Release Year</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Year' />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(
                      { length: new Date().getFullYear() - 1960 + 6 },
                      (_, i) => i + 1960
                    )
                      .map(year => (
                        <SelectItem value={year.toString()} key={year}>
                          {year}
                        </SelectItem>
                      ))
                      .toReversed()}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Production Types</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select an option' />
                  </SelectTrigger>
                  <SelectContent>
                    {productionTypes
                      .map(year => (
                        <SelectItem value={year.toString()} key={year}>
                          {year}
                        </SelectItem>
                      ))
                      .toReversed()}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='role'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Role</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='E.g. Concept Artist, Digital Matte Painter'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='company'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input {...field} placeholder='The company you worked for' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-24 mx-auto' variant={'success'}>
          {submitLabel || 'Save'}
        </Button>
      </form>
    </Form>
  )
}
