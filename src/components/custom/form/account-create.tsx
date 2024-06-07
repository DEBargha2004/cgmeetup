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

export default function AccountCreateForm ({
  className,
  coverImage,
  buttonLabel
}: {
  className?: string
  coverImage?: HTMLProps<HTMLDivElement>
  buttonLabel?: string
}) {
  const [imageUrl, setImageUrl] = useState('')
  const [backgroundImageInfo, setBackgroundImageInfo] = useState({
    src: '',
    width: 0,
    height: 0
  })
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

  const profileImage = useDropzone({
    maxFiles: 1,
    multiple: false
  })

  const backgroundImage = useDropzone({
    maxFiles: 1,
    multiple: false
  })

  useEffect(() => {
    const reader = new FileReader()
    const file = profileImage.acceptedFiles[0]

    if (file) {
      reader.readAsDataURL(file)

      reader.onloadend = () => {
        setImageUrl(reader.result as string)
      }
    }
  }, [profileImage.acceptedFiles])

  useEffect(() => {
    const reader = new FileReader()
    const file = backgroundImage.acceptedFiles[0]
    console.log(file)
    if (file) {
      reader.readAsDataURL(file)
      const img = new Image()
      img.src = URL.createObjectURL(file)
      reader.onloadend = () => {
        setBackgroundImageInfo({
          src: reader.result as string,
          width: img.width,
          height: img.height
        })
      }
    }
  }, [backgroundImage.acceptedFiles])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className={cn(
          'flex flex-col justify-start items-stretch gap-4 w-full',
          className
        )}
      >
        <section className='relative mb-10 w-full'>
          <input type='file' hidden {...backgroundImage.getInputProps()} />
          <div
            className={cn(
              'w-full h-[150px] rounded-sm border border-lightAccent relative overflow-hidden group'
            )}
          >
            <NextImage
              src={
                backgroundImageInfo.src ||
                'https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098'
              }
              alt='back-cover'
              width={400}
              height={40}
              className='w-full h-full object-cover'
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className='h-6 w-6 flex justify-center items-center bg-lightAccent/60 text-primary 
              rounded-full absolute top-2 right-2  cursor-pointer '
                    {...backgroundImage.getRootProps()}
                  >
                    <MaterialSymbolIcon className='text-base opacity-100'>
                      edit
                    </MaterialSymbolIcon>
                  </div>
                </TooltipTrigger>
                <TooltipContent side='right'>
                  <div>
                    <p>Upload Cover Image</p>
                    <p>1920 x 640</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className='flex justify-center items-center absolute left-1/2 -translate-x-1/2 -bottom-[40px]'>
            <input
              id='avatar'
              type='file'
              hidden
              {...profileImage.getInputProps()}
            />

            <div className='h-[120px] w-[120px] rounded-full bg-darkAccent relative'>
              <Avatar className='w-full h-full border-2 box-content'>
                <AvatarImage
                  src={imageUrl || avatar.src}
                  className='object-cover'
                />
                <AvatarFallback>{getShortendName('John Doe')}</AvatarFallback>
              </Avatar>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className='h-6 w-6 flex justify-center items-center bg-lightAccent/60 text-primary 
              rounded-lg absolute top-[85px] right-1 cursor-pointer'
                      {...profileImage.getRootProps()}
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
          </div>
        </section>
        <section
          className={cn(
            'w-1/2 mx-auto flex flex-col justify-start items-stretch gap-4'
          )}
        >
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
        </section>
      </form>
    </Form>
  )
}
