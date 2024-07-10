'use client'

import { MaterialSymbolIcon, ProfileInfoOverView } from '@/components/custom'
import { AboutSectionItemsWrapper } from '@/components/custom/profile'
import { Badge } from '@/components/ui/badge'
import { sample_cateories } from '@/constants/categories'
import Image from 'next/image'
import pdf_image from '../../../../public/images/pdf.png'
import { HTMLProps, useState } from 'react'
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
import { JobPreferenceForm } from '@/components/custom/form'
import Link from 'next/link'

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

  const jobPreferencesForm = useForm<ProfileJobPreferenceSchemaType>({
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
    <section className='md:w-3/5 mx-auto space-y-8'>
      <div className='flex justify-center mt-8'>
        <Button
          className='bg-transparent hover:bg-primary text-primary hover:text-white'
          variant={'outline'}
        >
          <MaterialSymbolIcon className='mr-2 opacity-100'>
            edit
          </MaterialSymbolIcon>
          Edit Profile
        </Button>
      </div>
      <AboutSectionItemsWrapper title='About' className=''>
        {bio.initial}
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Company Legal Name'
        className='opacity-100 space-y-6'
      >
        <p>Adidas Pvt. Ltd.</p>
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Company Short Name'
        className='opacity-100 space-y-6'
      >
        <p>Adidas</p>
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Functional Area'
        className='opacity-100 space-y-6'
      >
        <p>Software Development</p>
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Company Size'
        className='flex gap-3 flex-wrap opacity-100'
      >
        <p>20-99</p>
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Location'
        className='opacity-100 space-y-2'
      >
        <div>
          <h1 className='text-lg font-semibold'>MPC VFX - Los Angeles</h1>
          <p>8921 Lindblade Street, Culver City, Los Angeles, USA</p>
        </div>
        <div>
          <h1 className='text-lg font-semibold'>MPC VFX - Mumbai</h1>
          <p>Mumbai - 400088, Maharashtra (Office No. 6)</p>
        </div>
        <div>
          <h1 className='text-lg font-semibold'>MPC VFX - New York</h1>
          <p>5th Avenue, 6th Floor, New York, USA</p>
        </div>
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Demoreel'
        className='opacity-100 space-y-1'
      >
        {Array.from({ length: 4 }).map((_, i) => {
          return (
            <Link
              key={i}
              href={'https://youtu.be/BmfXAL58iI8?si=Tu6jVRU_-cj4isCF'}
              className='block hover:text-primary cursor-pointer transition-all'
            >
              https://youtu.be/BmfXAL58iI8?si=Tu6jVRU_-cj4isCF
            </Link>
          )
        })}
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Company Website'
        className='opacity-100 '
      >
        <Link href={'https://www.adidas.com'} className='text-primary'>
          www.adidas.com
        </Link>
      </AboutSectionItemsWrapper>

      <AboutSectionItemsWrapper
        title='Recruiters'
        className='grid grid-cols-2 gap-2 opacity-100'
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
