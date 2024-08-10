"use client";

import { Badge } from "@/components/ui/badge";
import { marketplaceCategories } from "@/constants/marketplace-categories";
import { getFormattedUrlFromTitle } from "@/functions/get-formatted-url-from-title";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Filter } from "../_components/filter";
import { useState } from "react";
import { cn } from "@/lib/utils";
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

export default function Page({ params: { cat } }: { params: { cat: string } }) {
  const category = marketplaceCategories.find(
    (category) => getFormattedUrlFromTitle(category.title) === cat,
  );
  if (!category) notFound();

  const [showFilter, setShowFilter] = useState(true);

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
            href={`/product/${getFormattedUrlFromTitle(
              category.title,
            )}/${getFormattedUrlFromTitle(subcategory)}`}
            className="text-sm text-gray-400 hover:text-primary"
          >
            <Badge className="bg-lightAccent p-2 px-3 hover:text-primary transition-all">
              {subcategory}
            </Badge>
          </Link>
        ))}
      </div>
      <div className="grid gap-2">
        <Badge
          className="ml-auto cursor-pointer"
          onClick={() => setShowFilter(!showFilter)}
        >
          {showFilter ? "Hide" : "Show"} Filter
        </Badge>
        <div className="p-5 border rounded-md bg-card/60 w-full overflow-x-auto scroller-x">
          <Filter className={cn("", showFilter ? "" : "hidden")} />
        </div>
      </div>
      <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
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
