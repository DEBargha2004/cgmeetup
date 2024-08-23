"use client";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { HTMLProps, useMemo, useRef, useState } from "react";
import profile from "@/../public/images/profile-1.jpg";
import NextImage from "next/image";
import { AddShoppingCart, Bookmark } from "@mui/icons-material";
import { ProfileInfoOverView } from "@/components/custom";
import Link from "next/link";
import { useGlobalAppStore } from "@/store/global-app-store";

const tags = ["FDX", "OBJ"];

export default function ListContainer({
  children,
  className,
  ...props
}: {} & HTMLProps<HTMLDivElement>) {
  return (
    <div className={cn("grid gap-3", className)} {...props}>
      {children}
    </div>
  );
}

export function ListContainerTitle({
  children,
  className,
  ...props
}: {} & HTMLProps<HTMLHeadingElement>) {
  return (
    <h1 className={cn("text-2xl font-semibold ", className)} {...props}>
      {children}
    </h1>
  );
}

export function ListContainerCardsContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid 3xl:grid-cols-6  xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ListContainerCard({
  className,
  price,
  bottomLeftIcons,
  href,
  id,
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

    const navbarCart = document.getElementById("shopping-cart");
    const cartPosition = navbarCart?.getBoundingClientRect();
    const imagePosition = imageRef.current?.getBoundingClientRect();
    const sampleImage = new Image();
    sampleImage.src = profile.src;
    sampleImage.height = imagePosition?.height || 0;
    sampleImage.width = imagePosition?.width || 0;

    sampleImage.className = "absolute transition-all linear duration-1000";
    sampleImage.style.left = `${imagePosition?.left || 0}px`;
    sampleImage.style.top = `${imagePosition?.top || 0}px`;
    sampleImage.style.opacity = "0.8";
    sampleImage.style.objectFit = "contain";

    document.body.append(sampleImage);

    setTimeout(() => {
      sampleImage.style.top = `${cartPosition?.top || 0}px`;
      sampleImage.style.left = `${(cartPosition?.left || 0) + 20}px`;
      sampleImage.style.transformOrigin = "0 0";
      sampleImage.style.scale = "0";
      sampleImage.style.opacity = "0.3";
    }, 0);

    setTimeout(() => {
      document.body.removeChild(sampleImage);
    }, 1200);

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
        "min-w-[240px] grid gap-2 rounded shrink-0 border @container",
        className,
      )}
    >
      <div className="w-full aspect-square rounded relative group overflow-hidden">
        <Link href={href || ""} scroll={false}>
          <NextImage
            src={profile}
            alt="profile"
            height={300}
            width={300}
            className="w-full h-full object-contain bg-black/10"
            ref={imageRef}
          />
        </Link>
        <div
          id="tag"
          className={cn(
            "absolute top-3 right-0 px-2 py-1 rounded-l-md",
            price ? "bg-lightAccent/60" : "bg-success",
          )}
        >
          <p className="text-sm">{price ? price : "FREE"}</p>
        </div>
        <ListContainerTag className="absolute top-3 left-3 -translate-y-10 transition-all group-hover:translate-y-0">
          3D
        </ListContainerTag>
        <div
          className={cn(
            "absolute bottom-0 left-0 w-full p-2 flex justify-between",
            "group-hover:translate-y-0 translate-y-10 transition-all",
          )}
        >
          <div className="flex justify-between items-center gap-1 ">
            {tags.map((tag, index) => (
              <ListContainerTag key={index}>{tag}</ListContainerTag>
            ))}
            {bottomLeftIcons}
          </div>
          <div className="flex justify-between items-center gap-1">
            <ListContainerCardIcon className="bg-lightAccent/60">
              <Bookmark fontSize="small" />
            </ListContainerCardIcon>
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
            $100
          </p>
          <ListContainerCardIcon
            className={cn(
              "shrink-0 h-6 w-6",
              isAddableToCart ? "bg-orange-500" : "bg-lightAccent/70",
            )}
            onClick={() => (isAddableToCart ? handleAddToCart() : null)}
          >
            <AddShoppingCart fontSize="small" className="h-4 w-4" />
          </ListContainerCardIcon>
        </ProfileInfoOverView>
      </div>
    </div>
  );
}

export function ListContainerCardIcon({
  children,
  className,
  ...props
}: {} & HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "w-8 h-8 grid place-content-center rounded-full cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function ListContainerTag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-xs opacity-70 bg-lightAccent/60 p-1 rounded-sm",
        className,
      )}
    >
      {children}
    </p>
  );
}
