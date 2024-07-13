import Image from 'next/image'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import MaterialSymbolIcon from './material-symbol-icon'

export default function FeaturedJobCard ({
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
        className={cn('h-[100px] w-[100px] object-cover rounded', avatar)}
      />
      <div className='h-full w-full flex flex-col justify-between items-start space-y-2'>
        <h1 className='text-sm font-semibold'>
          3D Character Artist, Avatars Aquent
        </h1>
        <h2 className='text-xs opacity-70'>Ubisoft Studio</h2>
        <Badge className='text-xs space-x-1 border-none px-0'>
          <MaterialSymbolIcon classID='mr-2'>location_on</MaterialSymbolIcon>
          <span className='text-xs opacity-70'>Los Angeles, USA</span>
        </Badge>
      </div>
    </Card>
  )
}
