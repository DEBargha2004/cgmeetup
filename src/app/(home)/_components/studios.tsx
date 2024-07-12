'use client'

import { useRef } from 'react'
import Navigator from '../../../components/custom/navigator'
import Link from 'next/link'
import StudioCard from './studio-card'

export default function Studios () {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    const scroller = scrollerRef.current
    if (scroller) {
      if (direction === 'left') {
        scroller.scrollTo({
          left: scroller.scrollLeft - 400,
          behavior: 'smooth'
        })
      } else {
        scroller.scrollTo({
          left: scroller.scrollLeft + 400,
          behavior: 'smooth'
        })
      }
    }
  }
  return (
    <div className='space-y-2 px-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl'>Studios</h1>
        <Link href='#'>
          <p className='text-sm text-primary'>View More</p>
        </Link>
      </div>
      <div className='relative'>
        <div
          className='w-full overflow-x-auto flex justify-start items-center gap-3 scroller-hide relative'
          ref={scrollerRef}
        >
          {Array.from({ length: 21 }).map((_, i) => (
            <StudioCard key={i} className='shrink-0' />
          ))}
        </div>
        <Navigator
          icon='chevron_left'
          className='rounded-full absolute top-1/2 -translate-y-1/2 left-0 bg-lightAccent/50 hover:bg-lightAccent/90'
          onClick={() => scroll('left')}
        />
        <Navigator
          icon='chevron_right'
          className='rounded-full absolute top-1/2 -translate-y-1/2 right-0 bg-lightAccent/50 hover:bg-lightAccent/90'
          onClick={() => scroll('right')}
        />
      </div>
    </div>
  )
}
