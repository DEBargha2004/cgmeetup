import { CarouselItem } from "@/components/ui/carousel";
import { ListContainer } from "@/components/custom";
import { marketplaceCategories } from "@/constants/marketplace-categories";
import Link from "next/link";
import { getFormattedUrlFromTitle } from "@/functions/get-formatted-url-from-title";
import { v4 } from "uuid";
import {
  ListContainerCard,
  ListContainerCardsContainer,
  ListContainerTitle,
} from "@/components/custom/list-container";

const popularProducts = Array.from({ length: 35 }).map((_, i) => {
  const id = v4();
  return {
    id,
    price: "$10",
    href: `/product/${id}`,
  };
});

const freeProducts = Array.from({ length: 35 }).map((_, i) => {
  const id = v4();
  return {
    id,
    price: "",
    href: `/product/${id}`,
  };
});

const latestProducts = Array.from({ length: 35 }).map((_, i) => {
  const id = v4();
  return {
    id,
    price: "$10",
    href: `/product/${id}`,
  };
});

export default function MarketplacePage() {
  return (
    <div className="p-2 space-y-10">
      <ListContainer className="w-full">
        <ListContainerTitle className="flex justify-between items-baseline">
          Popular Products
          <Link href={``}>
            <span className="text-sm text-primary">More</span>
          </Link>
        </ListContainerTitle>

        <ListContainerCardsContainer>
          {popularProducts.map((p) => (
            <CarouselItem key={p.id} className="basis-auto">
              <ListContainerCard
                className=""
                price={p.price}
                href={p.href}
                id={p.id}
              />
            </CarouselItem>
          ))}
        </ListContainerCardsContainer>
      </ListContainer>
      <ListContainer className="w-full">
        <ListContainerTitle className="flex justify-between items-baseline">
          Free Products
          <Link href={``}>
            <span className="text-sm text-primary">More</span>
          </Link>
        </ListContainerTitle>
        <ListContainerCardsContainer>
          {freeProducts.map((p) => (
            <CarouselItem key={p.id} className="basis-auto">
              <ListContainerCard
                className=""
                price={p.price}
                href={p.href}
                id={p.id}
              />
            </CarouselItem>
          ))}
        </ListContainerCardsContainer>
      </ListContainer>
      <ListContainer className="w-full">
        <ListContainerTitle className="flex justify-between items-baseline">
          Latest Products
          <Link href={``}>
            <span className="text-sm text-primary">More</span>
          </Link>
        </ListContainerTitle>
        <ListContainerCardsContainer>
          {latestProducts.map((p) => (
            <CarouselItem key={p.id} className="basis-auto">
              <ListContainerCard
                className=""
                price={p.price}
                href={p.href}
                id={p.id}
              />
            </CarouselItem>
          ))}
        </ListContainerCardsContainer>
      </ListContainer>
      {marketplaceCategories.slice(0, 3).map((category, cat_idx) => (
        <ListContainer className="w-full" key={cat_idx}>
          <ListContainerTitle className="flex justify-between items-baseline">
            {category.title}
            <Link href={`/product/${getFormattedUrlFromTitle(category.title)}`}>
              <span className="text-sm text-primary">More</span>
            </Link>
          </ListContainerTitle>
          <ListContainerCardsContainer>
            {latestProducts.map((p) => (
              <CarouselItem key={p.id} className="basis-auto">
                <ListContainerCard
                  className=""
                  price={p.price}
                  href={p.href}
                  id={p.id}
                />
              </CarouselItem>
            ))}
          </ListContainerCardsContainer>
        </ListContainer>
      ))}
    </div>
  );
}
