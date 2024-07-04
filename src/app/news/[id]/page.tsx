import {
  FeaturedNewsCard,
  MaterialSymbolIcon,
  ProfileInfoOverView,
  RichTextEditor,
  SimilarNewsCard
} from '@/components/custom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Card, CardContent } from '@/components/ui/card'
import { getShortendName } from '@/functions'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { HTMLProps } from 'react'
import avatar from '@/../public/images/profile-1.jpg'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function NewsPage ({
  params: { id }
}: {
  params: { id: string }
}) {
  return (
    <div className='lg:w-[77%] mx-auto grid gap-4 md:gap-8 lg:grid-cols-3'>
      <div className='col-span-2 px-2'>
        <header className='z-30 flex md:h-14 items-center gap-4 border-b bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent'>
          <Breadcrumb className='hidden md:flex'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='#'>News</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='#'>Maya Female Character 3D Modelling</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div>
          <h1 className='text-2xl'>Maya Female Character 3D Modelling</h1>
        </div>
      </div>

      <Card
        className='xl:col-span-2 col-span-3 flex flex-col gap-4 h-fit 
border-none bg-transparent'
      >
        <CardContent className='space-y-2 px-2'>
          <div className='flex justify-between items-center border-b pb-2'>
            <div className='flex justify-start gap-3 items-center'>
              <PostHeaderOptions icon='thumb_up' label='0' />
              <PostHeaderOptions icon='visibility' label='0' />
              <PostHeaderOptions icon='comment' label='0' />
              <PostHeaderOptions icon='schedule' label='40m' />
            </div>
            <div className='flex justify-start gap-3 items-center'>
              <PostHeaderOptions icon='bookmark' label='Bookmark' />
              <PostHeaderOptions icon='share' label='Share' />
            </div>
          </div>
          <div className='border-b pb-2'>
            <RichTextEditor />
          </div>
          <div className='border-b pb-2'>
            <ProfileInfoOverView className=''>
              <div className='shrink-0 w-8 h-8 rounded-full grid place-content-center bg-primary cursor-pointer'>
                <MaterialSymbolIcon className='text-sm'>
                  person_add
                </MaterialSymbolIcon>
              </div>
            </ProfileInfoOverView>
          </div>
          <div className='space-y-3'>
            <p>0 Comments</p>
            <div className='flex justify-start items-start gap-4'>
              <div>
                <Avatar className='h-12 w-12 rounded-full'>
                  <AvatarImage src={avatar.src} />
                  <AvatarFallback>{getShortendName('John Doe')}</AvatarFallback>
                </Avatar>
              </div>
              <div className='space-y-3 w-full'>
                <p>Your Comments Can Make Someone's Day More bright..!!!</p>
                <div className='flex justify-start items-center gap-3'>
                  stars
                </div>
                <div className='flex flex-col justify-start items-end gap-3'>
                  <Textarea className='w-full' rows={6} />
                  <Button className='h-8 '>Submit</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className='bg-transparent border-none col-span-3 xl:col-span-1'>
        <Card className='bg-transparent border-none'>
          <CardContent className='grid gap-4 px-1'>
            {Array.from({ length: 5 }, (_, i) => i).map(i => (
              <FeaturedNewsCard key={i} />
            ))}
          </CardContent>
        </Card>
      </Card>
      {/* <div className='col-span-3 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 pb-10'>
        {Array.from({ length: 4 }, (_, i) => i).map(i => (
          <Card key={i}>
            <SimilarNewsCard />
          </Card>
        ))}
      </div> */}
    </div>
  )
}

function PostHeaderOptions ({
  icon,
  label,
  className,
  ...props
}: { icon: string; label: string } & HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn('flex justify-between items-center gap-1', className)}
      {...props}
    >
      <MaterialSymbolIcon className=''>{icon}</MaterialSymbolIcon>
      <p className='text-sm'>{label}</p>
    </div>
  )
}
