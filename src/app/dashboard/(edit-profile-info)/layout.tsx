'use client'

import { Navigator } from '@/components/custom'
import { Tabs } from '@/components/custom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { scroll } from '@/functions/scroll'
import { FieldType } from '@/types/field-type'
import { IconType } from '@/types/icon'
import {
  ArrowBack,
  ArrowForward,
  Code,
  Description,
  Info,
  Movie,
  Person,
  Public,
  School,
  SlowMotionVideo,
  Work,
  WorkHistory
} from '@mui/icons-material'
import Link from 'next/link'
import { useRef } from 'react'

const tabs: (FieldType & { Icon: IconType; href: string })[] = [
  {
    label: 'Edit Profile',
    value: 'edit-profile',
    Icon: Person,
    href: '/dashboard/profile'
  },
  {
    label: 'Job Preference',
    value: 'job-preference',
    Icon: Work,
    href: '/dashboard/job-preference'
  },
  {
    label: 'Work Experience',
    value: 'work-experience',
    Icon: WorkHistory,
    href: '/dashboard/work-experience'
  },
  {
    label: 'Education',
    value: 'education',
    Icon: School,
    href: '/dashboard/education'
  },
  {
    label: 'Bio',
    value: 'bio',
    Icon: Info,
    href: '/dashboard/bio'
  },
  {
    label: 'Resume',
    value: 'resume',
    Icon: Description,
    href: '/dashboard/resume'
  },
  {
    label: 'DemoReel',
    value: 'demoreel',
    Icon: SlowMotionVideo,
    href: '/dashboard/demoreel'
  },
  {
    label: 'Productions',
    value: 'productions',
    Icon: Movie,
    href: '/dashboard/productions'
  },
  {
    label: 'Links',
    value: 'links',
    Icon: Public,
    href: '/dashboard/links'
  },

  {
    label: 'Skills',
    value: 'skills',
    Icon: Code,
    href: '/dashboard/skills'
  },
  {
    label: 'Softwares',
    value: 'softwares',
    Icon: Code,
    href: '/dashboard/softwares'
  }
]

export default function Layout ({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className='flex h-full w-full flex-col'>
      <div className='flex flex-col gap-4 '>
        <header
          className=' z-30 flex md:h-14 items-center gap-4 bg-none px-4 
        sm:static sm:h-auto sm:bg-transparent sm:px-6'
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
                  <Link href='#'>Edit Profile</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className='flex flex-col justify-start items-center gap-2 w-full'>
          <div className='w-full relative'>
            <div
              ref={scrollRef}
              className='w-full flex justify-start items-center gap-0 px-3 overflow-x-auto scroller-hide'
            >
              <Tabs tabs={tabs} className='md:px-4' />
            </div>
            <Navigator
              Icon={ArrowBack}
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-lightAccent/50 rounded-full h-8 w-8'
              iconClassName='text-sm'
              onClick={() => scroll({ ref: scrollRef, direction: 'left' })}
            />
            <Navigator
              Icon={ArrowForward}
              className='absolute right-0 top-1/2 -translate-y-1/2 bg-lightAccent/50 rounded-full h-8 w-8'
              iconClassName='text-sm'
              onClick={() => scroll({ ref: scrollRef, direction: 'right' })}
            />
          </div>
          <div className='w-full flex gap-4 px-4'>{children}</div>
        </main>
      </div>
    </div>
  )
}
