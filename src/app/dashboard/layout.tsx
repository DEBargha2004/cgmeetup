'use client'

import { MaterialSymbolIcon } from '@/components/custom'
import { dashboardSidebar } from '@/constants/dashboard-sidebar'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Layout ({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <main className='flex md:flex-row flex-col-reverse justify-start items-start h-full'>
      <div
        className='lg:w-[160px] md:w-fit w-full h-fit md:h-full flex md:flex-col flex-row 
      justify-start items-start border-r p-1 gap-1 z-50 bg-card'
      >
        {dashboardSidebar.map((item, item_idx) => (
          <React.Fragment key={item_idx}>
            {item.type === 'separator' ? (
              <div className='border-b w-full' />
            ) : item.type === 'header' ? (
              <div
                className='hidden lg:flex justify-start items-center p-2 
              text-xl font-bold shrink-0 w-full lg:max-w-[250px] rounded'
              >
                <h1>{item.label}</h1>
              </div>
            ) : (
              <Link href={item.href} className='w-full lg:max-w-[250px]'>
                <div
                  className={cn(
                    `flex justify-center lg:gap-1 lg:justify-start items-center  
                  hover:bg-lightAccent p-2 px-3 font-semibold shrink-0 rounded`,
                    (
                      item.catch_routes
                        ? item.catch_routes.includes(pathname)
                        : pathname === item.href
                    )
                      ? 'bg-primary hover:bg-primary'
                      : ''
                  )}
                >
                  <MaterialSymbolIcon className=''>
                    {item.icon_name || ''}
                  </MaterialSymbolIcon>
                  <p className='lg:block hidden whitespace-nowrap'>
                    {item.label}
                  </p>
                </div>
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className='lg:w-[calc(100%-160px)] w-full md:h-full h-[calc(100%-52px)] overflow-y-auto scroller'>
        {children}
      </div>
    </main>
  )
}
