import { getShortendName } from '@/functions'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import profile from '@/../public/images/profile-1.jpg'
import post from '@/../public/images/dog-vertical.webp'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function NotificationCard ({
  postImageClassName
}: {
  postImageClassName?: string
}) {
  return (
    <div className='flex justify-start items-center gap-4'>
      <Avatar className='h-10 w-10 border-2 border-white'>
        <AvatarImage src={profile.src} />
        <AvatarFallback>{getShortendName('John Doe')}</AvatarFallback>
      </Avatar>
      <div className='w-full  gap-2 text-wrap'>
        <span className='text-sm font-semibold'>Sandeep Reddy Lorem</span>
        &nbsp;
        <span className='text-xs font-semibold'>liked your post</span>
        &nbsp;
        <span className='text-xs opacity-70'>1 day ago</span>
      </div>
      <Image
        src={post}
        alt='post'
        height={100}
        width={100}
        className={cn('h-10 w-10 shrink-0 object-cover', postImageClassName)}
      />
    </div>
  )
}
