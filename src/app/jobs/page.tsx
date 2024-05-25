import Link from 'next/link'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Input } from '@/components/ui/input'

import {
  JobCard,
  FeaturedJobCard,
  MaterialSymbolIcon,
  Tabs
} from '@/components/custom'
import { sample_cateories } from '@/constants/categories'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Roboto } from 'next/font/google'

const tabList = [
  { label: 'Jobs', href: '/jobs' },
  { label: 'Studios', href: '' },
  { label: 'Bookmark Jobs', href: '' },
  { label: 'Job Preferences', href: '' }
]

const roboto = Roboto({ subsets: ['cyrillic'], weight: '700' })

export default function Dashboard () {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <main className='flex flex-1 flex-col py-4 md:gap-5 md:py-12'>
        <div className='my-6 mb-0 flex flex-col justify-between items-center gap-12 text-center'>
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
                  <MaterialSymbolIcon>sort</MaterialSymbolIcon>
                  <span>Filter</span>
                </div>
              </SheetTrigger>
              <SheetContent side={'right'}></SheetContent>
            </Sheet>
          </div>
          <div>
            <Button>
              <span className='mr-2'>Find Talent</span>
              <MaterialSymbolIcon>arrow_right_alt</MaterialSymbolIcon>
            </Button>
          </div>
          <div
            className={cn(
              'w-full flex justify-start items-center gap-2 px-3',
              roboto.className
            )}
          >
            <Tabs tabs={tabList} />
          </div>
        </div>
        <div className='space-y-5'>
          <Carousel className='w-[calc(100%-75px)] mx-auto'>
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
          <div className='lg:w-[77%] mx-auto grid gap-4 md:gap-8 lg:grid-cols-3'>
            <Card
              className='xl:col-span-2 col-span-3 flex flex-col gap-4 h-fit 
    border-none bg-transparent'
            >
              <CardContent className='space-y-4 px-1'>
                <Link href={'/jobs/123'} className='inline-block w-full'>
                  <JobCard />
                </Link>
                <Link href={'/jobs/123'} className='inline-block w-full'>
                  <JobCard />
                </Link>
                <Link href={'/jobs/123'} className='inline-block w-full'>
                  <JobCard />
                </Link>
              </CardContent>
            </Card>
            <Card className='bg-transparent border-none col-span-3 xl:col-span-1'>
              <Card className='bg-transparent border-none'>
                <CardHeader className='xl:pt-0 px-0 pb-3'>
                  <CardTitle className='text-lg font-bold'>
                    Featured Jobs
                  </CardTitle>
                </CardHeader>
                <CardContent className='grid gap-4 px-0'>
                  <Link href={'/jobs/123'} className='inline-block w-full'>
                    <FeaturedJobCard />
                  </Link>
                  <Link href={'/jobs/123'} className='inline-block w-full'>
                    <FeaturedJobCard />
                  </Link>
                  <Link href={'/jobs/123'} className='inline-block w-full '>
                    <FeaturedJobCard />
                  </Link>
                  <Link href={'/jobs/123'} className='inline-block w-full'>
                    <FeaturedJobCard />
                  </Link>
                </CardContent>
              </Card>
              <Card className='bg-transparent border-none'>
                <CardHeader className='px-0'>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent className='grid grid-cols-2 gap-2 px-0'>
                  {sample_cateories.map(cat => (
                    <Button
                      variant={'outline'}
                      className='w-full rounded bg-transparent hover:bg-lightAccent 
               lg:text-sm'
                      key={cat}
                    >
                      {cat}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
