"use client";

import ContentSectionHeader from "@/app/tutorial/_components/content-section-header";
import PostActionsContainer from "@/components/custom/post/_components/post-actions-container";
import ShareDialog from "@/components/custom/share-dialog";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  BookmarkBorder,
  Comment,
  Favorite,
  FavoriteBorder,
  Share,
  Visibility
} from "@mui/icons-material";
import { HTMLProps, useState } from "react";

export default function TutorialStats({
  className,
  ...props
}: HTMLProps<HTMLDivElement>) {
  const [postActions, setPostActions] = useState({
    like: false,
    bookmark: false
  });
  return (
    <section className={cn("space-y-4 border-b pb-10", className)} {...props}>
      <ContentSectionHeader>
        Building an Original Character - Part 2 - Character Orthography
      </ContentSectionHeader>
      <div className="flex xxs:justify-between justify-start 2xl:gap-6 gap-3 items-center w-full">
        <div className="flex 2xl:gap-6 gap-4 items-center">
          <PostActionsContainer
            Icon={postActions.like ? Favorite : FavoriteBorder}
            count={3}
            onClick={() =>
              setPostActions({ ...postActions, like: !postActions.like })
            }
            className={cn(postActions.like ? "text-red-600" : "")}
            // className='text-red-600'
          />
          <PostActionsContainer Icon={Visibility} count={3} />
          <PostActionsContainer Icon={Comment} count={3} />
        </div>
        <div className="flex 2xl:gap-6 gap-4 items-center">
          <ShareDialog link="https://cgmeetup.com/12e8woieuo2n3e">
            <PostActionsContainer Icon={Share} count={3} />
          </ShareDialog>
          <PostActionsContainer
            Icon={postActions.bookmark ? Bookmark : BookmarkBorder}
            onClick={() =>
              setPostActions({
                ...postActions,
                bookmark: !postActions.bookmark
              })
            }
            className={postActions.bookmark ? "text-primary" : ""}
          />
        </div>
      </div>
    </section>
  );
}
