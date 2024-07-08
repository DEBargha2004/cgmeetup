import { ProfileAvatarStatus } from '@/components/custom/feed'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

export default function ProfileCarousel () {
  return (
    <Carousel className='w-full'>
      <CarouselContent className='mt-4'>
        {Array.from({ length: 19 }, (_, i) => i).map(i => (
          <CarouselItem key={i} className='basis-auto'>
            <ProfileAvatarStatus
              className='select-none cursor-pointer '
              avatar='bg-gradient-to-tr from-primary to-white p-[2px] h-14 w-14'
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className='-translate-x-10 bg-transparent' />
      <CarouselPrevious className='translate-x-10 bg-transparent' />
    </Carousel>
  )
}
