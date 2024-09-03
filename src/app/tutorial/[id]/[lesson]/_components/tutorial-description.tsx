import Collabsible, {
  CollapsibleButton,
  CollapsibleButtonLabel,
  CollapsibleContainer,
  CollapsibleContainerOverflowCover
} from "@/app/tutorial/_components/collapsible";
import ContentSectionHeader from "@/app/tutorial/_components/content-section-header";
import { cn } from "@/lib/utils";
import { HTMLProps } from "react";

export default function TutorialDescription({
  className,
  ...props
}: HTMLProps<HTMLDivElement>) {
  return (
    <section className={cn("space-y-2", className)} {...props}>
      <ContentSectionHeader>Course Description</ContentSectionHeader>
      <Collabsible>
        <CollapsibleContainer collapsedHeight={200}>
          <article>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam,
            magnam dolorum incidunt ipsa natus eius eligendi ipsam perferendis
            ab sint quisquam voluptates dicta eaque est. Obcaecati porro impedit
            odio quaerat. Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Enim nostrum placeat ducimus repellat. Quos iure veritatis
            dignissimos, nam quia qui consectetur, repudiandae assumenda
            excepturi illo unde cupiditate maiores repellendus. Nulla!
          </article>
          <CollapsibleContainerOverflowCover />
        </CollapsibleContainer>
        <CollapsibleButton variant={"ghost"} className="hover:bg-transparent">
          <CollapsibleButtonLabel />
        </CollapsibleButton>
      </Collabsible>
    </section>
  );
}
