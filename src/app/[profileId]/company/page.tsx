'use client'

import { MaterialSymbolIcon, ProfileInfoOverView } from '@/components/custom'
import { AboutSectionItemsWrapper } from '@/components/custom/profile'
import { Badge } from '@/components/ui/badge'
import { sample_cateories } from '@/constants/categories'
import Image from 'next/image'
import { HTMLProps, useState } from 'react'
import { cn } from '@/lib/utils'
import { bioDesc } from '@/constants/profile-about'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import {
  ProfileJobPreferenceSchemaType,
  profileJobPreferenceSchema
} from '@/schema/profile-job-preference'
import { zodResolver } from '@hookform/resolvers/zod'
import profile from '@/../public/images/profile-1.jpg'
import poster from '@/../public/images/poster.jpg'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import RecruiterDialogComponent from './_components/recruiter-dialog-component'
import Link from 'next/link'

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
    <section className='md:w-3/5 mx-auto space-y-8 pt-8'>
      <AboutSectionItemsWrapper
        title='About'
        className=''
        edit={
          <Link href={'/dashboard/company'}>
            <Button
              className='bg-transparent hover:bg-primary text-primary hover:text-white'
              variant={'outline'}
            >
              <MaterialSymbolIcon className='mr-2 opacity-100'>
                edit
              </MaterialSymbolIcon>
              Edit Profile
            </Button>
          </Link>
        }
      >
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
        title='Productions'
        className='opacity-100 space-y-6'
      >
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className='flex justify-start items-center gap-4'>
            <Image
              src={poster}
              alt='poster'
              width={100}
              height={100}
              className='w-[150px] h-auto'
            />
            <div className='flex flex-col justify-start items-start gap-1 self-stretch [&>p]:opacity-70 [&>p]:text-sm'>
              <h1 className='text-lg '>Bolt</h1>
              <p>2023</p>
              <p>Music Video</p>
              <p>3D Animator</p>
              <p>PixArt</p>
            </div>
          </div>
        ))}
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Demoreel'
        className='opacity-100 space-y-1 flex justify-center items-center pb-10 pt-0'
      >
        <iframe
          src='https://www.youtube.com/embed/doPV-Shqm7k'
          width={640}
          className='aspect-video'
        ></iframe>
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Skills'
        className='flex gap-3 flex-wrap opacity-100'
      >
        {sample_cateories.map((category, i) => (
          <Badge className='text-md border' key={i}>
            <span className='opacity-70 text-sm'>{category}</span>
          </Badge>
        ))}
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Softwares'
        className='flex gap-3 flex-wrap opacity-100'
      >
        {sample_cateories.map((category, i) => (
          <Badge
            className='text-md border flex justify-start items-center gap-1 pl-0 py-0'
            key={i}
          >
            <Image
              src={profile}
              alt='profile'
              height={30}
              width={30}
              className=''
            />
            <span className='opacity-70 text-sm'>{category}</span>
          </Badge>
        ))}
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
        title='Recruiters'
        className='grid xs:grid-cols-2 gap-2 opacity-100'
      >
        {Array.from({ length: 2 }).map((_, i) => (
          <Dialog key={i}>
            <DialogTrigger asChild>
              <div className='w-fit'>
                <ProfileInfoOverView
                  className='w-fit'
                  image='h-12 w-12'
                  heading='md:text-lg'
                />
              </div>
            </DialogTrigger>
            <DialogContent hideCloseButton className='bg-card'>
              <RecruiterDialogComponent />
            </DialogContent>
          </Dialog>
        ))}
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Social Links'
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
    </section>
  )
}
