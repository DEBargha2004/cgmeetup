'use client'

import LatestSectionContainer from '@/components/custom/feed/latest-section-container'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import profile from '@/../public/images/profile-1.jpg'
import { getShortendName } from '@/functions'
import Image from 'next/image'
import { MaterialSymbolIcon } from '@/components/custom'
import postimage from '@/../public/images/dog-vertical.webp'
import { cn } from '@/lib/utils'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { useState } from 'react'
export default function LatestLikes ({ className }: { className?: string }) {
  return (
    <LatestSectionContainer className={cn('border', className)}>
      <LatestSectionContainer.Title>Latest Likes</LatestSectionContainer.Title>
      <LatestSectionContainer.ItemsContainer className='space-y-4'>
        {Array.from({ length: 6 }).map((_, i) => (
          <PostItem key={i} />
        ))}
      </LatestSectionContainer.ItemsContainer>
    </LatestSectionContainer>
  )
}

function PostItem () {
  const [showLikes, setShowLikes] = useState(false)
  return (
    <LatestSectionContainer.Item className='flex justify-between items-start gap-4'>
      <Avatar>
        <AvatarImage src={profile.src} />
        <AvatarFallback>{getShortendName('John Doe')}</AvatarFallback>
      </Avatar>
      <div className='space-y-1'>
        <div className='line-clamp-3 text-sm'>
          <strong className='cursor-pointer hover:text-primary'>
            Moon Hynters:
          </strong>
          &nbsp;
          <span className='opacity-70'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </span>
        </div>
        <div className='flex justify-start items-center gap-2'>
          <div
            className='flex items-start cursor-pointer'
            onClick={() => setShowLikes(!showLikes)}
          >
            {showLikes ? (
              <Favorite fontSize='small' className='text-red-600' />
            ) : (
              <FavoriteBorder fontSize='small' />
            )}
          </div>
          <span className='opacity-70'>3</span>
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
  )
}
