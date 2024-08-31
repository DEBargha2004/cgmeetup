"use client";

import { ProfileInfoOverView } from "@/components/custom";
import { Rating } from "@/components/custom/rating-info";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  MoreVert,
  ThumbDown,
  ThumbDownOutlined,
  ThumbUp,
  ThumbUpOutlined
} from "@mui/icons-material";
import Collabsible, {
  CollapsibleButton,
  CollapsibleButtonLabel,
  CollapsibleContainer,
  CollapsibleContainerOverflowCover
} from "./collapsible";
import { useState } from "react";

type Interaction = "like" | "dislike";

export default function RatingMessageBox() {
  const [interaction, setInteraction] = useState<Interaction>();

  const handleInteraction = (interactionType: Interaction) => {
    setInteraction((prev) =>
      prev === interactionType ? undefined : interactionType
    );
  };
  return (
    <div className="space-y-4 border-t pt-4">
      <ProfileInfoOverView
        descriptionValue=""
        content={
          <div className="flex justify-start items-center gap-2">
            <div className="relative bottom-0.5">
              <Rating numberOfStars={5} rating={4.4} starDimension="16px" />
            </div>
            <span className="text-sm opacity-70">a week ago</span>
          </div>
        }
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVert className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            align="end"
            className="bg-card w-fit"
          >
            <DropdownMenuItem className="cursor-pointer">
              Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ProfileInfoOverView>
      <Collabsible>
        <CollapsibleContainer className="md:[&>article]:text-base [&>article]:text-sm">
          <article>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Voluptatibus, consequatur. Atque eveniet ab accusamus incidunt, ipsa
            quia. Sequi magnam architecto laboriosam fugit rem, minus odio sunt,
            accusamus, ut repudiandae quaerat!
          </article>
          <CollapsibleContainerOverflowCover />
        </CollapsibleContainer>
        <CollapsibleButton variant={"ghost"} className="hover:bg-transparent">
          <CollapsibleButtonLabel />
        </CollapsibleButton>
      </Collabsible>
      <div className="flex justify-start items-center gap-2 ">
        <span className="opacity-70 text-sm">Helpful?</span>
        <div
          className="[&>svg]:text-lg"
          onClick={() => handleInteraction("like")}
        >
          {interaction === "like" ? (
            <ThumbUp className="text-primary" />
          ) : (
            <ThumbUpOutlined />
          )}
        </div>
        <div
          className="[&>svg]:text-lg"
          onClick={() => handleInteraction("dislike")}
        >
          {interaction === "dislike" ? (
            <ThumbDown className="text-primary" />
          ) : (
            <ThumbDownOutlined />
          )}
        </div>
      </div>
    </div>
  );
}
