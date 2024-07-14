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
import {
  Apartment,
  ArrowBack,
  ArrowForward,
  Info,
  Movie,
  Link as LinkIcon,
  Code,
  Map,
  People,
  Verified
} from '@mui/icons-material'
import { IconType } from '@/types/icon'

const tabs: (FieldType & { Icon: IconType; href: string })[] = [
  {
    label: 'Edit Company Profile',
    value: 'edit-profile',
    Icon: Apartment,
    href: '/dashboard/company'
  },
  {
    label: 'Bio',
    href: '/dashboard/company/bio',
    value: 'bio',
    Icon: Info
  },
  {
    label: 'Productions',
    href: '/dashboard/company/productions',
    value: 'productions',
    Icon: Movie
  },

  {
    label: 'DemoReel',
    href: '/dashboard/company/demoreel',
    value: 'demoreel',
    Icon: Movie
  },
  {
    label: 'Links',
    href: '/dashboard/company/links',
    value: 'links',
    Icon: LinkIcon
  },
  {
    label: 'Skills',
    href: '/dashboard/company/skills',
    value: 'skills',
    Icon: Code
  },
  {
    label: 'Softwares',
    href: '/dashboard/company/softwares',
    value: 'softwares',
    Icon: Code
  },
  {
    label: 'Address',
    href: '/dashboard/company/address',
    value: 'address',
    Icon: Map
  },
  {
    label: 'Members',
    href: '/dashboard/company/recruiters',
    value: 'recruiters',
    Icon: People
  },
  {
    label: 'Company',
    href: '/dashboard/company/new',
    Icon: Apartment,
    value: 'new-company'
  },
  {
    label: 'Verification',
    href: '/dashboard/company/verification',
    value: 'verification',
    Icon: Verified
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
              Icon={ArrowBack}
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-lightAccent/50 rounded-full h-8 w-8'
              iconClassName='text-sm'
              onClick={() => scroll({ ref: scrollerRef, direction: 'left' })}
            />
            <Navigator
              Icon={ArrowForward}
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
