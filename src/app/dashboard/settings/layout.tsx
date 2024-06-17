'use client'

import { cn } from '@/lib/utils'
import { FieldType } from '@/types/field-type'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs: (FieldType & { icon: string; href: string })[] = [
  {
    label: 'General',
    href: '/dashboard/settings',
    icon: 'person',
    value: 'general'
  },
  {
    label: 'Notofications',
    href: '/dashboard/settings/notifications',
    icon: 'notifications',
    value: 'notifications'
  },
  {
    label: 'Blocking',
    href: '/dashboard/settings/blocking',
    icon: 'block',
    value: 'blocking'
  },
  {
    label: 'Payment & Account',
    href: '/dashboard/settings/payment',
    icon: 'payment',
    value: 'payment'
  }
]

export default function Layout ({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <div className='p-5 space-y-4'>
      <div className='flex justify-start items-center'>
        {tabs.map((tab, tab_idx) => (
          <Link href={tab.href} key={tab_idx}>
            <div
              key={tab_idx}
              className={cn(
                `h-10 bg-lightAccent/60 hover:bg-lightAccent transition-all 
              px-10 py-4 flex justify-center items-center text-sm border-r border-r-darkAccent 
              last:border-r-none`,
                pathname === tab.href
                  ? 'border-b-2 border-b-primary bg-lightAccent'
                  : ''
              )}
            >
              {tab.label}
            </div>
          </Link>
        ))}
      </div>
      <div>{children}</div>
    </div>
  )
}
