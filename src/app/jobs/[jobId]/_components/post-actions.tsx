"use client";

import PostActionsContainer from "@/components/custom/post/_components/post-actions-container";
import ShareDialog from "@/components/custom/share-dialog";
import { cn } from "@/lib/utils";
import { IconType } from "@/types/icon";
import {
  Bookmark,
  BookmarkBorder,
  Favorite,
  FavoriteBorder,
  Share,
  Visibility
} from "@mui/icons-material";
import { HTMLProps, useState } from "react";

export default function PostActions() {
  const [showLiked, setShowLiked] = useState(false);
  const [showBookmarked, setShowBookmarked] = useState(false);
  return (
    <div className="flex justify-end items-center w-fit xl:gap-5 gap-3 lg:mr-5">
      <div className="flex gap-3 xl:gap-6 items-center">
        <div className="flex justify-between items-center gap-2">
          <PostActionsContainer
            Icon={showLiked ? Favorite : FavoriteBorder}
            onClick={() => setShowLiked(!showLiked)}
            className={cn("cursor-pointer", showLiked ? "text-red-600" : "")}
            count={3}
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          <PostActionsContainer Icon={Visibility} count={3} />
        </div>
      </div>
      <div className="flex gap-3 xl:gap-6 items-center">
        <div className="flex justify-between items-center gap-2">
          <ShareDialog link="https://cgmeetup.com/12e8woieuo2n3e">
            <PostActionsContainer Icon={Share} count={3} />
          </ShareDialog>
        </div>
        <div className="flex justify-between items-center gap-2">
          <PostActionsContainer
            Icon={showBookmarked ? Bookmark : BookmarkBorder}
            onClick={() => setShowBookmarked(!showBookmarked)}
            className={cn(
              "cursor-pointer",
              showBookmarked ? "text-primary" : ""
            )}
          />
        </div>
      </div>
    </div>
  );
}
