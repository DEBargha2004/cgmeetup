import {
  MaterialSymbolIcon,
  ScrollControlContainer,
  Tabs
} from '@/components/custom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
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
import Filter from './_components/filter'
import Link from 'next/link'
import background from '@/../public/images/cover-image.jpg'
import Image from 'next/image'

const tabList1: TabItem[] = [
  {
    label: 'Community',
    href: '/gallery',
    icon: 'language'
  },
  {
    label: 'Trending',
    href: '/gallery/trending',
    icon: 'trending_up'
  },
  {
    label: 'Featured',
    icon: 'featured_play_list',
    href: '/gallery/featured'
  },
  {
    label: 'Latest',
    href: '/gallery/latest',
    icon: 'schedule'
  }
]

const roboto = Roboto({ subsets: ['cyrillic'], weight: '700' })

export default function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <ScrollControlContainer>
      <div className='flex min-h-screen w-full flex-col'>
        <main className='flex flex-1 flex-col md:gap-0 '>
          <div className='relative md:pt-12'>
            <div className='my-6 mb-10 flex flex-col justify-between items-center gap-12 text-center'>
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
                  <SheetContent side={'right'} className='bg-lightAccent'>
                    <div className=' space-y-3'>
                      <Filter />
                      <div className='flex justify-end'>
                        <Button className='ml-auto'>Reset</Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              <div>
                <Link href={'/artists'}>
                  <Button>
                    <MaterialSymbolIcon className='mr-2'>
                      person
                    </MaterialSymbolIcon>
                    <span>Find Artist</span>
                  </Button>
                </Link>
              </div>
            </div>
            <div
              className='absolute w-full h-full top-0 left-0 object-cover -z-10 
            '
            >
              <Image
                src={background}
                alt='background'
                className='w-full h-full object-cover opacity-40 -z-20'
              />
              <div className='absolute w-full h-full top-0 left-0 z-10 bg-gradient-to-t from-black/60 to-transparent' />
            </div>
          </div>
          <div className='space-y-2'>
            <div
              className={cn(
                'w-full flex justify-center items-center gap-0',
                roboto.className
              )}
            >
              <div className='flex justify-start items-center'>
                <Tabs tabs={tabList1} />
              </div>
            </div>
            <section className='flex justify-start items-center gap-10 px-2'>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className='bg-lightAccent'>
                    <MaterialSymbolIcon className='mr-2 opacity-100'>
                      explore
                    </MaterialSymbolIcon>
                    All Category
                  </Button>
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
              <Carousel className='w-[calc(100%-210px)]'>
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
    </ScrollControlContainer>
  )
}
