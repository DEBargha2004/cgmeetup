'use client'

import { MaterialSymbolIcon } from '@/components/custom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
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
      <div className='flex flex-col sm:gap-4 sm:py-4 '>
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
          <div className='w-full flex justify-center items-center gap-3 px-3'>
            <Tabs value={pathname}>
              <TabsList>
                {tabs.map(tab => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.href}
                    className={cn(
                      `border-r border-darkAccent last:border-none rounded `
                    )}
                  >
                    <Link href={tab.href} className='flex items-center'>
                      <MaterialSymbolIcon className='mr-1 text-[16px] opacity-100'>
                        {tab.icon}
                      </MaterialSymbolIcon>
                      <span className='lg:inline hidden text-white'>
                        {tab.label}
                      </span>
                    </Link>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <div className='w-full md:w-1/2 px-2 md:px-0 flex flex-col justify-start items-stretch gap-0'>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
