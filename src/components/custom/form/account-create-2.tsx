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

const userType = ['Artist', 'Recruiter']

export default function AccountCreateForm2 ({}: {}) {
  const [profileSrc, setProfileSrc] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm()
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
      <form className='flex flex-col justify-start items-stretch gap-4'>
        <div className='mx-auto py-4'>
          <div className='relative'>
            <input type='file' hidden {...profileDropZone.getInputProps()} />
            <Image
              src={profileSrc || avatar}
              height={120}
              width={120}
              alt='avatar'
              className='rounded-full h-[120px] w-[120px] object-cover'
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
          name=''
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
        <FormField
          control={form.control}
          name=''
          render={({ field }) => (
            <FormItem>
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
            <FormItem className='mx-auto'>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={0}
                      className='xs:h-12 xs:w-12 h-8 w-8 '
                    />
                    <InputOTPSlot
                      index={1}
                      className='xs:h-12 xs:w-12 h-8 w-8 '
                    />
                    <InputOTPSlot
                      index={2}
                      className='xs:h-12 xs:w-12 h-8 w-8 '
                    />
                    <InputOTPSlot
                      index={3}
                      className='xs:h-12 xs:w-12 h-8 w-8 '
                    />
                    <InputOTPSlot
                      index={4}
                      className='xs:h-12 xs:w-12 h-8 w-8 '
                    />
                    <InputOTPSlot
                      index={5}
                      className='xs:h-12 xs:w-12 h-8 w-8 '
                    />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Send OTP</Button>
      </form>
    </Form>
  )
}
