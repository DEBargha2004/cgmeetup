import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import CategorySelect from '../../_components/category-select'
import { sample_cateories } from '@/constants/categories'
import { Badge } from '@/components/ui/badge'

export default function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className='flex xs:justify-start justify-center items-center gap-10'>
        <CategorySelect />
        <Carousel className='w-[calc(100%-220px)] xs:block hidden'>
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
      {children}
    </>
  )
}
