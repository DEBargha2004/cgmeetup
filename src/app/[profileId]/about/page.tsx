import { AboutSectionItemsWrapper } from '@/components/custom/profile'
import { Badge } from '@/components/ui/badge'
import { sample_cateories } from '@/constants/categories'
import Image from 'next/image'
import pdf_image from '../../../../public/images/pdf.png'
import { bioDesc } from '@/constants/profile-about'
import { Button } from '@/components/ui/button'
import { ProfileJobPreferenceSchemaType } from '@/schema/profile-job-preference'
import profile from '@/../public/images/profile-1.jpg'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger
} from '@/components/ui/dialog'
import resume from '@/../public/images/resume.jpg'
import poster from '@/../public/images/poster.jpg'
import Link from 'next/link'
import {
  Close,
  Download,
  Edit,
  Instagram,
  Language,
  OpenInNew,
  Visibility,
  YouTube
} from '@mui/icons-material'
import { Twitter } from '@mui/icons-material'

const jobPreferences: ProfileJobPreferenceSchemaType[] = [
  {
    category: sample_cateories[0],
    subcategory: sample_cateories[0],
    preferred_city: 'Hyderabad',
    expected_salary: {
      currency: 'INR',
      lower_limit: '50000',
      upper_limit: '100000'
    },
    job_type: 'Full Time'
  }
]

export default function AboutPage () {
  return (
    <section className='md:w-3/5 mx-auto space-y-8 pt-8 @container pb-10'>
      <AboutSectionItemsWrapper
        title='My Bio'
        className=''
        edit={
          <Link href={'/dashboard/profile'}>
            <Button
              className='bg-transparent hover:bg-primary text-primary hover:text-white'
              variant={'outline'}
            >
              <Edit className='mr-2' />
              <span>Edit Profile</span>
            </Button>
          </Link>
        }
      >
        {bioDesc}
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Job Preference'
        className='opacity-100 space-y-6'
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
      >
        <div className='space-y-2 w-full'>
          <h1 className='text-lg text-white'>Ubisoft</h1>
          <div className='[&>p]:opacity-70 [&>p]:text-sm'>
            <p>3D Artist</p>
            <p>Art Department</p>
            <p>Nov 2022 - Apr 2024</p>
          </div>
        </div>
        <div className='space-y-2 w-full'>
          <h1 className='text-lg text-white'>Epic Games</h1>
          <div className='[&>p]:opacity-70 [&>p]:text-sm'>
            <p>Animator</p>
            <p>Graphics Department</p>
            <p>May 2021 - Aug 2022</p>
          </div>
        </div>
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
        title='Demoreel'
        className='opacity-100 space-y-1 flex justify-center items-center pb-10 pt-0'
      >
        <iframe
          src='https://www.youtube.com/embed/doPV-Shqm7k'
          width={640}
          className='aspect-video'
        ></iframe>
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper title='Resume' className='opacity-100'>
        <div className='flex justify-start items-center gap-5'>
          <Image src={pdf_image} alt='pdf' height={50} width={50} />
          <Dialog>
            <DialogTrigger asChild>
              <div className='flex justify-start items-center gap-2 cursor-pointer'>
                <Visibility />
                <p className='opacity-60 hover:opacity-100 transition-all cursor-pointer'>
                  View Resume
                </p>
              </div>
            </DialogTrigger>
            <DialogContent
              className='bg-card max-w-[600px] h-screen overflow-y-auto scroller '
              hideCloseButton
            >
              <div className='relative'>
                <Image
                  src={resume}
                  alt='resume'
                  height={300}
                  width={300}
                  className='h-full w-full object-cover'
                />
                <DialogClose className='absolute top-3 right-3'>
                  <div className='h-8 w-8 rounded-full bg-lightAccent/70 hover:bg-lightAccent/90 grid place-content-center shrink-0'>
                    <Close />
                  </div>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
          <div className='flex justify-start items-center gap-2 cursor-pointer'>
            <Download />
            <p className='opacity-60 hover:opacity-100 transition-all cursor-pointer'>
              Download Resume
            </p>
          </div>
        </div>
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Social Links'
        className='opacity-100 grid grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 gap-2 p-4 w-full '
      >
        <p className='flex justify-center items-center gap-1 cursor-pointer w-full shrink-0'>
          <Twitter />
          Twitter
        </p>
        <p className='flex justify-center items-center gap-1 cursor-pointer w-full shrink-0'>
          <Instagram />
          Instagram
        </p>
        <p className='flex justify-center items-center gap-1 cursor-pointer w-full shrink-0'>
          <YouTube />
          Youtube
        </p>
        <p className='flex justify-center items-center gap-1 cursor-pointer w-full shrink-0'>
          <Language />
          Website
        </p>
      </AboutSectionItemsWrapper>
    </section>
  )
}
