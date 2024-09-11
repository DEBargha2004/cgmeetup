"use client";

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
import { forwardRef, HTMLProps, useMemo, useState } from "react";
import PostActionsContainer from "@/components/custom/post/_components/post-actions-container";
import StarRatings from "react-star-ratings";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Rating,
  RatingInfo,
  RatingType
} from "@/components/custom/rating-info";
import { calculateAverageStarRating } from "@/functions/calculate-average-rating";
import ShareDialog from "@/components/custom/share-dialog";

const ratings: RatingType[] = [
  {
    maxCount: 5,
    percent: 45
  },
  {
    maxCount: 4,
    percent: 55
  },
  {
    maxCount: 3,
    percent: 65
  },
  {
    maxCount: 2,
    percent: 75
  },
  {
    maxCount: 1,
    percent: 85
  }
];

export default function ProductStats() {
  const [postActions, setPostActions] = useState({
    bookmark: false,
    like: false
  });
  const pathname = usePathname();

  const productId = useMemo(() => {
    return pathname?.slice(1).split("/")[1];
  }, [pathname]);
  return (
    <div className="flex justify-between 2xl:gap-6 gap-3 items-center w-full">
      <div className="flex 2xl:gap-6 gap-3 items-center">
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
            <TooltipTrigger asChild>
              <div className="relative bottom-0.5">
                <Rating rating={calculateAverageStarRating(ratings)} />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-lightAccent">
              <div className="space-y-3">
                <p className="text-center">
                  {calculateAverageStarRating(ratings).toFixed(2)} out of 5
                  stars (3 ratings)
                </p>
                <RatingInfo ratings={ratings} />
                <Link
                  href={`/product/${productId}/review`}
                  className="text-sm text-center block text-golden"
                >
                  See all reviews
                </Link>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex 2xl:gap-6 gap-3 items-center">
        <ShareDialog link="https://cgmeetup.com/12e8woieuo2n3e">
          <PostActionsContainer Icon={Share} count={3} />
        </ShareDialog>
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
