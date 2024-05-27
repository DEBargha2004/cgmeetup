'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Tabs ({
  tabs,
  className
}: {
  tabs: { label: string; href: string }[]
  className?: string
}) {
  const pathname = usePathname()
  return (
    <>
      {tabs.map((tab, index) => (
        <Link key={index} href={tab.href}>
          <div
            className={cn(
              'md:px-4 px-2 py-2 hover:bg-lightAccent cursor-pointer whitespace-nowrap md:text-base sm:text-sm text-xs',
              pathname === tab.href
                ? 'border-b-2 border-primary md:text-lg sm:text-base text-sm'
                : '',
              className
            )}
          >
            {tab.label}
          </div>
        </Link>
      ))}
    </>
  )
}
