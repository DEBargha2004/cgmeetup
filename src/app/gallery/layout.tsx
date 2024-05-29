import { MaterialSymbolIcon, Tabs } from '@/components/custom'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { TabItem } from '@/types/tab'
import { Search } from 'lucide-react'
import { Roboto } from 'next/font/google'

const tabList: TabItem[] = [
  {
    label: 'Community',
    href: '/gallery/community',
    icon: 'language'
  },
  {
    label: 'Trending',
    href: '',
    icon: 'trending_up'
  },
  {
    label: 'Latest',
    href: '',
    icon: 'schedule'
  },
  {
    label: 'Artists',
    href: '/gallery/artists',
    icon: 'group'
  },
  {
    label: 'Bookmarked',
    href: '/gallery/bookmarked',
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
          {children}
        </main>
      </div>
    </>
  )
}