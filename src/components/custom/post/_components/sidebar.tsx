"use client";

import {
  LimitText,
  MaterialSymbolIcon,
  ProfileInfoOverView
} from "@/components/custom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Close from "./close";
import projects from "@/../public/data/projects.json";
import CommentInput from "./comment-input";
import Comment from "./comment";
import { HTMLProps, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { sample_cateories } from "@/constants/categories";
import {
  Favorite,
  PersonAdd,
  Visibility,
  Comment as CommentIcon,
  Share,
  Bookmark,
  FavoriteBorder,
  BookmarkBorder
} from "@mui/icons-material";
import { IconType } from "@/types/icon";
import profile from "@/../public/images/profile-1.jpg";
import ImageTag from "./image-tag";
import PostActionsContainer from "./post-actions-container";
import ShareDialog from "../../share-dialog";

export default function Sidebar({ postId }: { postId: string }) {
  const [showLiked, setShowLiked] = useState(false);
  const [showBookmarked, setShowBookmarked] = useState(false);
  const project_idx = projects.data.findIndex(
    (project) => project.id === Number(postId)
  );
  const description = `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry. Lorem Ipsum has been the industry's standard dummy text ever
    since the 1500s, when an unknown printer took a galley of type and
    scrambled it to make a type specimen book. It has survived not only
    five centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged. It was popularised in the 1960s with
    the release of Letraset sheets containing Lorem Ipsum passages, and
    more recently with desktop publishing software like Aldus PageMaker
    including versions of Lorem Ipsum`;

  const project = projects.data[project_idx] || {};

  const [activeTab, setActiveTab] = useState<"comment" | "creator">("comment");
  return (
    <div className="w-full h-full md:overflow-y-auto px-1 scroller pt-2 bg-darkAccent relative post-sidebar">
      <div
        className={cn(
          " space-y-3  md:overflow-y-auto scroller z-30 bg-darkAccent relative",
          activeTab === "comment" ? "h-fit md:h-[calc(100%-60px)]" : "h-full"
        )}
      >
        <Card className="rounded bg-card relative">
          <CardContent id="user-profile" className="space-y-6 py-3 pr-2">
            <ProfileInfoOverView
              heading="text-[16px] xl:text-[18px]"
              description="text-[11px] xl:text-[12px] text-white opacity-70"
              className="items-center"
              image="w-16 h-16"
              textContainer="justify-start gap-1"
            >
              <div
                className={cn(
                  "xl:text-sm text-xs h-9 w-9 bg-primary flex justify-center items-center shrink-0 rounded-full",
                  false && "bg-transparent border"
                )}
              >
                <PersonAdd fontSize="small" />
              </div>
            </ProfileInfoOverView>
          </CardContent>
          <CardContent id="post-info" className="space-y-2 pt-0">
            <h1 className="text-[18px] font-bold">{project.title}</h1>
            <LimitText className="text-sm">{description}</LimitText>
            <i className="text-muted-foreground text-xs">Posted 5 hours ago</i>
          </CardContent>
        </Card>
        <div className="flex justify-between items-center">
          <div className="flex justify-between 2xl:gap-6 gap-3 items-center w-full px-2">
            <div className="flex 2xl:gap-6 gap-2 items-center">
              <PostActionsContainer
                Icon={showLiked ? Favorite : FavoriteBorder}
                count={3}
                onClick={() => setShowLiked(!showLiked)}
                className={showLiked ? "text-red-600" : ""}
                // className='text-red-600'
              />
              <PostActionsContainer Icon={Visibility} count={3} />
              <PostActionsContainer Icon={CommentIcon} count={3} />
            </div>
            <div className="flex 2xl:gap-6 gap-3 items-center">
              <ShareDialog link={"https://cgmeetup.com/12e8woieuo2n3e"}>
                <PostActionsContainer Icon={Share} count={3} />
              </ShareDialog>
              <PostActionsContainer
                Icon={showBookmarked ? Bookmark : BookmarkBorder}
                onClick={() => setShowBookmarked(!showBookmarked)}
                className={showBookmarked ? "text-primary" : ""}
              />
            </div>
          </div>
        </div>
        <div className="bg-darkAccent">
          <div className="grid grid-cols-2 w-full px-2 sticky top-0 z-20 bg-darkAccent border-b">
            <TabItem
              className={cn(
                activeTab === "comment" ? " border-primary border-b-2 " : ""
              )}
              onClick={() => setActiveTab("comment")}
            >
              <span>Comments</span>
            </TabItem>
            <TabItem
              className={cn(
                activeTab === "creator" ? " border-primary border-b-2 " : ""
              )}
              onClick={() => setActiveTab("creator")}
            >
              <span>More Work</span>
            </TabItem>
          </div>
          <div
            className={cn(
              "py-3 px-[10px] md:h-auto mx-auto space-y-3",
              activeTab === "comment" ? "overflow-y-auto scroller h-auto" : ""
            )}
          >
            {activeTab === "comment"
              ? Array.from({ length: 19 }, (_, i) => i).map((item) => (
                  <Comment key={item} showNestedComments />
                ))
              : null}
            {activeTab === "creator" ? (
              <>
                <Card id="more-work" className="bg-card">
                  <CardHeader className="flex flex-row justify-start items-center gap-2">
                    More by{" "}
                    <strong className="cursor-pointer hover:text-primary">
                      Guillaume
                    </strong>
                  </CardHeader>
                  <CardContent className="grid grid-cols-3 gap-1">
                    {Array.from({ length: 9 }, (_, i) => i).map((item) => (
                      <Image
                        key={item}
                        src={project.smaller_square_cover_url}
                        alt="more-work"
                        height={100}
                        width={100}
                        className="rounded-sm w-full"
                      />
                    ))}
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardHeader className="pb-0">
                    <strong className="opacity-70">Software :</strong>
                  </CardHeader>
                  <CardContent className="flex gap-2 flex-wrap pt-4">
                    {sample_cateories.slice(0, 4).map((category, i) => (
                      <ImageTag title={category} image={profile} key={i} />
                    ))}
                  </CardContent>
                  <CardHeader className="pb-0">
                    <strong className="opacity-70">Category :</strong>
                  </CardHeader>
                  <CardContent className="flex gap-2 flex-wrap pt-4">
                    {sample_cateories.slice(0, 4).map((cat) => (
                      <Badge key={cat} className=" border opacity-70">
                        {cat}
                      </Badge>
                    ))}
                  </CardContent>
                  <CardHeader className="pb-0">
                    <strong className="opacity-70">Tags :</strong>
                  </CardHeader>
                  <CardContent className="flex gap-2 flex-wrap pt-4">
                    {sample_cateories.slice(0, 3).map((cat) => (
                      <Badge key={cat} className="border opacity-70">
                        {cat}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div
        className={cn(
          "flex sticky bottom-0 justify-center items-center border-t border-border bg-card px-2",
          activeTab === "comment" ? "h-[60px] z-50" : "hidden"
        )}
      >
        <CommentInput />
      </div>
    </div>
  );
}

function TabItem({
  children,
  className,
  ...props
}: { children: React.ReactNode } & HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex justify-center items-center py-1 cursor-pointer bg-transparent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
