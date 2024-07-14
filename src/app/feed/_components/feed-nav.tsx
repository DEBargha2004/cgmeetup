import { MaterialSymbolIcon } from '@/components/custom'
import { feedNavItems } from '@/constants/feed-nav'
import Link from 'next/link'
import React from 'react'

export default function FeedNav () {
  return feedNavItems.map((item, item_idx) => (
    <React.Fragment key={item_idx}>
      {item.type === 'separator' ? (
        <div className='py-2' />
      ) : item.type === 'header' ? (
        <div
          className='hidden lg:flex justify-start items-center rounded p-2 
            text-xl font-bold shrink-0 w-full max-w-[200px]'
        >
          <h1>{item.label}</h1>
        </div>
      ) : (
        <Link href={item.href} className='w-full max-w-[200px]'>
          <div
            className='flex justify-center lg:gap-2 lg:justify-start items-center rounded 
                hover:bg-lightAccent p-2 font-semibold shrink-0'
          >
            <item.Icon />
            <p className='lg:block hidden'>{item.label}</p>
          </div>
        </Link>
      )}
    </React.Fragment>
  ))
}
