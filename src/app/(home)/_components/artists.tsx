import ProfileCard from './profile-card'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

export default function Artists () {
  return (
    <div className='space-y-2 px-4 xs:block hidden'>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl'>Top Artists</h1>
        <Link href='#'>
          <p className='text-sm text-primary'>View More</p>
        </Link>
      </div>
      <Carousel className=''>
        <CarouselContent className='basis-0 w-full gap-2'>
          {Array.from({ length: 21 }).map((_, i) => (
            <ProfileCard key={i} className='shrink-0' />
          ))}
        </CarouselContent>
        <CarouselNext className='right-0 h-10 w-10' iconClassName='h-5 w-5' />
        <CarouselPrevious
          className='left-0 h-10 w-10'
          iconClassName='h-5 w-5'
        />
      </Carousel>
    </div>
  )
}
