'use client'

import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { MaterialSymbolIcon } from '@/components/custom'
import { Switch } from '@/components/ui/switch'
import { gallery_post_categories } from '@/constants/categories'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import Image from 'next/image'

import { FieldType } from '@/types/field-type'
import { job_types } from '@/constants/job-types'
import { categories } from '@/constants/job-categories'
import { useForm } from 'react-hook-form'
import { JobPostSchemaType, jobPostSchema } from '@/schema/job-post'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { job_skills } from '@/constants/job-skills'
import {
  currencies,
  education_levels,
  experience_levels
} from '@/constants/job-requirements'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import logo from '../../../../../public/images/company-logo.jpg'

const visibilityOptions: string[] = ['Open', 'Closed']

const addresses = [
  'Lagos, Nigeria',
  'Abuja, Nigeria',
  'Port Harcourt, Nigeria',
  'Owerri, Nigeria',
  'Ibadan, Nigeria',
  'Kano, Nigeria',
  'Kaduna, Nigeria',
  'Jos, Nigeria',
  'Ilorin, Nigeria'
]

export default function Dashboard () {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const [selectedVisibility, setSelectedVisibility] = useState<string>(
    visibilityOptions[0]
  )
  const [images, setImages] = useState<
    { id: string; url: string; type: string; caption: string }[]
  >([])
  const [thumbnail, setThumbnail] = useState<{
    id: string
    url: string
    type: string
    caption: string
    custom: boolean
  } | null>()

  const salaryTriggerRef = useRef<HTMLDivElement>(null)
  const [salaryPopoverWidth, setSalaryPopoverWidth] = useState(0)

  const form = useForm<JobPostSchemaType>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      type: job_types[0].value,
      visibility: visibilityOptions[0],
      skills: [],
      salary: {
        currency: currencies[0]
      }
    }
  })

  const handleFormSubmit = async (e: JobPostSchemaType) => {}

  const upperLimit = parseInt(form.watch('salary.upper_limit') || '0')
  const lowerLimit = parseInt(form.watch('salary.lower_limit') || '0')

  const upperLimits = useMemo(() => {
    return Array.from({ length: 200 }).map((_, i) => lowerLimit + i + 1)
  }, [lowerLimit])

  useEffect(() => {
    const handleResize = (e: ResizeObserverEntry[]) => {
      for (const entry of e) {
        setSalaryPopoverWidth(entry.contentBoxSize[0].inlineSize + 26)
      }
    }

    const ro = new ResizeObserver(handleResize)

    ro.observe(salaryTriggerRef.current!)

    return () => {
      ro.disconnect()
    }
  }, [])

  return (
    <div className='flex h-full w-full flex-col'>
      <div className='flex flex-col sm:gap-4 sm:py-4'>
        <header
          className=' flex z-40 lg:h-14 items-center gap-4 border-b px-4 sm:h-auto 
        sm:border-0 sm:bg-darkAccent sm:px-6'
        >
          <Breadcrumb className='hidden md:flex'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='#'>Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='#'>Jobs</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Create Job</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
          <div className=' grid flex-1 auto-rows-max gap-4'>
            <div className='flex items-center gap-4'>
              <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
                Create Job
              </h1>
              <Badge variant='outline' className='ml-auto sm:ml-0'>
                {visibilityOptions.find(
                  item => item === form.watch('visibility')
                )}
              </Badge>
            </div>
            <Form {...form}>
              <form
                className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8'
                onSubmit={form.handleSubmit(handleFormSubmit)}
              >
                <div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
                  <Card x-chunk='dashboard-07-chunk-0' className='bg-card'>
                    <div className='py-3 px-4 flex justify-between items-center w-full'>
                      <CardTitle className='text-xl'>
                        Post a{' '}
                        <span className='text-primary'>
                          {
                            job_types.find(
                              item => item.value === form.watch('type')
                            )?.label
                          }
                        </span>{' '}
                        Job
                      </CardTitle>

                      <FormField
                        control={form.control}
                        name='type'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel></FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className='w-[200px]'>
                                  <SelectValue
                                    className=''
                                    placeholder='Switch'
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  {job_types.map(item => (
                                    <SelectItem
                                      key={item.value}
                                      value={item.value}
                                    >
                                      {item.label}
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
                    <CardContent>
                      <div className='grid gap-6'>
                        <div className='grid gap-3'>
                          <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                  <Input
                                    id='name'
                                    type='text'
                                    className='w-full'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className='grid gap-3'>
                          <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Job Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    id='name'
                                    className='w-full min-h-32'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card x-chunk='dashboard-07-chunk-2' className='bg-card'>
                    <CardHeader className='pb-3'>
                      <CardTitle className='text-xl'>Category</CardTitle>
                    </CardHeader>
                    <CardContent className=''>
                      <div className='flex items-center justify-start gap-3'>
                        <FormField
                          control={form.control}
                          name='category'
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className=' md:w-1/2 w-full'>
                                <SelectValue placeholder='Category' />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map(category => (
                                  <SelectItem
                                    key={category.value}
                                    value={category.value}
                                  >
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='subcategory'
                          render={({ field }) => (
                            <FormItem className='md:w-1/2 w-full'>
                              {/* <FormLabel></FormLabel> */}
                              <FormControl>
                                <Select
                                  disabled={!form.watch('category')}
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger className=''>
                                    <SelectValue placeholder='Sub Category' />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {categories
                                      .find(
                                        category =>
                                          category.value ===
                                          form.watch('category')
                                      )
                                      ?.sub_category.map(subcategory => (
                                        <SelectItem
                                          value={subcategory.value}
                                          key={subcategory.value}
                                        >
                                          {subcategory.label}
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
                    </CardContent>
                  </Card>

                  <Card x-chunk='dashboard-07-chunk-2' className='bg-card'>
                    <CardHeader className='pb-3'>
                      <CardTitle className='text-xl'>Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='grid gap-3'>
                        <FormField
                          control={form.control}
                          name='skills'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel></FormLabel>
                              <FormControl>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <div
                                      className='p-2 flex justify-between items-center border rounded 
                          h-10 bg-darkAccent md:w-1/2 w-full'
                                    >
                                      <span className='text-sm'>
                                        Select Skills
                                      </span>
                                      <MaterialSymbolIcon className=''>
                                        keyboard_arrow_down
                                      </MaterialSymbolIcon>
                                    </div>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className='  p-0'>
                                    <div className='bg-lightAccent p-2 relative'>
                                      <Input className='pl-7' />
                                      <div className='absolute top-1/2 -translate-y-1/2 left-3'>
                                        <MaterialSymbolIcon>
                                          search
                                        </MaterialSymbolIcon>
                                      </div>
                                    </div>
                                    <div className='px-1 overflow-y-auto scroller h-[200px] w-[300px]'>
                                      {job_skills.map(skill => (
                                        <DropdownMenuItem
                                          key={skill.value}
                                          className={cn(
                                            'flex justify-start items-center gap-1 mb-1',
                                            field.value.includes(skill.value)
                                              ? 'bg-lightAccent'
                                              : ''
                                          )}
                                          onSelect={e => {
                                            e.preventDefault()
                                            if (
                                              field.value.includes(skill.value)
                                            ) {
                                              field.onChange(
                                                field.value.filter(
                                                  s => s !== skill.value
                                                )
                                              )
                                            } else {
                                              field.onChange([
                                                ...field.value,
                                                skill.value
                                              ])
                                            }
                                          }}
                                        >
                                          <span
                                            className={cn(
                                              field.value.includes(skill.value)
                                                ? 'opacity-100 text-primary'
                                                : 'opacity-0'
                                            )}
                                          >
                                            <MaterialSymbolIcon>
                                              check
                                            </MaterialSymbolIcon>
                                          </span>
                                          <span>{skill.label}</span>
                                        </DropdownMenuItem>
                                      ))}
                                    </div>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className='flex flex-wrap gap-2'>
                          {form.watch('skills').map(skill => (
                            <Badge
                              key={skill}
                              className='bg-lightAccent p-2 flex justify-between items-center gap-1'
                            >
                              <span>
                                {job_skills.find(s => s.value === skill)?.label}
                              </span>
                              <MaterialSymbolIcon
                                className='text-sm cursor-pointer'
                                onClick={() => {
                                  form.setValue(
                                    'skills',
                                    form
                                      .watch('skills')
                                      .filter(s => s !== skill)
                                  )
                                }}
                              >
                                close
                              </MaterialSymbolIcon>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card x-chunk='dashboard-07-chunk-1' className='bg-card'>
                    <CardHeader className='pb-3'>
                      <CardTitle className='text-xl'>
                        Job Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='grid grid-cols-3 gap-5 w-full'>
                        <FormField
                          control={form.control}
                          name='experience_level'
                          render={({ field }) => (
                            <FormItem className='w-full '>
                              <FormLabel></FormLabel>
                              <FormControl>
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder='Experience Level' />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {experience_levels.map(experience_level => (
                                      <SelectItem
                                        value={experience_level}
                                        key={experience_level}
                                      >
                                        {experience_level}
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
                          name='education'
                          render={({ field }) => (
                            <FormItem className='w-full'>
                              <FormLabel></FormLabel>
                              <FormControl>
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder='Education' />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {education_levels.map(education_level => (
                                      <SelectItem
                                        value={education_level}
                                        key={education_level}
                                      >
                                        {education_level}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Popover>
                          <PopoverTrigger asChild>
                            <div
                              className='w-full h-10 rounded bg-darkAccent mt-1 border px-3 py-2 
                            flex justify-between items-center cursor-pointer'
                              ref={salaryTriggerRef}
                            >
                              <span className='text-sm'>
                                {form.watch('salary.currency')}&nbsp;
                                {lowerLimit ? `${lowerLimit} LPA -` : null}
                                &nbsp;
                                {upperLimit ? `${upperLimit} LPA` : null}
                              </span>
                              <MaterialSymbolIcon className='select-none'>
                                keyboard_arrow_down
                              </MaterialSymbolIcon>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent
                            className='bg-darkAccent z-40 min-w-[250px]'
                            style={{ width: salaryPopoverWidth }}
                            // align='end'
                          >
                            <div className='grid grid-cols-2 gap-2'>
                              <FormField
                                control={form.control}
                                name='salary.currency'
                                render={({ field }) => (
                                  <FormItem className='col-span-2'>
                                    <FormLabel>Currency</FormLabel>
                                    <FormControl>
                                      <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                      >
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {currencies.map(currency => (
                                            <SelectItem
                                              value={currency}
                                              key={currency}
                                            >
                                              {currency}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name='salary.lower_limit'
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Lower Limit</FormLabel>
                                    <FormControl>
                                      <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                      >
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {Array.from(
                                            { length: 200 },
                                            (_, i) => i
                                          ).map(i => (
                                            <SelectItem
                                              value={i.toString()}
                                              key={i}
                                            >
                                              {`${form.watch(
                                                'salary.currency'
                                              )} ${i} ${'LPA'}`}
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
                                name='salary.upper_limit'
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Upper Limit</FormLabel>
                                    <FormControl>
                                      <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                      >
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {upperLimits.map(i => (
                                            <SelectItem
                                              value={i.toString()}
                                              key={i}
                                            >
                                              {`${form.watch(
                                                'salary.currency'
                                              )} ${i} ${'LPA'}`}
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
                          </PopoverContent>
                        </Popover>
                      </div>
                    </CardContent>
                  </Card>
                  <Card x-chunk='dashboard-07-chunk-2' className='bg-card'>
                    <CardHeader className='pb-3'>
                      <CardTitle className='text-xl'>Address</CardTitle>
                    </CardHeader>
                    <CardContent className='flex justify-between items-center gap-2'>
                      <Select>
                        <SelectTrigger className='w-1/2'>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {addresses.map((address, index) => (
                            <SelectItem value={address} key={index}>
                              {address}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        className='w-fit rounded  bg-transparent hover:bg-darkAccent/80'
                        variant={'outline'}
                        type='button'
                      >
                        <MaterialSymbolIcon className='mr-2 text-primary'>
                          edit
                        </MaterialSymbolIcon>
                        Edit Address Here
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                <div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
                  <Card
                    x-chunk='dashboard-07-chunk-3'
                    className='xl:w-[60%] lg:w-4/5 bg-card'
                  >
                    <CardHeader className='pb-3'>
                      <CardTitle className='text-xl'>Post Options</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='grid gap-3'>
                        <Select
                          value={selectedVisibility}
                          onValueChange={setSelectedVisibility}
                        >
                          <SelectTrigger id='status' aria-label='Select status'>
                            <SelectValue placeholder='Select status' />
                          </SelectTrigger>
                          <SelectContent>
                            {visibilityOptions.map((item, index) => (
                              <SelectItem
                                key={index}
                                value={item}
                                className='cursor-pointer hover:bg-darkAccent/80'
                              >
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button variant={'success'}>
                          <MaterialSymbolIcon className='mr-2'>
                            rocket
                          </MaterialSymbolIcon>
                          Publish
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    x-chunk='dashboard-07-chunk-5'
                    className='p-4 space-y-3 xl:w-[60%] lg:w-4/5 bg-card'
                  >
                    <CardHeader className='p-0'>
                      <CardTitle className='text-xl'>Logo</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-2 px-0 pb-0'>
                      <div className='w-full aspect-square bg-darkAccent'>
                        <Image
                          src={logo}
                          alt='company-logo'
                          height={300}
                          width={300}
                          className='w-full aspect-square object-cover'
                        />
                      </div>
                    </CardContent>
                    <CardFooter className='grid grid-cols-2 gap-2 px-0'>
                      <Button
                        className='w-full rounded  bg-transparent hover:bg-darkAccent/80'
                        variant={'outline'}
                        type='button'
                      >
                        <MaterialSymbolIcon className='mr-2 text-primary'>
                          crop
                        </MaterialSymbolIcon>
                        Crop
                      </Button>
                      <Button
                        className='w-full rounded  bg-transparent hover:bg-darkAccent/80'
                        variant={'outline'}
                        type='button'
                      >
                        <MaterialSymbolIcon className='mr-2 text-primary'>
                          upload_2
                        </MaterialSymbolIcon>
                        Upload
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card className='p-4 space-y-3 xl:w-[60%] lg:w-4/5 bg-card'>
                    <CardHeader className='px-0 pb-2 pt-0'>
                      <CardTitle className='text-xl'>Delete</CardTitle>
                    </CardHeader>
                    <CardContent className='px-0'>
                      <Button
                        variant={'destructive'}
                        className='w-full'
                        type='button'
                      >
                        <MaterialSymbolIcon className='mr-2'>
                          delete
                        </MaterialSymbolIcon>
                        Delete Post
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </form>
            </Form>
          </div>
        </main>
      </div>
    </div>
  )
}
