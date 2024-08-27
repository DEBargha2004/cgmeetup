"use client";

import Image from "next/image";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

import Link from "next/link";
import {
  Bookmark,
  BookmarkBorder,
  Favorite,
  FavoriteBorder,
  Message,
  Visibility
} from "@mui/icons-material";
import { useState } from "react";

export default function NewsCard({ className }: { className?: string }) {
  const [showLiked, setShowLiked] = useState(false);
  const [showBookmarked, setShowBookmarked] = useState(false);
  return (
    <Card
      className={cn(
        `bg-card hover:bg-darkAccent/50 transition-all grid grid-cols-4 gap-x-3 gap-y-2 w-full
    p-0 pb-3 md:pb-3 md:p-3 relative`,
        className
      )}
    >
      <div className="col-span-4 flex md:flex-row flex-col gap-4">
        <div className="xs:h-[146px] xs:w-[260px] w-full shrink-0 mx-auto grow-0">
          <Image
            src={
              "https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098"
            }
            height={200}
            width={200}
            alt="job-image"
            className="w-full aspect-[260/146] object-cover rounded"
          />
        </div>
        <div className="space-y-2 w-full p-3 md:p-0">
          <div className="text-lg md:text-xl font-semibold flex justify-between items-center">
            <Link href={"/news/123"}>
              <h1 className="text-lg md:text-xl font-semibold">
                The Autodesk Showreel 2024
              </h1>
            </Link>
          </div>
          <p className="text-slate-200 opacity-70 line-clamp-2 text-sm w-[calc(100%-20px)] xs:block hidden">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
          </p>
          <div className="flex justify-start items-center gap-2">
            <p className="text-xs text-slate-200 hover:text-primary opacity-70 cursor-pointer w-fit">
              @Ubisoft
            </p>
            <p className="text-xs opacity-70">1 day ago</p>
          </div>
          <div className="sm:flex justify-end hidden gap-3">
            <div className="sm:flex justify-end gap-3  w-[90%]">
              <div className="text-slate-300 py-0 flex justify-start items-center gap-1 border-none">
                <div
                  className="cursor-pointer flex items-start"
                  onClick={() => setShowLiked(!showLiked)}
                >
                  {showLiked ? (
                    <Favorite className="text-red-600" />
                  ) : (
                    <FavoriteBorder />
                  )}
                </div>
                <span className="text-sm">2</span>
              </div>
              <div className="text-slate-300 py-0 flex justify-start items-center gap-1 border-none">
                <Visibility />
                <span className="text-sm">2</span>
              </div>
              <div className="text-slate-300 py-0 flex justify-start items-center gap-1 border-none">
                <Message />
                <span className="text-sm">2</span>
              </div>
            </div>
            <div className="flex items-end">
              <div
                className="cursor-pointer flex items-start"
                onClick={() => setShowBookmarked(!showBookmarked)}
              >
                {showBookmarked ? (
                  <Bookmark className="text-primary" />
                ) : (
                  <BookmarkBorder />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
