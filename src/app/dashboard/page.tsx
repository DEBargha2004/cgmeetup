import Link from 'next/link'
import { Activity, CreditCard, DollarSign, Users } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Overview } from './_components/overview'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {
  Chat,
  Comment,
  Favorite,
  People,
  Visibility
} from '@mui/icons-material'
import LatestSectionContainer from '@/components/custom/feed/latest-section-container'
import Image from 'next/image'
import { getShortendName } from '@/functions'
import postimage from '@/../public/images/dog-vertical.webp'
import profile from '@/../public/images/profile-1.jpg'

export default function Dashboard () {
  return (
    <div className='flex h-full w-full flex-col'>
      <header
        className='z-30 sm:flex md:h-14 items-center gap-4 border-b bg-background px-4 
      sm:static hidden sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 my-5 '
      >
        <Breadcrumb className='hidden md:flex'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='#'>Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
          <Card x-chunk='dashboard-01-chunk-0' className='bg-card'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Views</CardTitle>
              <Visibility fontSize='small' className='opacity-60' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$45,231.89</div>
              <p className='text-xs text-muted-foreground'>
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk='dashboard-01-chunk-1' className='bg-card'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Followers</CardTitle>
              <People fontSize='small' className='opacity-60' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+2350</div>
              <p className='text-xs text-muted-foreground'>
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk='dashboard-01-chunk-2' className='bg-card'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Likes</CardTitle>
              <Favorite fontSize='small' className='opacity-60' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+12,234</div>
              <p className='text-xs text-muted-foreground'>
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk='dashboard-01-chunk-3' className='bg-card'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Comments</CardTitle>
              <Comment fontSize='small' className='opacity-60' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+573</div>
              <p className='text-xs text-muted-foreground'>
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
          <Card
            className='xl:col-span-2 bg-card'
            x-chunk='dashboard-01-chunk-4'
          >
            <CardHeader className='flex flex-row items-center'>
              <div className='grid gap-2'>
                <CardTitle className='text-xl'>Overview</CardTitle>
              </div>
            </CardHeader>
            <CardContent className='xs:px-3 px-0'>
              <Overview />
            </CardContent>
          </Card>
          <Card x-chunk='dashboard-01-chunk-5' className=' bg-card'>
            <CardHeader>
              <CardTitle className='text-xl'>Recent Comments</CardTitle>
            </CardHeader>
            <CardContent className='grid gap-8'>
              {Array.from({ length: 6 }).map((_, i) => (
                <LatestSectionContainer.Item
                  key={i}
                  className='flex justify-between items-start gap-4 '
                >
                  <Avatar className='h-12 w-12 shrink-0 sm:flex hidden'>
                    <AvatarImage src={profile.src} />
                    <AvatarFallback>
                      {getShortendName('John Doe')}
                    </AvatarFallback>
                  </Avatar>
                  <div className='space-y-1 w-full'>
                    <div className='line-clamp-3 text-sm'>
                      <strong className='cursor-pointer hover:text-primary'>
                        Moon Hynters:
                      </strong>
                      &nbsp;
                      <span className='opacity-70'>
                        Abs commented on Cyberpunk Car Concept art by Alex
                      </span>
                    </div>
                    <div className='flex justify-start items-center gap-2 opacity-70'>
                      <Chat fontSize='small' />
                      <span>3</span>
                    </div>
                  </div>
                  <div className='h-12 w-12 rounded-md overflow-hidden shrink-0'>
                    <Image
                      src={postimage}
                      alt='post'
                      height={80}
                      width={80}
                      className='h-full w-full object-cover'
                    />
                  </div>
                </LatestSectionContainer.Item>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
