import Image from 'next/image'
import { Card } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { Briefcase, Globe, MapPin, Plane } from 'lucide-react'
import MaterialSymbolIcon from '../material-symbol-icon'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '../../ui/dropdown-menu'

export default function UserInfoProfile ({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        `bg-transparent grid grid-cols-4 gap-x-3 gap-y-2 w-full
    p-3 pb-3 md:pb-3 relative`,
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
          className=' h-[100px] w-[100px] object-cover rounded-full'
        />
        <div className='space-y-2 w-full'>
          <div className='text-lg md:text-xl font-semibold flex justify-between items-center'>
            <h1 className='text-lg md:text-xl font-semibold'>Samuel Disuoza</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <MaterialSymbolIcon className='inline-block cursor-pointer'>
                  more_vert
                </MaterialSymbolIcon>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'></DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className='text-slate-200 opacity-70'>3D Modeller</p>
          <p className='text-sm text-slate-200'>3 - 5 Years / USD $50 - 59</p>
          <UserAbout
            icon='work'
            description='Aug 2023 - Present'
            title='Adroit data 3D Artist'
          />
          <div className='flex justify-between gap-3'>
            <Badge className='text-slate-300 py-0'>
              <MaterialSymbolIcon className='mr-2 text-base'>
                location_on
              </MaterialSymbolIcon>
              Montreal, Canada
            </Badge>
            <div className='flex items-end'>
              <MaterialSymbolIcon className='opacity-100'>
                bookmark
              </MaterialSymbolIcon>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='flex  gap-2 sm:hidden col-span-4'>
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
      </div> */}
    </Card>
  )
}

function UserAbout ({
  className,
  description,
  icon,
  title
}: {
  className?: string
  icon: string
  title: string
  description: string
}) {
  return (
    <div className={cn('flex justify-start items-start gap-2', className)}>
      <div className='flex justify-start items-center gap-2'>
        <MaterialSymbolIcon>{icon}</MaterialSymbolIcon>
      </div>
      <div className='flex justify-start gap-2 items-center'>
        <h1 className='text-lg font-semibold'>{title}</h1>
        <p className='text-sm'>| {description}</p>
      </div>
    </div>
  )
}
