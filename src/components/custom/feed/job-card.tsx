import { Badge } from '@/components/ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Bookmark, EllipsisVertical } from 'lucide-react'
import Image from 'next/image'

export default function JobCard ({ className }: { className?: string }) {
  return (
    <CarouselItem
      className={cn(
        'basis-[100%] sm:basis-[90%] flex flex-col gap-3 justify-between items-start bg-lightAccent p-2 rounded',
        className
      )}
    >
      <div className='flex justify-start items-start gap-3 w-full'>
        <Image
          src={
            'https://cdna.artstation.com/p/assets/images/images/011/495/326/20181028174133/smaller_square/filippo-ubertino-driverzero1.jpg?1540766493'
          }
          alt='job-image'
          height={100}
          width={100}
          className='rounded h-20 w-20 object-cover'
        />
        <div className='w-full space-y-1'>
          <div className='flex justify-between items-center'>
            <h1 className='text-sm sm:text-lg font-semibold leading-6'>
              Senior 2D Concept Game Artist
            </h1>
            <EllipsisVertical />
          </div>
          <p className='text-xs sm:text-sm'>Ubisoft</p>
          <p className='text-xs sm:text-sm text-muted-foreground'>
            Luna Morphie - HR
          </p>
        </div>
      </div>
      <Separator className=' bg-muted-foreground' />
      <div className='w-full space-y-2'>
        <div className='flex justify-between items-start'>
          <div className='text-xs sm:text-sm text-muted-foreground'>
            <p>IT : Fullstack</p>
            <p>Pune,Maharastra</p>
          </div>
          <div>
            <Bookmark />
          </div>
        </div>
        <div className='space-y-1'>
          <p className='text-primary text-xs sm:text-sm'>USD 5k - 7k</p>
          <div className='flex gap-2'>
            <Badge>1-3 Years</Badge>
            <Badge>Graduation/Diploma</Badge>
          </div>
        </div>
      </div>
    </CarouselItem>
  )
}

export function JobCardContainer ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Carousel className={cn('border rounded p-4', className)}>
      <CarouselContent className='space-x-2 px-4'>{children}</CarouselContent>
      {/* <CarouselNext className='hidden sm:flex -right-9' />
      <CarouselPrevious className='hidden sm:flex -left-9' /> */}
    </Carousel>
  )
}
