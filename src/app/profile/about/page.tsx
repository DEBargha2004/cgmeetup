'use client'

import { MaterialSymbolIcon, ProfileInfoOverView } from '@/components/custom'
import {
  AboutSectionItemsWrapper,
  JobPreferenceForm
} from '@/components/custom/profile'
import { Badge } from '@/components/ui/badge'
import { sample_cateories } from '@/constants/categories'
import Image from 'next/image'
import pdf_image from '../../../../public/images/pdf.png'
import { HTMLProps, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { bioDesc } from '@/constants/profile-about'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import {
  ProfileJobPreferenceSchemaType,
  profileJobPreferenceSchema
} from '@/schema/profile-job-preference'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { job_types } from '@/constants/job-types'
import { categories } from '@/constants/job-categories'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { currencies } from '@/constants/job-requirements'

function EditIcon ({ className, ...props }: {} & HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-full border-2 border-primary h-10 w-10 flex justify-center items-center cursor-pointer',
        className
      )}
      {...props}
    >
      <MaterialSymbolIcon className='opacity-100 text-primary'>
        edit
      </MaterialSymbolIcon>
    </div>
  )
}

export default function AboutPage () {
  const [bio, setBio] = useState({
    initial: bioDesc,
    edited: bioDesc
  })
  const [dialog, setDialog] = useState({
    bio: false,
    job_preference: false,
    work_experience: false
  })

  const [jobPreferences, setJobPreferences] = useState<
    ProfileJobPreferenceSchemaType[]
  >([])

  /* Forms Start */

  const jobPreferenceForm = useForm<ProfileJobPreferenceSchemaType>({
    resolver: zodResolver(profileJobPreferenceSchema)
  })

  /* Forms End */

  /* Forms Handlers Start */

  const handleJobPreferenceFormSubmit = async (
    data: ProfileJobPreferenceSchemaType
  ) => {
    setJobPreferences(prev => [...prev, data])
  }

  /* Forms Handlers End */

  return (
    <section className='md:w-3/5 mx-auto space-y-10'>
      <AboutSectionItemsWrapper
        title='My Bio'
        className=''
        edit={
          <Dialog
            open={dialog.bio}
            onOpenChange={e => {
              setDialog(prev => ({ ...prev, bio: e }))
              setBio(prev => ({ ...prev, edited: prev.initial }))
            }}
          >
            <DialogTrigger asChild>
              <EditIcon />
            </DialogTrigger>
            <DialogContent className='w-full md:w-1/2'>
              <DialogHeader>
                <h1>My Bio</h1>
              </DialogHeader>
              <DialogDescription>
                <Textarea
                  value={bio.edited}
                  onChange={e =>
                    setBio(prev => ({ ...prev, edited: e.target.value }))
                  }
                  rows={10}
                />
              </DialogDescription>
              <DialogFooter>
                <Button
                  onClick={() => {
                    setBio(prev => ({ ...prev, initial: prev.edited }))
                    setDialog(prev => ({ ...prev, bio: false }))
                  }}
                >
                  Save
                </Button>
                <DialogClose>
                  <Button variant={'outline'}>Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      >
        {bio.initial}
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Job Preference'
        className='opacity-100 space-y-6'
        edit={
          <Dialog
            open={dialog.job_preference}
            onOpenChange={e =>
              setDialog(prev => ({ ...prev, job_preference: e }))
            }
          >
            <DialogTrigger asChild>
              <EditIcon />
            </DialogTrigger>
            <DialogContent>
              <JobPreferenceForm
                form={jobPreferenceForm}
                onSubmit={e => {
                  handleJobPreferenceFormSubmit(e)
                  setDialog(prev => ({ ...prev, job_preference: false }))
                }}
              />
            </DialogContent>
          </Dialog>
        }
      >
        {jobPreferences.map((jobPreference, index) => (
          <div className='space-y-2 w-full' key={index}>
            <h1 className='text-lg text-white'>
              {jobPreference.category} - {jobPreference.subcategory}
            </h1>
            <div className=' opacity-60'>
              <p>{jobPreference.preferred_city}</p>
              <p>{jobPreference.job_type}</p>
              <p>
                {jobPreference.expected_salary.currency}{' '}
                {jobPreference.expected_salary.lower_limit}LPA -{' '}
                {jobPreference.expected_salary.upper_limit}LPA/month
              </p>
            </div>
          </div>
        ))}
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Work Experience'
        className='opacity-100 space-y-6'
        edit={
          <Dialog
            open={dialog.work_experience}
            onOpenChange={e =>
              setDialog(prev => ({ ...prev, work_experience: e }))
            }
          >
            <DialogTrigger asChild>
              <EditIcon />
            </DialogTrigger>
            <DialogContent>
              <h1>Work Experience</h1>
            </DialogContent>
          </Dialog>
        }
      >
        <div className='space-y-2 w-full'>
          <h1 className='text-lg text-white'>Ubisoft</h1>
          <div className=' opacity-60'>
            <p>3D Artist</p>
            <p>Art Department</p>
            <p>Nov 2022 - Apr 2024</p>
          </div>
        </div>
        <div className='space-y-2 w-full'>
          <h1 className='text-lg text-white'>Epic Games</h1>
          <div className=' opacity-60'>
            <p>Animator</p>
            <p>Graphics Department</p>
            <p>May 2021 - Aug 2022</p>
          </div>
        </div>
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Education'
        className='opacity-100 space-y-6'
      >
        <div className='space-y-2 w-full'>
          <h1 className='text-lg text-white'>MIT</h1>
          <div className=' opacity-60'>
            <p>PHD</p>
            <p>Art Department</p>
            <p>Nov 2022 - Apr 2024</p>
          </div>
        </div>
        <div className='space-y-2 w-full'>
          <h1 className='text-lg text-white'>Great Lakes</h1>
          <div className=' opacity-60'>
            <p>Geaduation/Diploma</p>
            <p>Graphics Department</p>
            <p>May 2021 - Aug 2022</p>
          </div>
        </div>
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Skills'
        className='flex gap-3 flex-wrap opacity-100'
      >
        {sample_cateories.map((category, i) => (
          <Badge className='text-md border-white border-opacity-65' key={i}>
            {category}
          </Badge>
        ))}
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper title='Resume' className='opacity-100'>
        <div className='flex justify-start items-center gap-5'>
          <Image src={pdf_image} alt='pdf' height={50} width={50} />
          <p className='opacity-60 hover:opacity-100 transition-all cursor-pointer'>
            View Resume
          </p>
          <p className='opacity-60 hover:opacity-100 transition-all cursor-pointer'>
            Download Resume
          </p>
        </div>
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Work Experience'
        className='opacity-100 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4 w-full '
      >
        <p className='flex justify-center items-center gap-1 cursor-pointer w-full shrink-0'>
          Twitter
          <MaterialSymbolIcon>open_in_new</MaterialSymbolIcon>
        </p>
        <p className='flex justify-center items-center gap-1 cursor-pointer w-full shrink-0'>
          Instagram
          <MaterialSymbolIcon>open_in_new</MaterialSymbolIcon>
        </p>
        <p className='flex justify-center items-center gap-1 cursor-pointer w-full shrink-0'>
          Youtube
          <MaterialSymbolIcon>open_in_new</MaterialSymbolIcon>
        </p>
        <p className='flex justify-center items-center gap-1 cursor-pointer w-full shrink-0'>
          Website
          <MaterialSymbolIcon>open_in_new</MaterialSymbolIcon>
        </p>
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Recruiters'
        className='grid grid-cols-2 gap-2'
      >
        <ProfileInfoOverView
          className=''
          image='h-12 w-12'
          heading='md:text-lg'
        />
        <ProfileInfoOverView
          className=''
          image='h-12 w-12'
          heading='md:text-lg'
        />
      </AboutSectionItemsWrapper>
    </section>
  )
}
