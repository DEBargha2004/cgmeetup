"use client";

import PostActionsContainer from "@/components/custom/post/_components/post-actions-container";
import ShareDialog from "@/components/custom/share-dialog";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  BookmarkBorder,
  Comment,
  Favorite,
  FavoriteBorder,
  Schedule,
  Share,
  Visibility
} from "@mui/icons-material";
import { useState } from "react";

export default function NewsStats() {
  const [postActions, setPostActions] = useState({
    like: false,
    bookmark: false
  });
  return (
    <div className="flex justify-between items-center border-b pb-2">
      <div className="flex justify-start gap-3 items-center">
        <PostActionsContainer
          Icon={postActions.like ? Favorite : FavoriteBorder}
          onClick={() =>
            setPostActions({ ...postActions, like: !postActions.like })
          }
          className={cn("", postActions.like ? "[&>svg]:text-red-600" : "")}
          count={0}
        />
        <PostActionsContainer Icon={Visibility} count={0} />
        <PostActionsContainer Icon={Comment} count={0} />
        <PostActionsContainer Icon={Schedule} count={"40m"} />
      </div>
      <div className="flex justify-start gap-3 items-center">
        <PostActionsContainer
          Icon={postActions.bookmark ? Bookmark : BookmarkBorder}
          onClick={() =>
            setPostActions({ ...postActions, bookmark: !postActions.bookmark })
          }
          className={cn("", postActions.bookmark ? "[&>svg]:text-primary" : "")}
        />
        <ShareDialog link="http://cgmeetup.com/wdhyuy34rcb">
          <PostActionsContainer Icon={Share} count={0} />
        </ShareDialog>
      </div>
    </div>
  );
}
