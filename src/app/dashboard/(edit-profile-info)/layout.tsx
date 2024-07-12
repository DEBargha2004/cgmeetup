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
import Link from 'next/link'
import { useRef } from 'react'

const tabs: (FieldType & { icon: string; href: string })[] = [
  {
    label: 'Edit Profile',
    value: 'edit-profile',
    icon: 'person',
    href: '/dashboard/profile'
  },
  {
    label: 'Job Preference',
    value: 'job-preference',
    icon: 'work',
    href: '/dashboard/job-preference'
  },
  {
    label: 'Work Experience',
    value: 'work-experience',
    icon: 'work_history',
    href: '/dashboard/work-experience'
  },
  {
    label: 'Education',
    value: 'education',
    icon: 'school',
    href: '/dashboard/education'
  },
  {
    label: 'Bio',
    value: 'bio',
    icon: 'info',
    href: '/dashboard/bio'
  },
  {
    label: 'Resume',
    value: 'resume',
    icon: 'description',
    href: '/dashboard/resume'
  },
  {
    label: 'DemoReel',
    value: 'demoreel',
    icon: 'slow_motion_video',
    href: '/dashboard/demoreel'
  },
  {
    label: 'Productions',
    value: 'productions',
    icon: 'movie',
    href: '/dashboard/productions'
  },
  {
    label: 'Links',
    value: 'links',
    icon: 'public',
    href: '/dashboard/links'
  },

  {
    label: 'Skills',
    value: 'skills',
    icon: 'code',
    href: '/dashboard/skills'
  },
  {
    label: 'Softwares',
    value: 'softwares',
    icon: 'code',
    href: '/dashboard/softwares'
  }
]

export default function Layout ({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className='flex h-full w-full flex-col'>
      <div className='flex flex-col sm:gap-4 '>
        <header className=' z-30 flex md:h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
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
              icon='arrow_back'
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-lightAccent/50 rounded-full h-8 w-8'
              iconClassName='text-sm'
              onClick={() => scroll({ ref: scrollRef, direction: 'left' })}
            />
            <Navigator
              icon='arrow_forward'
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
