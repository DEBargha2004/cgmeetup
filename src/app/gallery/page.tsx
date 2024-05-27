import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { ImageCollection } from '@/components/custom/gallery'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { sample_cateories } from '@/constants/categories'
import { Badge } from '@/components/ui/badge'
import { MaterialSymbolIcon, Tabs } from '@/components/custom'
import { cn } from '@/lib/utils'
import { Roboto } from 'next/font/google'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const tabList = [
  { label: 'Community', href: '/gallery' },
  { label: 'Artists', href: '' },
  { label: 'Bookmarked', href: '' }
]

const roboto = Roboto({ subsets: ['cyrillic'], weight: '700' })

export default function GalleryPage () {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <main className='flex flex-1 flex-col py-4 md:gap-0 md:py-12'>
        <div className='my-6 flex flex-col justify-between items-center gap-12 text-center'>
          <div className='space-y-4'>
            <h1 className='text-4xl md:text-[52px] font-bold'>
              Showcase & Discover Creative Work
            </h1>
            <p className='text-lg md:text-xl'>
              for Concept Art , Visual Effects , Short Films and more.
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
              <SheetContent
                side={'right'}
                className='bg-lightAccent'
              ></SheetContent>
            </Sheet>
          </div>
          <div
            className={cn(
              'w-full flex justify-start items-center gap-0 pl-3',
              roboto.className
            )}
          >
            <Tabs tabs={tabList} />
          </div>
        </div>
        <div className='space-y-3'>
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
          <ImageCollection imageScale={false} />
        </div>
      </main>
    </div>
  )
}
