import { MaterialSymbolIcon } from '@/components/custom'
import { dashboardSidebar } from '@/constants/dashboard-sidebar'
import Link from 'next/link'
import React from 'react'

export default function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex justify-start items-start h-full'>
      <div className='w-[140px] bg-red-500 h-full'>
        {dashboardSidebar.map((item, item_idx) => (
          <React.Fragment key={item_idx}>
            {item.type === 'separator' ? (
              <div className='py-2' />
            ) : item.type === 'header' ? (
              <div
                className='hidden lg:flex justify-start items-center rounded p-2 
              text-xl font-bold shrink-0 w-full max-w-[250px]'
              >
                <h1>{item.label}</h1>
              </div>
            ) : (
              <Link href={item.href} className='w-full max-w-[250px]'>
                <div
                  className='flex justify-center lg:gap-2 lg:justify-start items-center rounded 
                  hover:bg-lightAccent p-2 font-semibold shrink-0'
                >
                  <MaterialSymbolIcon className=''>
                    {item.icon_name || ''}
                  </MaterialSymbolIcon>
                  <p className='lg:block hidden'>{item.label}</p>
                </div>
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className='w-[calc(100%-140px)] bg-green-500 h-full'>{children}</div>
    </main>
  )
}
