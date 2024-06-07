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
import { useEffect, useMemo, useState } from 'react'
import { categories } from '@/constants/job-categories'
import avatar from '../../../../public/images/king.jpg'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getShortendName } from '@/functions'
import { useDropzone } from 'react-dropzone'

export default function AccountCreateForm () {
  const [imageUrl, setImageUrl] = useState('')
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

  const { getInputProps, getRootProps, acceptedFiles } = useDropzone({
    maxFiles: 1,
    multiple: false
  })

  useEffect(() => {
    const reader = new FileReader()
    const file = acceptedFiles[0]

    if (file) {
      reader.readAsDataURL(file)

      reader.onloadend = () => {
        setImageUrl(reader.result as string)
      }
    }
  }, [acceptedFiles])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className='flex flex-col justify-start items-stretch gap-4 w-full'
      >
        <h1 className='text-2xl font-semibold'>Create Account</h1>
        <div className='flex justify-center items-center'>
          <input id='avatar' type='file' hidden {...getInputProps()} />

          <div
            className='h-[100px] w-[100px] rounded-full bg-darkAccent relative'
            {...getRootProps()}
          >
            <Avatar className='w-full h-full'>
              <AvatarImage
                src={imageUrl || avatar.src}
                className='object-cover'
              />
              <AvatarFallback>{getShortendName('John Doe')}</AvatarFallback>
            </Avatar>
            <div
              className='h-6 w-6 flex justify-center items-center bg-primary 
              rounded-lg absolute top-[70px] right-1'
            >
              <MaterialSymbolIcon className='text-base'>
                edit
              </MaterialSymbolIcon>
            </div>
          </div>
        </div>
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
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map(cat => (
                        <SelectItem key={cat.value} value={cat.label}>
                          {cat.label}
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
          name='subcategory'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub Category</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger disabled={!subCategories.length}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {subCategories.map(subCat => (
                        <SelectItem key={subCat.value} value={subCat.label}>
                          {subCat.label}
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
