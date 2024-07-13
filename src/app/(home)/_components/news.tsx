'use client'

import { useRef } from 'react'
import NewsCard from './news-card'
import { Navigator } from '@/components/custom'
import { scroll } from '@/functions/scroll'
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

export default function News () {
  const scrollerRef = useRef<HTMLDivElement>(null)

  return (
    <Carousel className=''>
      <CarouselContent className='basis-0 w-full gap-2'>
        {Array.from({ length: 21 }).map((_, i) => (
          <NewsCard key={i} className='shrink-0 select-none' />
        ))}
      </CarouselContent>
      <CarouselNext className='right-0 h-10 w-10' iconClassName='h-5 w-5' />
      <CarouselPrevious className='left-0 h-10 w-10' iconClassName='h-5 w-5' />
    </Carousel>
  )
}
