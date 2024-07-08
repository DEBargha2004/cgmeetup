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
    <>
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
            <EllipsisVertical className='h-5 w-5 sm:h-fit sm:w-fit' />
          </div>
          <p className='text-xs sm:text-sm'>Ubisoft</p>
          <p className='text-xs sm:text-sm text-muted-foreground'>
            Luna Morphie - HR
          </p>
        </div>
      </div>
      <Separator className='bg-border' />
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
          <div className='flex gap-2 flex-wrap'>
            <Badge className='text-[10px] sm:text-sm'>1-3 Years</Badge>
            <Badge className='text-[10px] sm:text-sm'>Graduation/Diploma</Badge>
          </div>
        </div>
      </div>
    </>
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
    <Carousel className={cn('border rounded ', className)}>
      <CarouselContent className='space-x-2 px-4'>{children}</CarouselContent>
      <CarouselNext className='hidden sm:flex right-4 bg-darkAccent ' />
      <CarouselPrevious className='hidden sm:flex left-4 bg-darkAccent ' />
    </Carousel>
  )
}
