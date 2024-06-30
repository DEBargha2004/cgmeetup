'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import avatar from '../../../../public/images/profile-1.jpg'
import MaterialSymbolIcon from '../material-symbol-icon'
import { Input } from '@/components/ui/input'
import { categories } from '@/constants/job-categories'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { PhoneInput } from '@/components/ui/phone-input'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@/components/ui/input-otp'
import { Button } from '@/components/ui/button'

const userType = ['Artist', 'Bussiness']

export default function AccountCreateForm2 ({}: {}) {
  const [profileSrc, setProfileSrc] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm({
    defaultValues: {
      account_type: userType[0],
      category: '',
      otp: '',
      phoneNumber: '',
      email: '',
      password: '',
      subcategory: ''
    }
  })
  const profileDropZone = useDropzone()

  const selectedCategory = form.watch('category')

  const subCategories = useMemo(() => {
    return (
      categories.find(cat => cat.label === selectedCategory)?.sub_category || []
    )
  }, [selectedCategory])

  useEffect(() => {
    const reader = new FileReader()
    const file = profileDropZone.acceptedFiles[0]
    if (file) {
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setProfileSrc(reader.result as string)
      }
    }
  }, [profileDropZone.acceptedFiles])
  return (
    <Form {...form}>
      <form className='flex flex-col justify-start items-stretch gap-1'>
        <div className='flex justify-start items-center gap-2'>
          <div>
            <FormField
              name=''
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
              name=''
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
          </div>
          <div className='relative w-fit h-fit mx-auto shrink-0'>
            <input type='file' hidden {...profileDropZone.getInputProps()} />
            <Image
              src={profileSrc || avatar}
              height={120}
              width={120}
              alt='avatar'
              className='rounded-full h-[100px] w-[100px] sm:h-[120px] sm:w-[120px] object-cover'
            />
            <div
              className='h-8 w-8 rounded-full bg-darkAccent/50 absolute bottom-0 right-0 
            flex justify-center items-center cursor-pointer'
              {...profileDropZone.getRootProps()}
            >
              <MaterialSymbolIcon className='opacity-100 text-base text-primary'>
                edit
              </MaterialSymbolIcon>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <FormField
            name=''
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
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Password'
                      {...field}
                      className='pr-10'
                    />
                    <div
                      className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'
                      onClick={() => setShowPassword(prev => !prev)}
                    >
                      <MaterialSymbolIcon>
                        {showPassword ? 'visibility' : 'visibility_off'}
                      </MaterialSymbolIcon>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name=''
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

        <div className='space-y-1'>
          <FormLabel>Job Position</FormLabel>
          <div className='grid grid-cols-2 gap-2'>
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder='Industry' />
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
                <FormItem className=''>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={!subCategories.length}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Position' />
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
        </div>

        <FormField
          control={form.control}
          name='account_type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Type</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {userType.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
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
          name='phoneNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <PhoneInput
                  value={field.value}
                  onChange={field.onChange}
                  international
                  defaultCountry='IN'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='otp'
          render={({ field }) => (
            <FormItem className=''>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup className='grid grid-cols-6 w-full gap-2 sm:gap-4'>
                    <InputOTPSlot index={0} className='w-full aspect-square' />
                    <InputOTPSlot index={1} className='w-full aspect-square' />
                    <InputOTPSlot index={2} className='w-full aspect-square' />
                    <InputOTPSlot index={3} className='w-full aspect-square' />
                    <InputOTPSlot index={4} className='w-full aspect-square' />
                    <InputOTPSlot index={5} className='w-full aspect-square' />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='mt-4 w-fit min-w-24 mx-auto'>Send OTP</Button>
      </form>
    </Form>
  )
}
