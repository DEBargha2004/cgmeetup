'use client'

import {
  AccordionItemChildWrapper,
  ClearButton,
  MaterialSymbolIcon,
  Tabs
} from '@/components/custom'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button, ButtonProps } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { sample_cateories } from '@/constants/categories'
import {
  expertise_level,
  industry,
  job_type,
  location,
  medium,
  tags
} from '@/constants/job-filters'
import { cn } from '@/lib/utils'
import { TabItem } from '@/types/tab'
import { Search } from 'lucide-react'
import { Roboto } from 'next/font/google'
import { useState } from 'react'

const tabList1: TabItem[] = [
  { label: 'News', href: '/news', icon: 'work' },
  {
    label: 'Trending',
    href: '/news/trending',
    icon: 'trending_up'
  },
  {
    label: 'Latest',
    href: '/news/latest',
    icon: 'schedule'
  }

  // { label: 'Studios', href: '/jobs/studios', icon: 'apartment' },
]

const roboto = Roboto({ subsets: ['cyrillic'], weight: '700' })

export default function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <main className='flex flex-1 flex-col py-4 md:gap-0 md:py-12'>
        <div className='my-6 mb-16 flex flex-col justify-between items-center gap-12 text-center'>
          <div className='space-y-4'>
            <h1
              className={cn(
                'text-4xl md:text-[52px] font-bold',
                roboto.className
              )}
            >
              News
            </h1>
            <p className='text-lg md:text-xl'>
              Daily News for VFX, Animations, Video Game, Concept Art, Digital
              Art, TV & Flim, Software. and more.
            </p>
          </div>
          <div className='w-3/4 md:w-3/5 lg:w-2/5 relative flex justify-between items-center gap-2'>
            <Input className='pl-10' placeholder='Search' />
            <Search className='absolute left-2 top-1/2 -translate-y-1/2' />
          </div>
        </div>
        <div className='space-y-2'>
          <div
            className={cn(
              'w-full flex justify-center items-center gap-0 ',
              roboto.className
            )}
          >
            <div className='flex justify-start items-center'>
              <Tabs tabs={tabList1} />
            </div>
            {/* <div className='flex justify-end items-center'>
              <Tabs tabs={tabList2} />
            </div> */}
          </div>
          <section className='flex justify-start items-center gap-10 px-2'>
            <Popover>
              <PopoverTrigger asChild>
                <Button className='bg-lightAccent'>Categories</Button>
              </PopoverTrigger>
              <PopoverContent
                side='right'
                className='space-y-4 bg-lightAccent rounded-sm'
              >
                <Input className='h-[37px] w-full' />
                <div className='h-[300px] overflow-y-auto scroller space-y-2 w-[260px]'>
                  {['All', ...sample_cateories].map(item => (
                    <div
                      key={item}
                      className={cn(
                        'h-10 bg-darkAccent flex justify-center items-center text-sm cursor-pointer rounded-sm',
                        item === 'All' ? 'bg-primary' : ''
                      )}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Carousel className='w-[calc(100%-180px)]'>
              <CarouselContent className=''>
                {sample_cateories.map((cat, index) => (
                  <CarouselItem className='basis-auto' key={cat}>
                    <Badge className='text-sm bg-lightAccent'>{cat}</Badge>
                  </CarouselItem>
                ))}
                {sample_cateories.map((cat, index) => (
                  <CarouselItem className='basis-auto' key={cat}>
                    <Badge className='bg-lightAccent'>{cat}</Badge>
                  </CarouselItem>
                ))}
                {sample_cateories.map((cat, index) => (
                  <CarouselItem className='basis-auto' key={cat}>
                    <Badge className='bg-lightAccent'>{cat}</Badge>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext className='-translate-x-3' />
              <CarouselPrevious className='translate-x-3' />
            </Carousel>
          </section>
          {children}
        </div>
      </main>
    </div>
  )
}
