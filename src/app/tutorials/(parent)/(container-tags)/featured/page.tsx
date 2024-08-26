import { v4 } from "uuid";
import { ListContainerCardsContainer } from "@/components/custom/list-container";
import { TutorialsCard } from "@/components/custom/tutorials-list-container";

const products = Array.from({ length: 35 }).map((_, i) => {
  const id = v4();
  return {
    id,
    price: "$10",
    href: `/tutorials/${id}`
  };
});

export default function MarketplaceTrendingPage() {
  return (
    <ListContainerCardsContainer>
      {products.map((product) => (
        <TutorialsCard
          className=""
          price={product.price}
          key={product.id}
          href={product.href}
          id={product.id}
        />
      ))}
    </ListContainerCardsContainer>
  );
}
