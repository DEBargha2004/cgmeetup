"use client";

import PostActionsContainer from "@/components/custom/post/_components/post-actions-container";
import {
  Rating,
  RatingInfo,
  RatingType
} from "@/components/custom/rating-info";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { calculateAverageStarRating } from "@/functions/calculate-average-rating";
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
import Link from "next/link";
import { useState } from "react";

const ratings: RatingType[] = [
  {
    maxCount: 5,
    percent: 70
  },
  {
    maxCount: 4,
    percent: 82
  },
  {
    maxCount: 3,
    percent: 31
  },
  {
    maxCount: 2,
    percent: 12
  },
  {
    maxCount: 1,
    percent: 8
  }
];

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
        <TooltipProvider delayDuration={20}>
          <Tooltip>
            <TooltipTrigger>
              <div className="relative bottom-0.5">
                <Rating numberOfStars={5} rating={4.3} />
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-card" side="bottom">
              <div className="space-y-3">
                <p className="text-center">
                  {calculateAverageStarRating(ratings).toFixed(2)} out of 5
                  stars (3 ratings)
                </p>
                <RatingInfo ratings={ratings} />
                <Link href="" className="text-sm text-center block text-golden">
                  See all reviews
                </Link>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
