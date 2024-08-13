import { Badge } from "@/components/ui/badge";
import { marketplaceCategories } from "@/constants/marketplace-categories";
import { getFormattedIdFromTitle } from "@/functions/get-formatted-id-from-title";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FilterWrapper } from "../_components/filter";
import { v4 } from "uuid";
import {
  ListContainerCard,
  ListContainerCardsContainer,
} from "@/components/custom/list-container";

const products = Array.from({ length: 35 }).map((_, i) => {
  const id = v4();
  return {
    id,
    price: "$10",
    href: `/product/${id}`,
  };
});

export default function Page({ params: { cat } }: { params: { cat: string } }) {
  cat = decodeURIComponent(cat);

  const category = marketplaceCategories.find(
    (category) => getFormattedIdFromTitle(category.title) === cat,
  );
  if (!category) notFound();

  return (
    <div className="p-3 space-y-4">
      <div className="space-y-2">
        <h1 className="lg:text-2xl sm:text-lg text-base">{category.title}</h1>
        <p className="text-sm opacity-70">{category.description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.subcategories.map((subcategory) => (
          <Link
            key={subcategory}
            href={`/marketplace/${getFormattedIdFromTitle(
              category.title,
            )}/${getFormattedIdFromTitle(subcategory)}`}
            className="text-sm text-gray-400 hover:text-primary"
          >
            <Badge className="bg-lightAccent p-2 px-3 hover:text-primary transition-all">
              {subcategory}
            </Badge>
          </Link>
        ))}
      </div>
      <FilterWrapper />
      <ListContainerCardsContainer>
        {products.map((product) => (
          <ListContainerCard
            className="w-full md:w-full"
            price={product.price}
            key={product.id}
            href={product.href}
            id={product.id}
          />
        ))}
      </ListContainerCardsContainer>
    </div>
  );
}
