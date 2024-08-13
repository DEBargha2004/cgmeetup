"use client";

import { cn } from "@/lib/utils";
import {
  Bookmark,
  BookmarkBorder,
  Favorite,
  FavoriteBorder,
  Share,
  Visibility,
} from "@mui/icons-material";
import { useState } from "react";
import PostActionsContainer from "@/components/custom/post/_components/post-actions-container";
import { Button } from "@/components/ui/button";

export default function ProductStats() {
  const [postActions, setPostActions] = useState({
    bookmark: false,
    like: false,
  });
  return (
    <div className="flex justify-between items-center">
      <div>
        <PostActionsContainer
          Icon={postActions.bookmark ? Bookmark : BookmarkBorder}
          className={cn("", postActions.bookmark ? "text-primary" : "")}
          onClick={() =>
            setPostActions({ ...postActions, bookmark: !postActions.bookmark })
          }
        />
      </div>
      <div className="flex justify-between items-center gap-5">
        <PostActionsContainer Icon={Visibility} count={100} />
        <PostActionsContainer
          Icon={postActions.like ? Favorite : FavoriteBorder}
          count={10}
          className={cn("", postActions.like ? "text-red-600" : "")}
          onClick={() =>
            setPostActions({ ...postActions, like: !postActions.like })
          }
        />
        <PostActionsContainer Icon={Share} />
        <Button variant={"outline-destructive"}>Report</Button>
      </div>
    </div>
  );
}
