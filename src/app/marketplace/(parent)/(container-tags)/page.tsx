import { CarouselItem } from '@/components/ui/carousel'
import ListContainer from '../../_components/list-container'
import { marketplaceCategories } from '@/constants/marketplace-categories'
import Link from 'next/link'
import { getFormattedUrlFromTitle } from '@/functions/get-formatted-url-from-title'
import { v4 } from 'uuid'

export default function MarketplacePage () {
  return (
    <div className='p-2 space-y-10'>
      <ListContainer className='w-full'>
        <ListContainer.Title className='flex justify-between items-baseline'>
          Popular Products
          <Link href={``}>
            <span className='text-sm text-primary'>More</span>
          </Link>
        </ListContainer.Title>

        <ListContainer.CardsContainer>
          {Array.from({ length: 35 }).map((_, i) => (
            <CarouselItem key={i} className='basis-auto'>
              <ListContainer.Card
                className=''
                price='$10'
                href={`/marketplace/product/${v4()}`}
              />
            </CarouselItem>
          ))}
        </ListContainer.CardsContainer>
      </ListContainer>
      <ListContainer className='w-full'>
        <ListContainer.Title className='flex justify-between items-baseline'>
          Free Products
          <Link href={``}>
            <span className='text-sm text-primary'>More</span>
          </Link>
        </ListContainer.Title>
        <ListContainer.CardsContainer>
          {Array.from({ length: 35 }).map((_, i) => (
            <CarouselItem key={i} className='basis-auto'>
              <ListContainer.Card
                className=''
                href={`/marketplace/product/${v4()}`}
              />
            </CarouselItem>
          ))}
        </ListContainer.CardsContainer>
      </ListContainer>
      <ListContainer className='w-full'>
        <ListContainer.Title className='flex justify-between items-baseline'>
          Latest Products
          <Link href={``}>
            <span className='text-sm text-primary'>More</span>
          </Link>
        </ListContainer.Title>
        <ListContainer.CardsContainer>
          {Array.from({ length: 35 }).map((_, i) => (
            <CarouselItem key={i} className='basis-auto'>
              <ListContainer.Card
                className=''
                price='$10'
                href={`/marketplace/product/${v4()}`}
              />
            </CarouselItem>
          ))}
        </ListContainer.CardsContainer>
      </ListContainer>
      {marketplaceCategories.slice(0, 3).map((category, cat_idx) => (
        <ListContainer className='w-full' key={cat_idx}>
          <ListContainer.Title className='flex justify-between items-baseline'>
            {category.title}
            <Link
              href={`/marketplace/product/${getFormattedUrlFromTitle(
                category.title
              )}`}
            >
              <span className='text-sm text-primary'>More</span>
            </Link>
          </ListContainer.Title>
          <ListContainer.CardsContainer>
            {Array.from({ length: 35 }).map((_, i) => (
              <CarouselItem key={i} className='basis-auto'>
                <ListContainer.Card
                  className=''
                  price='$10'
                  href={`/marketplace/product/${v4()}`}
                />
              </CarouselItem>
            ))}
          </ListContainer.CardsContainer>
        </ListContainer>
      ))}
    </div>
  )
}
