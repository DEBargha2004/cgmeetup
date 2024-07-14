import {
  FeaturedNewsCard,
  MaterialSymbolIcon,
  ProfileInfoOverView
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
import { EditorContentComponent } from '@/components/custom/editor'
import {
  Bookmark,
  Comment,
  PersonAdd,
  Schedule,
  Share,
  ThumbUp,
  Visibility
} from '@mui/icons-material'
import { IconType } from '@/types/icon'

const content = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  <img src="" alt=""/>`

export default function NewsPage ({
  params: { id }
}: {
  params: { id: string }
}) {
  return (
    <div className='lg:w-[77%] mx-auto grid gap-4 md:gap-8 lg:grid-cols-3 px-3'>
      <div className='col-span-2 px-2 md:pt-0 pt-4'>
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
              <PostHeaderOptions Icon={ThumbUp} label='0' />
              <PostHeaderOptions Icon={Visibility} label='0' />
              <PostHeaderOptions Icon={Comment} label='0' />
              <PostHeaderOptions Icon={Schedule} label='40m' />
            </div>
            <div className='flex justify-start gap-3 items-center'>
              <PostHeaderOptions
                Icon={Bookmark}
                label='Bookmark'
                labelClassName='sm:block hidden'
              />
              <PostHeaderOptions
                Icon={Share}
                label='Share'
                labelClassName='sm:block hidden'
              />
            </div>
          </div>
          <div className='border-b pb-2'>
            <EditorContentComponent content={content} />
          </div>
          <div className='border-b pb-2'>
            <ProfileInfoOverView className=''>
              <div className='shrink-0 w-8 h-8 rounded-full grid place-content-center bg-primary cursor-pointer'>
                <PersonAdd className='h-[14px]' />
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
    </div>
  )
}

function PostHeaderOptions ({
  Icon,
  label,
  className,
  labelClassName,
  ...props
}: {
  Icon: IconType
  label: string
  labelClassName?: string
} & HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn('flex justify-between items-center gap-1', className)}
      {...props}
    >
      <Icon />
      <p className={cn('text-sm', labelClassName)}>{label}</p>
    </div>
  )
}
