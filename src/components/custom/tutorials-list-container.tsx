"use client";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { HTMLProps, useMemo, useRef, useState } from "react";
import profile from "@/../public/images/profile-1.jpg";
import NextImage from "next/image";
import {
  AddShoppingCart,
  Bookmark,
  BookmarkBorder,
  Download,
  PersonAdd
} from "@mui/icons-material";
import { ProfileInfoOverView } from "@/components/custom";
import Link from "next/link";
import { useGlobalAppStore } from "@/store/global-app-store";
import { handleAddToCartAnimation } from "@/functions/add-to-cart-animation";
import Image from "next/image";
import background from "@/../public/images/cover-image.jpg";
import { Button } from "../ui/button";
import StarRatings from "react-star-ratings";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip";

const tags = ["Intermediate", "Maya"];

export function TutorialsCard({
  className,
  price,
  bottomLeftIcons,
  href,
  id
}: {
  price?: string;
  bottomLeftIcons?: JSX.Element;
  href?: string;
  id: string;
} & HTMLProps<HTMLDivElement>) {
  const imageRef = useRef<HTMLImageElement>(null);
  const { addToCart, cart } = useGlobalAppStore();
  const [isAddToCartInitiated, setIsAddToCartInitiated] = useState(false);

  const handleAddToCart = () => {
    setIsAddToCartInitiated(true);
    handleAddToCartAnimation({ imageRef });
    setTimeout(() => {
      addToCart(id);
      setIsAddToCartInitiated(false);
    }, 800);
  };

  const isAddableToCart = useMemo(() => {
    return !isAddToCartInitiated && !cart.includes(id);
  }, [cart, isAddToCartInitiated, id]);

  return (
    <div
      className={cn(
        "min-w-[240px] grid gap-2 rounded shrink-0 border @container overflow-hidden",
        className
      )}
    >
      <div className="w-full aspect-video relative group overflow-hidden">
        <Link href={href || ""} scroll={false}>
          <NextImage
            src={profile}
            alt="profile"
            height={300}
            width={300}
            className="w-full h-full object-cover bg-black/10"
            ref={imageRef}
          />
        </Link>
        <div
          id="tag"
          className={cn(
            "absolute top-3 right-0 px-2 py-1 rounded-l-md",
            price ? "bg-lightAccent/60" : "bg-success"
          )}
        >
          <p className="text-sm">{price ? price : "FREE"}</p>
        </div>
        <TutorialsCardTag className="absolute top-3 left-3 -translate-y-10 transition-all group-hover:translate-y-0">
          3D
        </TutorialsCardTag>
        <div
          className={cn(
            "absolute bottom-0 left-0 w-full px-2 py-1 flex justify-between",
            "group-hover:translate-y-0 translate-y-10 transition-all"
          )}
        >
          <div className="flex justify-between items-center gap-1 ">
            {tags.map((tag, index) => (
              <TutorialsCardTag key={index}>{tag}</TutorialsCardTag>
            ))}
            {bottomLeftIcons}
          </div>
          <div className="flex justify-between items-center gap-1">
            <TutorialsCardIcon className="bg-lightAccent/60">
              <Bookmark fontSize="small" />
            </TutorialsCardIcon>
          </div>
        </div>
      </div>
      <div className="grid gap-2 p-2">
        <h1 className="text-lg">Dog Image</h1>

        <ProfileInfoOverView
          description="hidden"
          textContainer="justify-center"
          image="h-6 w-6 border-none"
          heading="font-light text-sm line-clamp-1"
          className="mt-1 @container gap-0"
        >
          <p className="bg-lightAccent text-xs p-1.5 py-0.5 rounded my-auto">
            {price || "Free"}
          </p>
          {price ? (
            <TutorialsCardIcon
              className={cn(
                "shrink-0 h-6 w-6",
                isAddableToCart ? "bg-orange-500" : "bg-lightAccent/70"
              )}
              onClick={() => (isAddableToCart ? handleAddToCart() : null)}
            >
              <AddShoppingCart fontSize="small" className="h-4 w-4" />
            </TutorialsCardIcon>
          ) : (
            <TutorialsCardIcon className={cn("shrink-0 h-6 w-6", "bg-primary")}>
              <Download fontSize="small" className="h-4 w-4" />
            </TutorialsCardIcon>
          )}
        </ProfileInfoOverView>
      </div>
    </div>
  );
}

export function TutorialsCardIcon({
  children,
  className,
  ...props
}: {} & HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "w-8 h-8 grid place-content-center rounded-full cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function TutorialsCardTag({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-xs opacity-70 bg-lightAccent/60 p-1 rounded-sm",
        className
      )}
    >
      {children}
    </p>
  );
}

export function InstructorCard({
  className,
  ...props
}: HTMLProps<HTMLDivElement> & {}) {
  return (
    <div className={cn("border rounded overflow-hidden", className)} {...props}>
      <div className="p-4 grid grid-cols-[120px_1fr] gap-2">
        <div className="flex flex-col justify-between items-center gap-4">
          <Image
            src={profile}
            height={100}
            width={100}
            alt="profile"
            className="h-[100px] w-[100px] rounded-full border-2 border-white"
          />
          <Button className="w-fit h-7 px-2">
            <span className="mr-1 font-semibold text-sm">Follow</span>
            <PersonAdd className="text-base" />
          </Button>
        </div>
        <div className="flex flex-col justify-between items-start">
          <h1 className="text-lg">Sichen Len</h1>
          <p>Animator</p>
          <p>
            <strong>500</strong>&nbsp;Students
          </p>
          <p>
            <strong>30</strong>&nbsp;Courses
          </p>
          <div className="flex items-center justify-start gap-2">
            <span>4.8</span>
            <TooltipProvider delayDuration={20}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-fit relative bottom-0.5">
                    <StarRatings
                      numberOfStars={1}
                      rating={1}
                      starDimension="18px"
                      starRatedColor="hsl(var(--golden))"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-lightAccent">
                  Instructor Rating
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-0.5 p-0.5">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="w-full aspect-video rounded-sm overflow-hidden"
          >
            <Image
              src={background}
              alt="background"
              height={400}
              width={400}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
