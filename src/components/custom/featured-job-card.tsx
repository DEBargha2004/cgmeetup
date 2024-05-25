import Image from 'next/image'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function FeaturedJobCard ({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        `bg-lightAccent flex items-stretch justify-between gap-4 w-full
      p-3 h-full`,
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
        className='h-[100px] w-[100px] object-cover rounded-lg'
      />
      <div className='h-full w-full flex flex-col justify-between items-start'>
        <h1 className='text-sm font-semibold'>
          3D Character Artist, Avatars Aquent
        </h1>
        <Badge className='text-xs'>
          <MapPin className='mr-2 h-5 w-5' />
          <span className='text-xs'>Los Angeles, USA</span>
        </Badge>
      </div>
    </Card>
  )
}
