import { ListContainer } from "@/components/custom";
import {
  ListContainerCardsContainer,
  ListContainerTitle
} from "@/components/custom/list-container";
import {
  InstructorCard,
  TutorialsCard
} from "@/components/custom/tutorials-list-container";
import Link from "next/link";
import { v4 } from "uuid";

const popularProducts = Array.from({ length: 6 }).map((_, i) => {
  const id = v4();
  return {
    id,
    price: "$10",
    href: `/tutorial/${id}`
  };
});

const freeProducts = Array.from({ length: 6 }).map((_, i) => {
  const id = v4();
  return {
    id,
    price: "",
    href: `/tutorial/${id}`
  };
});

const latestProducts = Array.from({ length: 6 }).map((_, i) => {
  const id = v4();
  return {
    id,
    price: "$10",
    href: `/tutorial/${id}`
  };
});

export default function TutorialsPage() {
  return (
    <div className="p-2 space-y-10">
      <ListContainer>
        <ListContainerTitle className="flex justify-between items-baseline">
          Trending
          <Link href={`/tutorials/trending`}>
            <span className="text-sm text-primary">View all</span>
          </Link>
        </ListContainerTitle>
        <ListContainerCardsContainer>
          {popularProducts.map(({ id, href, price }, i) => (
            <TutorialsCard id={id} href={href} price={price} key={i} />
          ))}
        </ListContainerCardsContainer>
      </ListContainer>
      <ListContainer>
        <ListContainerTitle className="flex justify-between items-baseline">
          Free Courses
          <Link href={``}>
            <span className="text-sm text-primary">View all</span>
          </Link>
        </ListContainerTitle>
        <ListContainerCardsContainer>
          {freeProducts.map(({ id, href, price }, i) => (
            <TutorialsCard id={id} href={href} price={price} key={i} />
          ))}
        </ListContainerCardsContainer>
      </ListContainer>
      <ListContainer>
        <ListContainerTitle className="flex justify-between items-baseline">
          New Courses
          <Link href={``}>
            <span className="text-sm text-primary">View all</span>
          </Link>
        </ListContainerTitle>
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
