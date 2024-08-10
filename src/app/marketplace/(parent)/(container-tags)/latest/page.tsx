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

export default function MarketplaceTrendingPage() {
  return (
    <div className="p-2 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
      {products.map((product) => (
        <ListContainerCard
          className=""
          price={product.price}
          key={product.id}
          href={product.href}
          id={product.id}
        />
      ))}
    </div>
  );
}
