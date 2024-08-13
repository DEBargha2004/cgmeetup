import { marketplaceCategories } from "@/constants/marketplace-categories";
import { getFormattedIdFromTitle } from "@/functions/get-formatted-id-from-title";
import { notFound } from "next/navigation";
import { FilterWrapper } from "../../_components/filter";
import { v4 } from "uuid";
import { ListContainerCard } from "@/components/custom/list-container";

const products = Array.from({ length: 35 }).map((_, i) => {
  const id = v4();
  return {
    id,
    price: "$10",
    href: `/product/${id}`,
  };
});

export default function Page({
  params: { cat, subcat },
}: {
  params: { cat: string; subcat: string };
}) {
  cat = decodeURIComponent(cat);
  subcat = decodeURIComponent(subcat);
  const category = marketplaceCategories.find(
    (category) => getFormattedIdFromTitle(category.title) === cat,
  );
  const subCategory = category?.subcategories?.find(
    (sub) => getFormattedIdFromTitle(sub) === subcat,
  );
  console.log(category, subCategory, subcat);
  if (!subCategory) notFound();

  return (
    <div className="p-3 space-y-4">
      <div className="space-y-2">
        <h1 className="lg:text-2xl sm:text-lg text-base">{subCategory}</h1>
      </div>
      <FilterWrapper />
      <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 gap-3">
        {products.map((product) => (
          <ListContainerCard
            className="w-full md:w-full"
            price={product.price}
            key={product.id}
            href={product.href}
            id={product.id}
          />
        ))}
      </div>
    </div>
  );
}
