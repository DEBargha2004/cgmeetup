'use client'

import { cn } from '@/lib/utils'
import { IconType } from '@/types/icon'
import {
  Bookmark,
  BookmarkBorder,
  Favorite,
  FavoriteBorder,
  Share,
  Visibility
} from '@mui/icons-material'
import { HTMLProps, useState } from 'react'

export default function PostActions () {
  const [showLiked, setShowLiked] = useState(false)
  const [showBookmarked, setShowBookmarked] = useState(false)
  return (
    <div className='flex justify-end items-center w-fit xl:gap-5 gap-3 lg:mr-5'>
      <div className='flex gap-3 xl:gap-6 items-center'>
        <div className='flex justify-between items-center gap-2'>
          <PostAction
            Icon={showLiked ? Favorite : FavoriteBorder}
            onClick={() => setShowLiked(!showLiked)}
            className={cn('cursor-pointer', showLiked ? 'text-red-600' : '')}
          />
          <span className='font-bold opacity-90'>3</span>
        </div>
        <div className='flex justify-between items-center gap-2'>
          <PostAction Icon={Visibility} />
          <span className='font-bold opacity-90'>3</span>
        </div>
      </div>
      <div className='flex gap-3 xl:gap-6 items-center'>
        <div className='flex justify-between items-center gap-2'>
          <PostAction Icon={Share} />
          <span className='font-bold opacity-90'>3</span>
        </div>
        <div className='flex justify-between items-center gap-2'>
          <PostAction
            Icon={showBookmarked ? Bookmark : BookmarkBorder}
            onClick={() => setShowBookmarked(!showBookmarked)}
            className={cn(
              'cursor-pointer',
              showBookmarked ? 'text-primary' : ''
            )}
          />
        </div>
      </div>
    </div>
  )
}

function PostAction ({
  Icon,
  className,
  ...props
}: { Icon: IconType } & HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        `flex justify-center items-center bg-lightAccent md:h-8 md:w-8 
  2xl:h-9 2xl:w-9 rounded-full h-7 w-7`,
        className
      )}
      {...props}
    >
      <Icon className='2xl:h-5 md:h-4 h-[14px]' />
    </div>
  )
}
