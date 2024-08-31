"use client";

import PostActionsContainer from "@/components/custom/post/_components/post-actions-container";
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
import { useState } from "react";

export default function TutorialStats() {
  const [postActions, setPostActions] = useState({
    like: false,
    bookmark: false
  });
  return (
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
        <PostActionsContainer Icon={Share} count={3} />
        <PostActionsContainer
          Icon={postActions.bookmark ? Bookmark : BookmarkBorder}
          onClick={() =>
            setPostActions({ ...postActions, bookmark: !postActions.bookmark })
          }
          className={postActions.bookmark ? "text-primary" : ""}
        />
      </div>
    </div>
  );
}
