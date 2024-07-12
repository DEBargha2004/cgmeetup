'use client'

import { useRef } from 'react'
import NewsCard from './news-card'
import { Navigator } from '@/components/custom'
import { scroll } from '@/functions/scroll'

export default function News () {
  const scrollerRef = useRef<HTMLDivElement>(null)

  return (
    <div className='relative px-4'>
      <div
        className='w-full overflow-x-auto flex justify-start items-center gap-4 scroller-hide relative'
        ref={scrollerRef}
      >
        {Array.from({ length: 21 }).map((_, i) => (
          <NewsCard key={i} className='shrink-0' />
        ))}
      </div>
      <Navigator
        icon='arrow_back_ios'
        className='rounded-full absolute top-1/2 -translate-y-1/2 left-2 bg-lightAccent/50 hover:bg-lightAccent/90'
        onClick={() => scroll({ ref: scrollerRef, direction: 'left' })}
      />
      <Navigator
        icon='arrow_forward_ios'
        className='rounded-full absolute top-1/2 -translate-y-1/2 right-2 bg-lightAccent/50 hover:bg-lightAccent/90'
        onClick={() => scroll({ ref: scrollerRef, direction: 'right' })}
      />
    </div>
  )
}
