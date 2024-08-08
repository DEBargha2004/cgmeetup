import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { HTMLProps } from "react";
import profile from "@/../public/images/profile-1.jpg";
import Image from "next/image";
import vertical from "@/../public/images/dog-vertical.webp";
import horizontal from "@/../public/images/dog.webp";
import {
  AddShoppingCart,
  Bookmark,
  ShoppingBasket,
  ShoppingCart
} from "@mui/icons-material";
import { ProfileInfoOverView } from "@/components/custom";
import Link from "next/link";

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

ListContainer.Title = function ListContainerTitle({
  children,
  className,
  ...props
}: {} & HTMLProps<HTMLHeadingElement>) {
  return (
    <h1 className={cn("text-2xl font-semibold ", className)} {...props}>
      {children}
    </h1>
  );
};

ListContainer.CardsContainer = function ListContainerCardsContainer({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Carousel className={cn("overflow-hidden", className)}>
      <CarouselContent className="">{children}</CarouselContent>
      <CarouselNext className="right-2 -translate-y-10" />
      <CarouselPrevious className="left-2 -translate-y-10" />
    </Carousel>
  );
};

ListContainer.Card = function ListContainerCard({
  className,
  price,
  bottomLeftIcons,
  href
}: {
  price?: string;
  bottomLeftIcons?: JSX.Element;
  href?: string;
} & HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "max-w-[300px] w-full grid gap-2 rounded shrink-0 border ",
        className
      )}
    >
      <div className="w-full aspect-square rounded relative group overflow-hidden">
        <Link href={href || ""}>
          <Image
            src={profile}
            alt="profile"
            height={300}
            width={300}
            className="w-full h-full object-contain bg-black/10"
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
        <ListContainer.Tag className="absolute top-3 left-3 -translate-y-10 transition-all group-hover:translate-y-0">
          3D
        </ListContainer.Tag>
        <div
          className={cn(
            "absolute bottom-0 left-0 w-full p-2 flex justify-between",
            "group-hover:translate-y-0 translate-y-10 transition-all"
          )}
        >
          <div className="flex justify-between items-center gap-1 ">
            {tags.map((tag, index) => (
              <ListContainer.Tag key={index}>{tag}</ListContainer.Tag>
            ))}
            {bottomLeftIcons}
          </div>
          <div className="flex justify-between items-center gap-1">
            <ListContainer.CardIcon className="bg-lightAccent/60">
              <Bookmark fontSize="small" />
            </ListContainer.CardIcon>
          </div>
        </div>
      </div>
      <div className="grid gap-2 p-2">
        <h1 className="text-lg">Dog Image</h1>

        <ProfileInfoOverView
          description="hidden"
          textContainer="justify-center"
          image="h-6 w-6 border-none"
          heading="font-light text-sm line-clamp-1 "
          className="mt-1 @container gap-2"
        >
          <p className="bg-lightAccent text-xs p-1.5 py-0.5 rounded my-auto">
            $100
          </p>
          <ListContainer.CardIcon className="bg-orange-500 shrink-0">
            <AddShoppingCart fontSize="small" />
          </ListContainer.CardIcon>
        </ProfileInfoOverView>
      </div>
    </div>
  );
};

ListContainer.CardIcon = function ListContainerCardIcon({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-8 h-8 grid place-content-center rounded-full cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
};

ListContainer.Tag = function ListContainerTag({
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
};
