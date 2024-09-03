import { cn } from "@/lib/utils";
import Collabsible, {
  CollapsibleButton,
  CollapsibleButtonLabel,
  CollapsibleContainer,
  CollapsibleContainerOverflowCover
} from "./collapsible";
import ContentSectionHeader from "./content-section-header";

export default function CourseSyllabus() {
  return (
    <Collabsible open={false} className="">
      <CollapsibleContainer collapsedHeight={200}>
        <div className="space-y-3">
          <ContentSectionHeader>What you'll learn</ContentSectionHeader>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quo,
            voluptates at quas quos nihil aspernatur reiciendis. Voluptatibus
            mollitia nam quos aliquam suscipit aliquid laborum. Ea assumenda
            dolore perspiciatis possimus.
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quo,
            voluptates at quas quos nihil aspernatur reiciendis. Voluptatibus
            mollitia nam quos aliquam suscipit aliquid laborum. Ea assumenda
            dolore perspiciatis possimus.
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quo,
            voluptates at quas quos nihil aspernatur reiciendis. Voluptatibus
            mollitia nam quos aliquam suscipit aliquid laborum. Ea assumenda
            dolore perspiciatis possimus.
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quo,
            voluptates at quas quos nihil aspernatur reiciendis. Voluptatibus
            mollitia nam quos aliquam suscipit aliquid laborum. Ea assumenda
            dolore perspiciatis possimus.
          </div>
        </div>
        <CollapsibleContainerOverflowCover />
      </CollapsibleContainer>
      <CollapsibleButton
        variant={"ghost"}
        className={cn(
          "hover:bg-transparent",
          "flex justify-start items-center gap-2"
        )}
      >
        <CollapsibleButtonLabel />
      </CollapsibleButton>
    </Collabsible>
  );
}
