'use client'

import { useGlobalAppStore } from '@/store/global-app-store'
import { Dialog, DialogContent } from '../ui/dialog'
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
} from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useEffect, useMemo, useRef, useState } from 'react'
import { categories } from '@/constants/job-categories'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { job_types } from '@/constants/job-types'
import MultiSelect from './multi-select'
import { job_skills } from '@/constants/job-skills'
import {
  currencies,
  education_levels,
  experience_levels
} from '@/constants/job-requirements'
import _ from 'lodash'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import MaterialSymbolIcon from './material-symbol-icon'
import { Button } from '../ui/button'
import avatar from '../../../public/images/profile-1.jpg'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { getShortendName } from '@/functions'
import { Badge } from '../ui/badge'
import { Combobox } from '../ui/combobox'

const locations = [
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

const visibilityOptions: string[] = ['Job Open', 'Job Closed']

const apply_options = ['Chat', 'Link', 'Email']
const assignable_members: { label: string; value: string }[] = [
  { label: 'Rafique', value: 'rafique' },
  { label: 'Hamza', value: 'hamza' },
  { label: 'Talha', value: 'talha' }
]

export default function JobCreateDialog () {
  const { setJobDialogState, jobDialogState } = useGlobalAppStore()
  const jobCreateForm = useForm<JobPostSchemaType>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      subcategory: '',
      skills: [],
      experience_level: '',
      education: '',
      salary: {
        currency: currencies[0],
        lower_limit: '2',
        upper_limit: '5'
      },
      location: locations[0],
      type: job_types[0].value,
      visibility: visibilityOptions[0]
    }
  })

  const salaryTriggerRef = useRef<HTMLDivElement>(null)
  const handleJobCreateFormSubmit = async (data: JobPostSchemaType) => {}

  const selectedCategory = jobCreateForm.watch('category')
  const upperLimit = parseInt(jobCreateForm.watch('salary.upper_limit') || '0')
  const lowerLimit = parseInt(jobCreateForm.watch('salary.lower_limit') || '0')
  const apply_option = jobCreateForm.watch('apply_option')

  const upperLimits = useMemo(() => {
    return Array.from({ length: 200 }).map((_, i) => lowerLimit + i + 1)
  }, [lowerLimit])

  const subCategories = useMemo(() => {
    return (
      categories.find(cat => cat.label === selectedCategory)?.sub_category || []
    )
  }, [selectedCategory])
  return (
    <Dialog
      open={jobDialogState}
      onOpenChange={e => {
        setJobDialogState(e)
        jobCreateForm.reset()
      }}
    >
      <DialogContent
        className='max-w-[800px] bg-card px-4 overflow-y-auto scroller-hide 
        max-h-[calc(100vh-20px)] flex justify-start items-start gap-2'
        hideCloseButton
      >
        <Avatar className='h-14 w-14'>
          <AvatarImage src={avatar.src} />
          <AvatarFallback>{getShortendName('John Doe')}</AvatarFallback>
        </Avatar>
        <Form {...jobCreateForm}>
          <form
            className='w-full flex flex-col justify-start items-stretch gap-4 @container'
            onSubmit={jobCreateForm.handleSubmit(handleJobCreateFormSubmit)}
          >
            <div className='grid @xs:grid-cols-4 gap-2'>
              <FormField
                control={jobCreateForm.control}
                name='title'
                render={({ field }) => (
                  <FormItem className='xs:col-span-3 col-span-2'>
                    <FormControl>
                      <Input {...field} placeholder='Job Title' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={jobCreateForm.control}
                name='type'
                render={({ field }) => (
                  <FormItem className='xs:col-span-1 col-span-2'>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='' />
                        </SelectTrigger>
                        <SelectContent>
                          {job_types.map(type => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={jobCreateForm.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder='Job Description'
                      rows={7}
                      className='overflow-y-auto scroller'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid @xs:grid-cols-2 gap-2'>
              <FormField
                control={jobCreateForm.control}
                name='category'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
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
                control={jobCreateForm.control}
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
            <FormField
              control={jobCreateForm.control}
              name='skills'
              render={({ field }) => (
                <MultiSelect
                  placeholder='Job Skills'
                  values={job_skills.map(s => s.label)}
                  selectedValues={field.value}
                  onChange={e =>
                    field.value?.includes(e)
                      ? field.onChange(field.value.filter(s => s !== e))
                      : field.onChange([...field.value, e])
                  }
                />
              )}
            />
            <div className='grid @xl:grid-cols-3 @sm:grid-cols-2 gap-2'>
              <FormField
                control={jobCreateForm.control}
                name='experience_level'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Experience level' />
                        </SelectTrigger>
                        <SelectContent>
                          {experience_levels.map(exp => (
                            <SelectItem key={exp} value={exp}>
                              {exp}
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
                control={jobCreateForm.control}
                name='education'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Education Level' />
                        </SelectTrigger>
                        <SelectContent>
                          {education_levels.map(edu => (
                            <SelectItem key={edu} value={edu}>
                              {edu}
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
                      {jobCreateForm.watch('salary.currency')}&nbsp;
                      {!_.isNull(lowerLimit) ? `${lowerLimit} LPA -` : null}
                      &nbsp;
                      {!_.isNull(upperLimit) ? `${upperLimit} LPA` : null}
                    </span>
                    <MaterialSymbolIcon className='select-none'>
                      keyboard_arrow_down
                    </MaterialSymbolIcon>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  className='bg-darkAccent min-w-[250px]'

                  // align='end'
                >
                  <div className='grid grid-cols-2 gap-2'>
                    <FormField
                      control={jobCreateForm.control}
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
                                  <SelectItem value={currency} key={currency}>
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
                      control={jobCreateForm.control}
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
                                {Array.from({ length: 200 }, (_, i) => i).map(
                                  i => (
                                    <SelectItem value={i.toString()} key={i}>
                                      {`${i}`}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={jobCreateForm.control}
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
                                  <SelectItem value={i.toString()} key={i}>
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
            <div className='grid @xl:grid-cols-3 @sm:grid-cols-2 gap-2'>
              <FormField
                control={jobCreateForm.control}
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
                  control={jobCreateForm.control}
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
            </div>
            <div className='grid @xs:grid-cols-4 gap-2'>
              <FormField
                control={jobCreateForm.control}
                name='location'
                render={({ field }) => (
                  <FormItem className='xs:col-span-2 col-span-2'>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select Location' />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map(loc => (
                            <SelectItem key={loc} value={loc}>
                              {loc}
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
                control={jobCreateForm.control}
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
              <FormField
                control={jobCreateForm.control}
                name='visibility'
                render={({ field }) => (
                  <FormItem className='xs:col-span-1 col-span-2'>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Job Open' />
                        </SelectTrigger>
                        <SelectContent>
                          {visibilityOptions.map(option => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className='flex justify-between items-center gap-2'>
              <Badge className='h-8 flex justify-start items-center gap-1 cursor-pointer'>
                <MaterialSymbolIcon className='text-sm opacity-100'>
                  delete
                </MaterialSymbolIcon>
                <span>Delete</span>
              </Badge>
              <Button type='submit' className='h-8'>
                Post
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
