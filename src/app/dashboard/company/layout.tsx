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
import { FieldType } from '@/types/field-type'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs: (FieldType & { icon: string; href: string })[] = [
  {
    label: 'Edit Company Profile',
    value: 'edit-profile',
    icon: 'apartment',
    href: '/dashboard/company'
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
  const pathname = usePathname()

  return (
    <div className='flex h-full w-full flex-col'>
      <div className='flex flex-col sm:gap-4 sm:py-4 '>
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
        <main className='flex flex-col justify-start items-center gap-10 w-full'>
          <div className='w-full flex justify-center items-center gap-3 px-3'>
            <Tabs value={pathname}>
              <TabsList>
                {tabs.map(tab => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.href}
                    className='border-r border-darkAccent last:border-none rounded'
                  >
                    <Link href={tab.href} className='flex items-center'>
                      <MaterialSymbolIcon className='mr-1 text-[16px] opacity-100'>
                        {tab.icon}
                      </MaterialSymbolIcon>
                      <span className='lg:inline hidden'>{tab.label}</span>
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
