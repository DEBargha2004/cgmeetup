import { ListContainer } from "@/components/custom";
import {
  ListContainerCardsContainer,
  ListContainerTitle
} from "@/components/custom/list-container";
import {
  InstructorCard,
  TutorialsCard
} from "@/components/custom/tutorials-list-container";
import { v4 } from "uuid";

const popularProducts = Array.from({ length: 6 }).map((_, i) => {
  const id = v4();
  return {
    id,
    price: "$10",
    href: `/tutorials/${id}`
  };
});

const freeProducts = Array.from({ length: 6 }).map((_, i) => {
  const id = v4();
  return {
    id,
    price: "",
    href: `/tutorials/${id}`
  };
});

const latestProducts = Array.from({ length: 6 }).map((_, i) => {
  const id = v4();
  return {
    id,
    price: "$10",
    href: `/tutorials/${id}`
  };
});

export default function TutorialsPage() {
  return (
    <div className="p-2 space-y-10">
      <ListContainer>
        <ListContainerTitle>Trending</ListContainerTitle>
        <ListContainerCardsContainer>
          {popularProducts.map(({ id, href, price }, i) => (
            <TutorialsCard id={id} href={href} price={price} key={i} />
          ))}
        </ListContainerCardsContainer>
      </ListContainer>
      <ListContainer>
        <ListContainerTitle>Free Courses</ListContainerTitle>
        <ListContainerCardsContainer>
          {freeProducts.map(({ id, href, price }, i) => (
            <TutorialsCard id={id} href={href} price={price} key={i} />
          ))}
        </ListContainerCardsContainer>
      </ListContainer>
      <ListContainer>
        <ListContainerTitle>New Courses</ListContainerTitle>
        <ListContainerCardsContainer>
          {latestProducts.map(({ id, href, price }, i) => (
            <TutorialsCard id={id} href={href} price={price} key={i} />
          ))}
        </ListContainerCardsContainer>
      </ListContainer>
      <ListContainer>
        <ListContainerTitle>Instructors</ListContainerTitle>
        <ListContainerCardsContainer>
          {Array.from({ length: 6 }).map((_, i) => (
            <InstructorCard key={i} />
          ))}
        </ListContainerCardsContainer>
      </ListContainer>
    </div>
  );
}
