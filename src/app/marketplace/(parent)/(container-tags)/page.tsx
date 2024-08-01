import { CarouselItem } from '@/components/ui/carousel'
import ListContainer from '../../_components/list-container'
import { sample_cateories } from '@/constants/categories'
import { cn } from '@/lib/utils'
import { marketplaceCategories } from '@/constants/marketplace-categories'

export default function MarketplacePage () {
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
      {marketplaceCategories.slice(0, 3).map((category, cat_idx) => (
        <ListContainer className='w-full' key={cat_idx}>
          <ListContainer.Title>{category.title}</ListContainer.Title>
          <ListContainer.CardsContainer>
            {Array.from({ length: 35 }).map((_, i) => (
              <CarouselItem key={i} className='basis-auto'>
                <ListContainer.Card className='' price='$10' />
              </CarouselItem>
            ))}
          </ListContainer.CardsContainer>
        </ListContainer>
      ))}
    </div>
  )
}
