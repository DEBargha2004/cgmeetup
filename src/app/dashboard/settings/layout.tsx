'use client'

import { Tabs } from '@/components/custom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'
import { FieldType } from '@/types/field-type'
import { IconType } from '@/types/icon'
import { Block, Notifications, Payment, Person } from '@mui/icons-material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs: (FieldType & { Icon: IconType; href: string })[] = [
  {
    label: 'General',
    href: '/dashboard/settings',
    Icon: Person,
    value: 'general'
  },
  {
    label: 'Notofications',
    href: '/dashboard/settings/notifications',
    Icon: Notifications,
    value: 'notifications'
  },
  {
    label: 'Blocking',
    href: '/dashboard/settings/blocking',
    Icon: Block,
    value: 'blocking'
  },
  {
    label: 'Payment & Account',
    href: '/dashboard/settings/payment',
    Icon: Payment,
    value: 'payment'
  }
]

export default function Layout ({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <div className='space-y-4'>
      <header
        className='z-30 hidden sm:flex md:h-14 items-center gap-4 border-b bg-background px-4 
      sm:static sm:h-auto sm:border-0 sm:bg-transparent '
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
                <Link href='#'>Settings</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className='px-4 space-y-2'>
        <div className='flex justify-start items-center'>
          <Tabs tabs={tabs} />
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
