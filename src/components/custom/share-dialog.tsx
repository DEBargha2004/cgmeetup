"use client";

import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "../ui/carousel";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { HTMLProps, useEffect, useState } from "react";

type ShareOption = {
  src: string;
  title: string;
};

const shareOptions: ShareOption[] = [
  {
    title: "Embed",
    src: ""
  },
  {
    title: "WhatsApp",
    src: ""
  },
  {
    title: "Facebook",
    src: ""
  },
  {
    title: "X",
    src: ""
  },
  {
    title: "Email",
    src: ""
  },
  {
    title: "KakaoTalk",
    src: ""
  },
  {
    title: "Vimeo",
    src: ""
  },
  {
    title: "MxTakatak",
    src: ""
  }
];

export default function ShareDialog({
  children,
  link
}: {
  children: React.ReactNode;
  link: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="bg-card p-4"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="space-y-6 overflow-hidden">
          <p className="text-lg">Share</p>
          <Carousel>
            <CarouselContent className="bg-card">
              {shareOptions.map((item, index) => (
                <CarouselItem key={index} className="basis-auto">
                  <ShareElement label={item.title} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="right-0" />
            <CarouselPrevious className="left-0" />
          </Carousel>
          <div
            className={cn(
              "p-2 px-3 bg-darkAccent border-2 border-lightAccent rounded",
              "flex justify-between items-center"
            )}
          >
            <p className="line-clamp-1 text-xs opacity-70">{link}</p>
            <Button
              className="h-8 rounded-full text-xs"
              variant={isCopied ? "outline" : "default"}
              onClick={() => {
                navigator.clipboard.writeText(link);
                setIsCopied(true);
              }}
            >
              {isCopied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ShareElement({
  label,
  className,
  ...props
}: HTMLProps<HTMLDivElement> & { label: string }) {
  return (
    <div className={cn("space-y-4 text-center", className)} {...props}>
      <div className="h-16 w-16 rounded-full bg-red-600 shrink-0"></div>
      <span className="text-xs">{label}</span>
    </div>
  );
}
