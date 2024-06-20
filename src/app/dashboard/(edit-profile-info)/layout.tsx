'use client'

import { Tabs } from '@/components/custom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { FieldType } from '@/types/field-type'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
  // {
  //   label: 'User Name',
  //   value: 'username',
  //   icon: 'alternate_email',
  //   href: '/dashboard/username'
  // }
]

export default function Layout ({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  console.log(pathname.split('/dashboard/edit/'))
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
        <main className='flex flex-col justify-start items-center gap-10 w-full'>
          <div className='w-full flex justify-start items-center gap-0 px-3'>
            <Tabs tabs={tabs} className='md:px-4' />
          </div>
          <div className='w-full grid grid-cols-2 gap-4 px-4'>{children}</div>
        </main>
      </div>
    </div>
  )
}
