'use client'

import Image from 'next/image'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import {
  Bookmark,
  BookmarkBorder,
  Flight,
  Language,
  LocationOn,
  MoreVert,
  Public,
  Work
} from '@mui/icons-material'
import { useState } from 'react'
import Link from 'next/link'

export default function JobCard ({ className }: { className?: string }) {
  const [showBookmarked, setShowBookmarked] = useState(false)
  return (
    <Card
      className={cn(
        `bg-card hover:bg-darkAccent/70 transition-all grid grid-cols-4 gap-x-3 gap-y-2 w-full
    p-3 pb-3 md:pb-3 relative @container`,
        className
      )}
    >
      <div className='col-span-4 flex gap-x-4'>
        <Image
          src={
            'https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098'
          }
          height={100}
          width={100}
          alt='job-image'
          className='md:h-[150px] md:w-[150px] h-[100px] w-[100px] object-cover rounded-sm'
        />
        <div className='space-y-2 w-full'>
          <div className='  flex justify-between items-center'>
            <Link href={'/jobs/123'}>
              <h1 className='text-lg md:text-xl font-semibold'>
                Team Lead Animator [FAR CRY Project]
              </h1>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <MoreVert className='cursor-pointer' />
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'></DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className='text-slate-200 opacity-70'>Ubisoft Toronto</p>
          <p className='text-sm text-slate-200'>3 - 5 Years / USD $50 - 59</p>
          <div className='@lg:flex justify-between hidden'>
            <div className='@lg:flex flex-wrap gap-2  w-[90%]'>
              <Badge className='text-slate-300 '>
                <Language className='mr-2' fontSize='small' />
                Remote
              </Badge>
              <Badge className='text-slate-300 '>
                <Work className='mr-2' fontSize='small' />
                Permanent
              </Badge>
              <Badge className='text-slate-300 '>
                <Flight className='mr-2' fontSize='small' />
                Relocation
              </Badge>
              <Badge className='text-slate-300 '>
                <LocationOn className='mr-2' fontSize='small' />
                Montreal, Canada
              </Badge>
            </div>
            <div className='flex items-end'>
              <div
                onClick={() => setShowBookmarked(!showBookmarked)}
                className='cursor-pointer'
              >
                {showBookmarked ? (
                  <Bookmark className='text-primary' />
                ) : (
                  <BookmarkBorder />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex  gap-2 @lg:hidden col-span-4'>
        <div className='flex gap-2 flex-wrap'>
          <Badge className='text-slate-300'>
            <Public className='mr-2 h-5 opacity-70' fontSize='small' />
            <span>Remote</span>
          </Badge>
          <Badge className='text-slate-300'>
            <Work className='mr-2 h-5 opacity-70' fontSize='small' />
            <span>Permanent</span>
          </Badge>
          <Badge className='text-slate-300'>
            <Flight className='mr-2 h-5 opacity-70' fontSize='small' />
            <span>Relocation</span>
          </Badge>
          <Badge className='text-slate-300'>
            <LocationOn className='mr-2 h-5 opacity-70' fontSize='small' />
            <span>Montreal, Canada</span>
          </Badge>
        </div>
        <div className='flex items-end'>
          <div
            onClick={() => setShowBookmarked(!showBookmarked)}
            className='cursor-pointer'
          >
            {showBookmarked ? (
              <Bookmark className='text-primary' />
            ) : (
              <BookmarkBorder />
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
