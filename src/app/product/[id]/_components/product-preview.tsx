"use client";

import Image from "next/image";
import { useProductPreview } from "./product-preview-provider";
import { cn } from "@/lib/utils";
import { ArrowBackOutlined, ArrowForwardOutlined } from "@mui/icons-material";
import { Navigator } from "@/components/custom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect } from "react";

type Direction = "previous" | "next";

export const ProductPreviewContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="w-full h-full">{children}</div>;
};

export function ProductPreviewImage() {
  const productPreview = useProductPreview();

  if (!productPreview) {
    return null;
  }

  const { images, currentImageIndex } = productPreview;
  return (
    <Image
      className="w-full h-full object-cover"
      src={images[currentImageIndex]}
      alt="product image"
      fill={true}
    />
  );
}

export function ProductPreviewNavigator({
  direction,
  className,
}: {
  direction: Direction;
  className?: string;
}) {
  const productPreview = useProductPreview();

  if (!productPreview) {
    return null;
  }

  const { images, currentImageIndex, setCurrentIndex } = productPreview;
  const handleNavigation = (dir: Direction) => {
    if (dir === "previous") {
      const nextIndex = currentImageIndex - 1;
      setCurrentIndex(nextIndex < 0 ? images.length - 1 : nextIndex);
    } else {
      const nextIndex = currentImageIndex + 1;
      setCurrentIndex(nextIndex > images.length - 1 ? 0 : nextIndex);
    }
  };
  return (
    <Navigator
      Icon={direction === "previous" ? ArrowBackOutlined : ArrowForwardOutlined}
      className={cn(
        "bg-lightAccent/70 hover:bg-lightAccent rounded-full",
        "absolute top-1/2 -translate-y-1/2",
        direction === "previous" ? "left-0" : "right-0",
        className,
      )}
      onClick={() => handleNavigation(direction)}
    />
  );
}

export function ProductPreviewMapper({ className }: { className?: string }) {
  const productPreview = useProductPreview();

  useEffect(() => {}, []);

  if (!productPreview) {
    return null;
  }

  const { images, currentImageIndex, setCurrentIndex } = productPreview;

  return (
    <Carousel className="px-2">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="basis-auto">
            <Image
              src={image}
              alt="product image"
              width={200}
              height={200}
              className={cn(
                "aspect-video lg:w-[200px] sm:w-[180px] w-[140px] object-cover border-2",
                index === currentImageIndex
                  ? "border-primary"
                  : "border-transparent",
              )}
              onClick={() => setCurrentIndex(index)}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="right-2" />
      <CarouselPrevious className="left-2" />
    </Carousel>
  );
}
