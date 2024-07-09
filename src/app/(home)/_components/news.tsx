'use client'

import { useRef } from 'react'
import NewsCard from './news-card'
import Navigator from './navigator'

export default function News () {
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
        icon='chevron_left'
        className='rounded-full absolute top-1/2 -translate-y-1/2 left-2 bg-lightAccent/50 hover:bg-lightAccent/90'
        onClick={() => scroll('left')}
      />
      <Navigator
        icon='chevron_right'
        className='rounded-full absolute top-1/2 -translate-y-1/2 right-2 bg-lightAccent/50 hover:bg-lightAccent/90'
        onClick={() => scroll('right')}
      />
    </div>
  )
}
