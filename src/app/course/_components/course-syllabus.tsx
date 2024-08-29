import { cn } from "@/lib/utils";
import Collabsible, {
  CollapsibleButton,
  CollapsibleButtonLabel,
  CollapsibleContainer,
  CollapsibleContainerOverflowCover
} from "./collapsible";

export default function CourseSyllabus() {
  return (
    <Collabsible open={false} className="border bg-card px-6 pt-6">
      <CollapsibleContainer collapsedHeight={200}>
        <div className="space-y-3">
          <h1 className="text-xl font-bold">What you'll learn</h1>
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
