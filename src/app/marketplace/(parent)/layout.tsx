'use client'

import { ScrollControlContainer, Tabs } from '@/components/custom'
import { cn } from '@/lib/utils'
import { TabItem } from '@/types/tab'
import { Search } from 'lucide-react'
import { Roboto } from 'next/font/google'

import Image from 'next/image'
import background from '@/../public/images/cover-image.jpg'
import {
  FeaturedVideo,
  Schedule,
  Store,
  Subject,
  TrendingUp
} from '@mui/icons-material'
import { Input } from '@/components/ui/input'

const tabList1: TabItem[] = [
  { label: 'Marketplace', href: '/marketplace', Icon: Store },
  {
    label: 'Trending',
    href: '/marketplace/trending',
    Icon: TrendingUp
  },
  {
    label: 'Featured',
    Icon: FeaturedVideo,
    href: '/marketplace/featured'
  },
  {
    label: 'Latest',
    href: '/marketplace/latest',
    Icon: Schedule
  },
  {
    label: 'Categories',
    href: '/marketplace/categories',
    Icon: Subject
  }
  // { label: 'Studios', href: '/jobs/studios', icon: 'apartment' },
]

const roboto = Roboto({ subsets: ['cyrillic'], weight: '700' })

export default function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <ScrollControlContainer>
      <div className='flex  w-full flex-col'>
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
                  Free Downloads, Buy & Sell Marketplace
                </h1>
                <p className='text-lg md:text-xl'>
                  for 3D Models, 3D Charactor Rigs , Materials & Shaders,
                  Textures and more
                </p>
              </div>
              <div className='w-3/4 md:w-3/5 lg:w-2/5 relative flex justify-between items-center gap-2'>
                <Input className='pl-10' placeholder='Search' />
                <Search className='absolute left-2 top-1/2 -translate-y-1/2' />
              </div>
              <div className='h-10' />
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
          <div className='space-y-2 px-2'>
            <div
              className={cn(
                'w-full flex justify-center items-center gap-3 mb-5',
                roboto.className
              )}
            >
              <div className='flex justify-start items-center'>
                <Tabs tabs={tabList1} />
              </div>
            </div>
            {children}
          </div>
        </main>
      </div>
    </ScrollControlContainer>
  )
}
