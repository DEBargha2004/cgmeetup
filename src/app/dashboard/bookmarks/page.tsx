import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import BookmarkCard from '../_components/bookmark-card'

export default function BookmarksPage () {
  return (
    <div className='flex h-full w-full flex-col'>
      <div className='flex flex-col sm:gap-4 sm:py-4 '>
        <header className=' z-30 flex md:h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
          <Breadcrumb className='hidden md:flex'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='#'>Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='#'>Bookmarks</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className='p-4 sm:px-6 sm:py-0 space-y-5'>
          <h1 className='text-2xl font-semibold'>Bookmarks</h1>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {Array.from({ length: 33 }, (_, i) => i).map((_, i) => (
              <BookmarkCard key={i} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
