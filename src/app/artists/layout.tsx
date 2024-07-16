import { Tabs } from '@/components/custom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { TabItem } from '@/types/tab'
import { Search } from 'lucide-react'
import { Roboto } from 'next/font/google'
import Filter from './_components/filter'
import Image from 'next/image'
import background from '@/../public/images/cover-image.jpg'
import { Bookmark, Person, Sort } from '@mui/icons-material'

const tabList1: TabItem[] = [
  {
    label: 'Artists',
    href: '/artists',
    Icon: Person
  }
  // {
  //   label: 'Trending',
  //   href: '/artists/trending',
  //   icon: 'trending_up'
  // },
  // {
  //   label: 'Latest',
  //   href: '/artists/latest',
  //   icon: 'schedule'
  // }
]

const tabList2: TabItem[] = [
  {
    label: 'Bookmarks',
    href: '/dashboard/bookmarks',
    Icon: Bookmark
  }
]

const roboto = Roboto({ subsets: ['cyrillic'], weight: '700' })

export default function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='flex min-h-screen w-full flex-col'>
        <main className='flex flex-1 flex-col md:gap-1'>
          <div className='relative md:pt-12'>
            <div className='my-6 mb-10 flex flex-col justify-between items-center gap-12 text-center'>
              <div className='space-y-4'>
                <h1 className='text-4xl md:text-[52px] font-bold'>
                  Find World Talented Artist
                </h1>
                <p className='text-lg md:text-xl'>
                  for Concept Artists , Visual Effect Artsts, and Digital
                  Artists.
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
                    className='bg-card overflow-y-auto scroller-hide pt-10'
                  >
                    <Filter />
                  </SheetContent>
                </Sheet>
              </div>
              <div>
                <Button>
                  <Person className='mr-2' />
                  <span>Create Profile</span>
                </Button>
              </div>
            </div>
            <div
              className='absolute w-full h-full top-0 left-0 object-cover -z-10 
            '
            >
              <Image
                src={background}
                alt='background'
                className='w-full h-full object-cover -z-20'
              />
              <div className='absolute w-full h-3/4 top-1/4 left-0 bg-gradient-to-t from-black/80 to-transparent' />
            </div>
          </div>
          <div className='space-y-2'>
            <div
              className={cn(
                'w-full flex lg:justify-between justify-start items-center gap-0',
                roboto.className
              )}
            >
              <div className='flex justify-start items-center'>
                <Tabs tabs={tabList1} />
              </div>
              <div className='flex justify-start items-center'>
                <Tabs tabs={tabList2} />
              </div>
            </div>
            {children}
          </div>
        </main>
      </div>
    </>
  )
}
