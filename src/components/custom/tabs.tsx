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
              'px-4 py-2 hover:bg-lightAccent cursor-pointer',
              pathname === tab.href ? 'border-b-2 border-primary text-lg' : '',
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
