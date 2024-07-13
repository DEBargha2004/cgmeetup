import Image from 'next/image'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import MaterialSymbolIcon from './material-symbol-icon'

export default function FeaturedNewsCard ({
  className,
  avatar
}: {
  className?: string
  avatar?: string
}) {
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
        <div className='sm:flex justify-start gap-3  w-[90%]'>
          <div className='text-slate-300 py-0 flex justify-start items-center gap-1 border-none'>
            <MaterialSymbolIcon className='text-sm'>
              favorite
            </MaterialSymbolIcon>
            <span className='text-xs'>2</span>
          </div>
          <div className='text-slate-300 py-0 flex justify-start items-center gap-1 border-none'>
            <MaterialSymbolIcon className='text-sm'>
              visibility
            </MaterialSymbolIcon>
            <span className='text-xs'>2</span>
          </div>
          <div className='text-slate-300 py-0 flex justify-start items-center gap-1 border-none'>
            <MaterialSymbolIcon className='text-sm'>message</MaterialSymbolIcon>
            <span className='text-xs'>2</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
