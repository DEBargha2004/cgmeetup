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
import { cn } from '@/lib/utils'
import { TabItem } from '@/types/tab'
import { Search } from 'lucide-react'
import { Roboto } from 'next/font/google'
import { useState } from 'react'
import Filter from '../_components/filter'
import Link from 'next/link'
import Image from 'next/image'
import background from '@/../public/images/cover-image.jpg'
import CategorySelect from '../_components/category-select'
import {
  Apartment,
  ArrowRightAlt,
  EmojiEvents,
  FeaturedPlayList,
  FeaturedVideo,
  Schedule,
  Sort,
  TrendingUp,
  Work
} from '@mui/icons-material'

const tabList1: TabItem[] = [
  { label: 'Jobs', href: '/jobs', Icon: Work },
  {
    label: 'Trending',
    href: '/jobs/trending',
    Icon: TrendingUp
  },
  {
    label: 'Featured',
    Icon: FeaturedVideo,
    href: '/jobs/featured'
  },
  {
    label: 'Latest',
    href: '/jobs/latest',
    Icon: Schedule
  }
  // { label: 'Studios', href: '/jobs/studios', icon: 'apartment' },
]

// const tabList2: TabItem[] = [
//   { label: 'Bookmarks', href: '/dashboard/bookmarks', icon: 'bookmark' },
//   {
//     label: 'Job Preferences',
//     href: '/dashboard/job-preference',
//     icon: 'manage_accounts'
//   }
// ]

const roboto = Roboto({ subsets: ['cyrillic'], weight: '700' })

export default function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <main className='flex flex-1 flex-col md:gap-1'>
        <div className='relative md:pt-12'>
          <div className='my-6 mb-10 flex flex-col justify-between items-center gap-12 text-center'>
            <div className='space-y-4'>
              <h1
                className={cn(
                  'text-4xl md:text-[52px] font-bold',
                  roboto.className
                )}
              >
                Jobs
              </h1>
              <p className='text-lg md:text-xl'>
                Find your VFX Jobs , Animations Jobs, Video Game Jobs, TV & Flim
                Jobs, Software Jobs and more
              </p>
            </div>
            <div className='w-3/4 md:w-3/5 lg:w-2/5 relative flex justify-between items-center gap-2'>
              <Input className='pl-10' placeholder='Search' />
              <Search className='absolute left-2 top-1/2 -translate-y-1/2' />

              <Sheet>
                <SheetTrigger asChild>
                  <div className='flex items-center gap-1 cursor-pointer'>
                    <Sort />
                    <span>Filter</span>
                  </div>
                </SheetTrigger>
                <SheetContent
                  side={'right'}
                  className='bg-card overflow-y-auto scroller-hide'
                >
                  <div className=' space-y-3'>
                    <Filter />
                    <div className='flex justify-end'>
                      <Button className='ml-auto'>Reset</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className='flex gap-2'>
              <Link href={'/companies'}>
                <Button variant={'secondary'} className=''>
                  <Apartment />
                  <span className='ml-2'>Studios</span>
                </Button>
              </Link>
              <Link href={'/dashboard/jobs'}>
                <Button>
                  <span className='mr-2'>Find Talent</span>
                  <ArrowRightAlt />
                </Button>
              </Link>
            </div>
          </div>
          <div className='absolute w-full h-full top-0 left-0 object-cover -z-10 '>
            <Image
              src={background}
              alt='background'
              className='w-full h-full object-cover  -z-20'
            />
            <div className='absolute w-full h-3/4 top-1/4 left-0 bg-gradient-to-t from-black/80 to-transparent' />
          </div>
        </div>
        <div className='space-y-2'>
          <div
            className={cn(
              'w-full flex justify-center items-center gap-3',
              roboto.className
            )}
          >
            <div className='flex justify-start items-center'>
              <Tabs tabs={tabList1} />
            </div>
          </div>
          <section className='flex xs:justify-start justify-center items-center gap-10 px-2'>
            <CategorySelect />
            <Carousel className='w-[calc(100%-220px)] xs:block hidden'>
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
