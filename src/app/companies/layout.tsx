import { MaterialSymbolIcon, Tabs } from '@/components/custom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { TabItem } from '@/types/tab'
import { Search } from 'lucide-react'
import { Roboto } from 'next/font/google'
import Filter from './_components/filter'

const tabList1: TabItem[] = [
  {
    label: 'Companies',
    href: '/companies',
    icon: 'apartment'
  },
  {
    label: 'Trending',
    href: '/companies/trending',
    icon: 'trending_up'
  },
  {
    label: 'Latest',
    href: '/companies/latest',
    icon: 'schedule'
  }
]

const tabList2: TabItem[] = [
  {
    label: 'Bookmarks',
    href: '/dashboard/bookmarks',
    icon: 'bookmark'
  }
]

const roboto = Roboto({ subsets: ['cyrillic'], weight: '700' })

export default function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='flex min-h-screen w-full flex-col'>
        <main className='flex flex-1 flex-col py-4 md:gap-0 md:py-12'>
          <div className='my-6 flex flex-col justify-between items-center gap-12 text-center'>
            <div className='space-y-4'>
              <h1 className='text-4xl md:text-[52px] font-bold'>
                Find Studios & Schools
              </h1>
              <p className='text-lg md:text-xl'>
                3D Animation, Visual Effects, Game Studios
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
                  className='bg-card overflow-y-auto scroller-hide pt-10'
                >
                  <Filter />
                </SheetContent>
              </Sheet>
            </div>
            <div>
              <Button>
                <MaterialSymbolIcon className='mr-2'>person</MaterialSymbolIcon>
                <span>Create Profile</span>
              </Button>
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
