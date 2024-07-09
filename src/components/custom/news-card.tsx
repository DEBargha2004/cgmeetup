import Image from 'next/image'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { Briefcase, Globe, MapPin, Plane } from 'lucide-react'
import MaterialSymbolIcon from './material-symbol-icon'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import Link from 'next/link'

export default function NewsCard ({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        `bg-card grid grid-cols-4 gap-x-3 gap-y-2 w-full
    p-3 pb-3 md:pb-3 relative`,
        className
      )}
    >
      <div className='col-span-4 flex gap-x-4'>
        <Image
          src={
            'https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098'
          }
          height={200}
          width={200}
          alt='job-image'
          className='md:h-[146px] md:w-[260px] h-[100px] w-[100px] object-cover shrink-0'
        />
        <div className='space-y-2 w-full'>
          <div className='text-lg md:text-xl font-semibold flex justify-between items-center'>
            <Link href={'/news/123'}>
              <h1 className='text-lg md:text-xl font-semibold'>
                The Autodesk Showreel 2024
              </h1>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <MaterialSymbolIcon className='inline-block cursor-pointer'>
                  more_vert
                </MaterialSymbolIcon>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'></DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className='text-slate-200 opacity-70 line-clamp-2 text-sm w-[calc(100%-20px)]'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
          </p>
          <div className='flex justify-start items-center gap-2'>
            <p className='text-xs text-slate-200 hover:text-primary opacity-70 cursor-pointer w-fit'>
              @Ubisoft
            </p>
            <p className='text-xs opacity-70'>1 day ago</p>
          </div>
          <div className='sm:flex justify-end hidden gap-3'>
            <div className='sm:flex justify-end gap-3  w-[90%]'>
              <div className='text-slate-300 py-0 flex justify-start items-center gap-1 border-none'>
                <MaterialSymbolIcon className='text-sm'>
                  favorite
                </MaterialSymbolIcon>
                <span className='text-sm'>2</span>
              </div>
              <div className='text-slate-300 py-0 flex justify-start items-center gap-1 border-none'>
                <MaterialSymbolIcon className='text-sm'>
                  visibility
                </MaterialSymbolIcon>
                <span className='text-sm'>2</span>
              </div>
              <div className='text-slate-300 py-0 flex justify-start items-center gap-1 border-none'>
                <MaterialSymbolIcon className='text-sm'>
                  message
                </MaterialSymbolIcon>
                <span className='text-sm'>2</span>
              </div>
            </div>
            <div className='flex items-end'>
              <MaterialSymbolIcon className='opacity-100'>
                bookmark
              </MaterialSymbolIcon>
            </div>
          </div>
        </div>
      </div>
      <div className='flex  gap-2 sm:hidden col-span-4'>
        <div className='flex gap-2 flex-wrap'>
          <Badge className='text-slate-300'>
            <Globe className='mr-2 h-5 w-5' />
            Remote
          </Badge>
          <Badge className='text-slate-300'>
            <MaterialSymbolIcon className='mr-2'>work</MaterialSymbolIcon>
            Permanent
          </Badge>
          <Badge className='text-slate-300'>
            <Plane className='mr-2 h-5 w-5' />
            Relocation Asssistance
          </Badge>
          <Badge className='text-slate-300'>
            <MapPin className='mr-2 h-5 w-5' />
            Montreal, Canada
          </Badge>
        </div>
        <div className='flex items-end'>
          <MaterialSymbolIcon className='opacity-100'>
            bookmark
          </MaterialSymbolIcon>
        </div>
      </div>
    </Card>
  )
}
