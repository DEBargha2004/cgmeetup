'use client'

import Image from 'next/image'
import { Card } from '../ui/card'
import { cn } from '@/lib/utils'
import {
  Favorite,
  FavoriteBorder,
  Message,
  Visibility
} from '@mui/icons-material'
import { useState } from 'react'

export default function FeaturedNewsCard ({
  className,
  avatar
}: {
  className?: string
  avatar?: string
}) {
  const [showLiked, setShowLiked] = useState(false)
  return (
    <Card
      className={cn(
        `bg-card hover:bg-darkAccent/50 transition-all flex items-stretch justify-between gap-4 w-full
      p-3`,
        className
      )}
    >
      <Image
        src={
          'https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098'
        }
        height={100}
        width={100}
        alt='job-image'
        className={cn('h-[90px] w-[160px] object-cover shrink-0', avatar)}
      />
      <div className='h-full w-full flex flex-col justify-start items-start gap-2'>
        <h1 className='text-sm font-semibold'>
          3D Character Artist, Avatars Aquent
        </h1>
        <h2 className='text-xs opacity-70 cursor-pointer hover:text-primary'>
          1 day ago
        </h2>
        <div className='flex justify-start gap-1 w-[90%]'>
          <div className='text-slate-300 py-0 flex justify-start items-center gap-1 border-none'>
            <div
              className='cursor-pointer flex items-start'
              onClick={() => setShowLiked(!showLiked)}
            >
              {showLiked ? (
                <Favorite className='h-[18px] text-red-600' />
              ) : (
                <FavoriteBorder className='h-[18px]' />
              )}
            </div>
            <span className='text-xs'>2</span>
          </div>
          <div className='text-slate-300 py-0 flex justify-start items-center gap-1 border-none'>
            <Visibility className='h-[18px]' />
            <span className='text-xs'>2</span>
          </div>
          <div className='text-slate-300 py-0 flex justify-start items-center gap-1 border-none'>
            <Message className='h-[18px]' />
            <span className='text-xs'>2</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
