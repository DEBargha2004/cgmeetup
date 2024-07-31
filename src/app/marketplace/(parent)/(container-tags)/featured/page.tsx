import { CarouselItem } from '@/components/ui/carousel'
import ListContainer from '../../../_components/list-container'
import { sample_cateories } from '@/constants/categories'
import { cn } from '@/lib/utils'

export default function MarketplaceFeaturedPage () {
  return (
    <div className='p-2 space-y-10'>
      <ListContainer className='w-full'>
        <ListContainer.Title>Popular Products</ListContainer.Title>
        <ListContainer.CardsContainer>
          {Array.from({ length: 35 }).map((_, i) => (
            <CarouselItem key={i} className='basis-auto'>
              <ListContainer.Card className='' price='$10' />
            </CarouselItem>
          ))}
        </ListContainer.CardsContainer>
      </ListContainer>
      <ListContainer className='w-full'>
        <ListContainer.Title>Free Products</ListContainer.Title>
        <ListContainer.CardsContainer>
          {Array.from({ length: 35 }).map((_, i) => (
            <CarouselItem key={i} className='basis-auto'>
              <ListContainer.Card className='' />
            </CarouselItem>
          ))}
        </ListContainer.CardsContainer>
      </ListContainer>
      <ListContainer className='w-full'>
        <ListContainer.Title>Latest Products</ListContainer.Title>
        <ListContainer.CardsContainer>
          {Array.from({ length: 35 }).map((_, i) => (
            <CarouselItem key={i} className='basis-auto'>
              <ListContainer.Card className='' price='$10' />
            </CarouselItem>
          ))}
        </ListContainer.CardsContainer>
      </ListContainer>

      <ListContainer>
        <ListContainer.Title>Categories</ListContainer.Title>
        <div className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2'>
          {sample_cateories.map((item, i) => (
            <div
              className={cn(
                'grid place-content-center py-4 rounded-md cursor-pointer',
                ' bg-lightAccent/60 cursor-pointer hover:bg-lightAccent transition-all'
              )}
              key={i}
            >
              <p>{item}</p>
            </div>
          ))}
        </div>
      </ListContainer>
    </div>
  )
}
