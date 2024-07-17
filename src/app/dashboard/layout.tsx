'use client'

import { MaterialSymbolIcon } from '@/components/custom'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { dashboardSidebar } from '@/constants/dashboard-sidebar'
import { cn } from '@/lib/utils'
import { useGlobalAppStore } from '@/store/global-app-store'
import { FormatAlignJustify, MenuOpen, MoreVert } from '@mui/icons-material'
import { AlignJustify } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

export default function Layout ({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { dashboardSidebarState, setDashboardSidebarState } =
    useGlobalAppStore()
  return (
    <main className='flex flex-row justify-start items-start h-full'>
      <Sheet
        open={dashboardSidebarState}
        onOpenChange={setDashboardSidebarState}
      >
        <SheetContent side={'left'} className='w-fit p-0 pt-10 bg-card'>
          <div
            className='lg:w-[160px] w-fit  h-full flex flex-col 
      justify-start items-start border-r p-1 gap-1 z-50 bg-card'
          >
            {dashboardSidebar.map((item, item_idx) => (
              <React.Fragment key={item_idx}>
                {item.type === 'separator' ? (
                  <div className='border-b w-full md:block hidden' />
                ) : item.type === 'header' ? (
                  <div
                    className='hidden lg:flex justify-start items-center p-2 
              text-xl font-bold shrink-0 w-full lg:max-w-[250px] rounded'
                  >
                    <h1>{item.label}</h1>
                  </div>
                ) : (
                  <Link href={item.href} className='w-full'>
                    <div
                      className={cn(
                        `flex gap-1 justify-start items-center  
                  hover:bg-lightAccent p-2 px-3  font-semibold shrink-0 rounded`,
                        (
                          item.catch_routes
                            ? item.catch_routes.includes(pathname)
                            : pathname === item.href
                        )
                          ? 'bg-primary hover:bg-primary'
                          : ''
                      )}
                    >
                      {<item.Icon />}
                      <p className='whitespace-nowrap'>{item.label}</p>
                    </div>
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <div
        className='lg:w-[180px] w-fit  h-full md:flex flex-col 
      justify-start items-start border-r p-1 gap-1 z-50 bg-card hidden overflow-y-auto scroller-hide'
      >
        {dashboardSidebar.map((item, item_idx) => (
          <React.Fragment key={item_idx}>
            {item.type === 'separator' ? (
              <div className='border-b w-full md:block hidden' />
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
                  hover:bg-lightAccent p-2 px-3  font-semibold shrink-0 rounded`,
                    (
                      item.catch_routes
                        ? item.catch_routes.includes(pathname)
                        : pathname === item.href
                    )
                      ? 'bg-primary hover:bg-primary'
                      : ''
                  )}
                >
                  {<item.Icon />}
                  <p className='lg:block hidden whitespace-nowrap'>
                    {item.label}
                  </p>
                </div>
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className='w-full h-full overflow-y-auto scroller'>
        <div className='md:hidden flex items-center justify-start gap-2 pt-4 px-4'>
          <div
            className='h-10 w-10 rounded-full grid  place-content-center bg-lightAccent/50 cursor-pointer'
            onClick={() => setDashboardSidebarState(true)}
          >
            <MenuOpen className='h-5' />
          </div>
          <span>Dashboard Menu</span>
        </div>
        {children}
      </div>
    </main>
  )
}
