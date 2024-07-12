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
import { useRef } from 'react'
import { Navigator } from '@/components/custom'
import { scroll } from '@/functions/scroll'

const tabs: (FieldType & { icon: string; href: string })[] = [
  {
    label: 'Edit Company Profile',
    value: 'edit-profile',
    icon: 'apartment',
    href: '/dashboard/company'
  },
  {
    label: 'Bio',
    href: '/dashboard/company/bio',
    value: 'bio',
    icon: 'info'
  },
  {
    label: 'Productions',
    href: '/dashboard/company/productions',
    value: 'productions',
    icon: 'movie'
  },

  {
    label: 'DemoReel',
    href: '/dashboard/company/demoreel',
    value: 'demoreel',
    icon: 'movie'
  },
  {
    label: 'Links',
    href: '/dashboard/company/links',
    value: 'links',
    icon: 'link'
  },
  {
    label: 'Skills',
    href: '/dashboard/company/skills',
    value: 'skills',
    icon: 'code'
  },
  {
    label: 'Softwares',
    href: '/dashboard/company/softwares',
    value: 'softwares',
    icon: 'code'
  },
  {
    label: 'Address',
    href: '/dashboard/company/address',
    value: 'address',
    icon: 'map'
  },
  {
    label: 'Members',
    href: '/dashboard/company/recruiters',
    value: 'recruiters',
    icon: 'people'
  },
  {
    label: 'Company',
    href: '/dashboard/company/new',
    icon: 'apartment',
    value: 'new-company'
  },
  {
    label: 'Verification',
    href: '/dashboard/company/verification',
    value: 'verification',
    icon: 'verified'
  }
]

export default function Layout ({ children }: { children: React.ReactNode }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  return (
    <div className='flex h-full w-full flex-col'>
      <div className='flex flex-col sm:gap-4 '>
        <header className='z-30 flex md:h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
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
                  <Link href='#'>Edit Company</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className='flex flex-col justify-start items-center gap-2 w-full'>
          <div className='w-full relative'>
            <div
              className='w-full flex justify-start items-center px-3 overflow-x-auto scroller-hide'
              ref={scrollerRef}
            >
              <Tabs tabs={tabs} className='md:px-4' />
            </div>
            <Navigator
              icon='arrow_back'
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-lightAccent/50 rounded-full h-8 w-8'
              iconClassName='text-sm'
              onClick={() => scroll({ ref: scrollerRef, direction: 'left' })}
            />
            <Navigator
              icon='arrow_forward'
              className='absolute right-0 top-1/2 -translate-y-1/2 bg-lightAccent/50 rounded-full h-8 w-8'
              iconClassName='text-sm'
              onClick={() => scroll({ ref: scrollerRef, direction: 'right' })}
            />
          </div>
          <div className='w-full flex px-4'>{children}</div>
        </main>
      </div>
    </div>
  )
}
