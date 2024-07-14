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
import { Cropper, MaterialSymbolIcon } from '@/components/custom'
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
import _ from 'lodash'
import { Combobox } from '@/components/ui/combobox'
import { useDropzone } from 'react-dropzone'
import { ReactCropperElement } from 'react-cropper'
import { FancyMultiSelect } from '@/components/ui/fancy-multi-select'
import {
  Close,
  Crop,
  Delete,
  Edit,
  KeyboardArrowDown,
  Rocket,
  Upload
} from '@mui/icons-material'
import ImageIcon from '@mui/icons-material/Image'

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

const apply_options = ['Chat', 'Link', 'Email']
const assignable_members: { label: string; value: string }[] = [
  { label: 'Rafique', value: 'rafique' },
  { label: 'Hamza', value: 'hamza' },
  { label: 'Talha', value: 'talha' }
]

export default function Dashboard () {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const [selectedVisibility, setSelectedVisibility] = useState<string>(
    visibilityOptions[0]
  )
  const [images, setImages] = useState<
    { id: string; url: string; type: string; caption: string }[]
  >([])
  const [logo, setLogo] = useState<{
    id: string
    url: string
    type: string
    caption: string
    custom: boolean
    crop: boolean
  } | null>()

  const salaryTriggerRef = useRef<HTMLDivElement>(null)
  const cropperRef = useRef<ReactCropperElement>(null)

  const [salaryPopoverWidth, setSalaryPopoverWidth] = useState(0)

  const form = useForm<JobPostSchemaType>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      type: job_types[0].value,
      visibility: visibilityOptions[0],
      skills: [],
      salary: {
        currency: currencies[0],
        lower_limit: '2',
        upper_limit: '5'
      },
      apply_option: apply_options[0],
      location: addresses[0],
      assigned_to: assignable_members[0].value
    }
  })
  const logoDropzone = useDropzone({
    accept: {
      'image/*': []
    }
  })

  const handleFormSubmit = async (e: JobPostSchemaType) => {}
  const handleCrop = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      //@ts-ignore
      setLogo(prev => ({
        ...prev,
        url: cropperRef.current?.cropper
          .getCroppedCanvas()
          .toDataURL() as string
      }))
    }
  }
  const handleLogoChange = (files: File[] | null) => {
    if (files?.length) {
      const reader = new FileReader()
      reader.readAsDataURL(files[0])

      reader.onloadend = () => {
        setLogo({
          id: crypto.randomUUID(),
          url: reader.result as string,
          type: files[0].type,
          caption: '',
          custom: true,
          crop: false
        })
      }
    }
  }

  const upperLimit = parseInt(form.watch('salary.upper_limit') || '0')
  const lowerLimit = parseInt(form.watch('salary.lower_limit') || '0')
  const apply_option = form.watch('apply_option')

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

  useEffect(() => {
    handleLogoChange(logoDropzone.acceptedFiles)
  }, [logoDropzone.acceptedFiles])

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
                    <div className='p-6 flex xs:flex-row flex-col justify-between items-stretch xs:items-center gap-3 w-full'>
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
                                <SelectTrigger className='xs:w-[200px] w-full'>
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
                      <CardTitle className='text-xl'>Job Positions</CardTitle>
                    </CardHeader>
                    <CardContent className=''>
                      <div className='grid xs:grid-cols-2 gap-3'>
                        <FormField
                          control={form.control}
                          name='category'
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className=' w-full'>
                                <SelectValue placeholder='Industry' />
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
                            <FormItem className='w-full'>
                              {/* <FormLabel></FormLabel> */}
                              <FormControl>
                                <Select
                                  disabled={!form.watch('category')}
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger className=''>
                                    <SelectValue placeholder='Positions' />
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
                                <FancyMultiSelect
                                  options={job_skills}
                                  placeholder='Select Skills'
                                />
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
                              <Close
                                className='h-4 cursor-pointer'
                                onClick={() => {
                                  form.setValue(
                                    'skills',
                                    form
                                      .watch('skills')
                                      .filter(s => s !== skill)
                                  )
                                }}
                              />
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
                    <CardContent className='@container'>
                      <div className='grid @2xl:grid-cols-3 @lg:grid-cols-2 gap-3 w-full'>
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
                                Salary&nbsp;
                                {form.watch('salary.currency')}&nbsp;
                                {!_.isNull(lowerLimit)
                                  ? `${lowerLimit} LPA -`
                                  : null}
                                &nbsp;
                                {!_.isNull(upperLimit)
                                  ? `${upperLimit} LPA`
                                  : null}
                              </span>
                              <KeyboardArrowDown />
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
                                              {`${i}`}
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
                                              {`${i}`}
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
                      <CardTitle className='text-xl'>How to Apply</CardTitle>
                    </CardHeader>
                    <CardContent className='grid grid-cols-3 gap-2'>
                      <FormField
                        control={form.control}
                        name='apply_option'
                        render={({ field }) => (
                          <FormItem className=''>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {apply_options.map((opt, index) => (
                                    <SelectItem value={opt} key={index}>
                                      {opt}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {['Link', 'Email'].includes(apply_option) ? (
                        <FormField
                          control={form.control}
                          name='apply_option_info'
                          render={({ field }) => (
                            <FormItem className='col-span-2'>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder={`Application ${apply_option}`}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : null}
                    </CardContent>
                  </Card>
                  <Card
                    x-chunk='dashboard-07-chunk-2'
                    className='bg-card @container'
                  >
                    <CardHeader className='pb-3'>
                      <CardTitle className='text-xl'>Address</CardTitle>
                    </CardHeader>
                    <CardContent className='grid @lg:grid-cols-2 gap-3 w-full'>
                      <FormField
                        control={form.control}
                        name='location'
                        render={({ field }) => (
                          <FormItem className='w-full'>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className=''>
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
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        className='w-fit rounded  bg-transparent hover:bg-darkAccent/80 ml-auto'
                        variant={'outline'}
                        type='button'
                      >
                        <Edit className='mr-2 text-primary' />
                        Edit Address Here
                      </Button>
                    </CardContent>
                  </Card>
                  <Card
                    x-chunk='dashboard-07-chunk-2'
                    className='bg-card @container'
                  >
                    <CardHeader className='pb-3'>
                      <CardTitle className='text-xl'>
                        Assigned To Team Member
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='grid @lg:grid-cols-2 gap-3 w-full'>
                      <FormField
                        control={form.control}
                        name='assigned_to'
                        render={({ field }) => (
                          <FormItem className='w-full'>
                            <FormControl>
                              <Combobox
                                value={field.value}
                                onChange={field.onChange}
                                options={assignable_members}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                          <Rocket className='mr-2' />
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
                      <input
                        hidden
                        type='file'
                        id='logo'
                        {...logoDropzone.getInputProps()}
                      />
                      <div
                        className='w-full aspect-square border-2 border-dashed bg-darkAccent'
                        {...(!logo?.crop && logoDropzone.getRootProps())}
                      >
                        {logo ? (
                          logo.crop ? (
                            <Cropper
                              ref={cropperRef}
                              style={{
                                height: '100%',
                                width: '100%'
                              }}
                              className='object-contain cropper overflow-hidden'
                              aspectRatio={1}
                              src={logo.url}
                              // zoomTo={0.5}
                              initialAspectRatio={1}
                              preview='.img-preview'
                              viewMode={1}
                              minCropBoxHeight={10}
                              minCropBoxWidth={10}
                              background={false}
                              responsive={true}
                              autoCropArea={1}
                              checkOrientation={false}
                              guides={true}
                            />
                          ) : (
                            <div className='h-full w-full flex justify-center items-center'>
                              <Image
                                src={logo.url}
                                alt='logo'
                                width={300}
                                height={300}
                                className='h-full w-full object-cover'
                              />
                            </div>
                          )
                        ) : (
                          <div className='h-full w-full flex flex-col justify-center items-center'>
                            <ImageIcon />
                            <p className='text-sm text-white opacity-70 text-center'>
                              Upload or drag & drop image
                            </p>
                          </div>
                        )}
                      </div>
                      <div className=' w-full flex justify-center items-center gap-3'>
                        {logo && (
                          <Badge
                            variant={'outline'}
                            className='cursor-pointer hover:bg-darkAccent/80'
                            onClick={() => {
                              if (logo.crop) {
                                handleCrop()
                              }
                              //@ts-ignore
                              setLogo(prev => ({
                                ...prev,
                                crop: !prev?.crop
                              }))
                            }}
                          >
                            <Crop className='mr-2 text-primary' />
                            <span>Crop</span>
                          </Badge>
                        )}

                        <Badge
                          variant={'outline'}
                          className='cursor-pointer hover:bg-darkAccent/80'
                          {...logoDropzone.getRootProps()}
                        >
                          <Upload className='mr-2 text-primary' />
                          <span>Upload</span>
                        </Badge>
                      </div>
                      {logo?.custom && (
                        <div className='flex justify-center items-center'>
                          <Button
                            variant={'destructive'}
                            className=''
                            onClick={() => {
                              if (logoDropzone.inputRef.current)
                                logoDropzone.inputRef.current.value = ''
                              setLogo(
                                images.length
                                  ? { ...images[0], custom: false, crop: false }
                                  : null
                              )
                            }}
                          >
                            <Delete className='mr-2' />
                            <span>Remove Logo</span>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  <Card className='p-4 space-y-3 xl:w-[60%] lg:w-4/5 bg-card'>
                    <CardHeader className='px-0 pb-2 pt-0'>
                      <CardTitle className='text-xl'>Delete</CardTitle>
                    </CardHeader>
                    <CardContent className='px-0 grid place-content-center'>
                      <Button
                        variant={'destructive'}
                        className='min-w-24 '
                        type='button'
                      >
                        <Delete className='mr-2' />
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
