import { ImageCollection } from '@/components/custom/gallery'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { sample_cateories } from '@/constants/categories'
import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export default function GalleryPage () {
  return (
    <div className='space-y-3 '>
      <section className='flex justify-start items-center gap-10 px-2'>
        <Popover>
          <PopoverTrigger asChild>
            <Button className='bg-lightAccent'>All Channels</Button>
          </PopoverTrigger>
          <PopoverContent
            side='right'
            className='space-y-4 bg-lightAccent rounded-sm'
          >
            <Input className='h-[37px] w-full' />
            <div className='h-[300px] overflow-y-auto scroller space-y-2 w-[260px]'>
              {['All', ...sample_cateories].map(item => (
                <div
                  key={item}
                  className={cn(
                    'h-10 bg-darkAccent flex justify-center items-center text-sm cursor-pointer rounded-sm',
                    item === 'All' ? 'bg-primary' : ''
                  )}
                >
                  {item}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <Carousel className='w-[calc(100%-190px)]'>
          <CarouselContent className=''>
            {sample_cateories.map((cat, index) => (
              <CarouselItem className='basis-auto' key={cat}>
                <Badge className='text-sm bg-lightAccent'>{cat}</Badge>
              </CarouselItem>
            ))}
            {sample_cateories.map((cat, index) => (
              <CarouselItem className='basis-auto' key={cat}>
                <Badge className='bg-lightAccent'>{cat}</Badge>
              </CarouselItem>
            ))}
            {sample_cateories.map((cat, index) => (
              <CarouselItem className='basis-auto' key={cat}>
                <Badge className='bg-lightAccent'>{cat}</Badge>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className='-translate-x-3' />
          <CarouselPrevious className='translate-x-3' />
        </Carousel>
      </section>
      <ImageCollection imageScale={false} />
    </div>
  )
}
