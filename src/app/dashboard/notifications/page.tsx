import {
  NotificationCardOtherView,
  NotificationCardProfileView
} from '@/components/custom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import Link from 'next/link'

export default function NotificationsPage () {
  return (
    <div className='flex h-full w-full flex-col'>
      <div className='flex flex-col sm:gap-4'>
        <header
          className='z-30 flex md:h-14 items-center gap-4  bg-background px-4 
        sm:static sm:h-auto  sm:bg-transparent sm:px-6'
        >
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
                  <Link href='#'>Notifications</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className='px-4 md:w-3/5 lg:w-2/5 grid gap-4 mx-auto'>
          <h1 className='text-xl font-semibold '>Notifications</h1>
          <div className='space-y-3'>
            {Array.from({ length: 21 }, (_, i) => i).map(i =>
              Math.floor(Math.random() * 2) ? (
                <NotificationCardOtherView key={i} />
              ) : (
                <NotificationCardProfileView key={i} />
              )
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
