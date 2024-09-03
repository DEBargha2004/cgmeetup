import { HTMLProps } from "react";
import ContentSectionHeader from "./content-section-header";
import Collabsible, {
  CollapsibleButton,
  CollapsibleButtonLabel,
  CollapsibleContainer,
  CollapsibleContainerOverflowCover
} from "./collapsible";
import { cn } from "@/lib/utils";

export default function CourseDescription({
  className,
  ...props
}: HTMLProps<HTMLDivElement> & {}) {
  return (
    <section className={cn("space-y-5", className)} {...props}>
      <ContentSectionHeader>Description</ContentSectionHeader>
      <Collabsible open={false}>
        <CollapsibleContainer collapsedHeight={200}>
          <article>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At quasi
            eius quidem sapiente provident deserunt optio omnis vel, expedita ab
            illum suscipit autem esse dolorem, corporis excepturi eveniet.
            Ratione, perferendis! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quam sapiente explicabo quisquam consectetur
            debitis ex vero, nisi ipsum. Magni, quibusdam pariatur ratione sint
            at ducimus quam ipsum eius a harum? Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Earum aut dolorum natus nesciunt,
            delectus explicabo corporis. Ipsa ut voluptates velit reprehenderit!
            Dolore facilis doloribus veritatis a cum, fuga iste optio! Lorem
            ipsum dolor sit amet consectetur adipisicing elit. At quasi eius
            quidem sapiente provident deserunt optio omnis vel, expedita ab
            illum suscipit autem esse dolorem, corporis excepturi eveniet.
            Ratione, perferendis! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quam sapiente explicabo quisquam consectetur
            debitis ex vero, nisi ipsum. Magni, quibusdam pariatur ratione sint
            at ducimus quam ipsum eius a harum? Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Earum aut dolorum natus nesciunt,
            delectus explicabo corporis. Ipsa ut voluptates velit reprehenderit!
            Dolore facilis doloribus veritatis a cum, fuga iste optio! Lorem
            ipsum dolor sit amet consectetur adipisicing elit. At quasi eius
            quidem sapiente provident deserunt optio omnis vel, expedita ab
            illum suscipit autem esse dolorem, corporis excepturi eveniet.
            Ratione, perferendis! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quam sapiente explicabo quisquam consectetur
            debitis ex vero, nisi ipsum. Magni, quibusdam pariatur ratione sint
            at ducimus quam ipsum eius a harum? Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Earum aut dolorum natus nesciunt,
            delectus explicabo corporis. Ipsa ut voluptates velit reprehenderit!
            Dolore facilis doloribus veritatis a cum, fuga iste optio!
          </article>
          <CollapsibleContainerOverflowCover className="" />
        </CollapsibleContainer>
        <CollapsibleButton variant={"ghost"} className="hover:bg-transparent">
          <CollapsibleButtonLabel />
        </CollapsibleButton>
      </Collabsible>
    </section>
  );
}
