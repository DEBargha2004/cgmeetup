"use client";

import { cn } from "@/lib/utils";
import AppLogo from "./app-logo";
import { extraNavItems, navItems } from "@/constants/nav-items";
import Link from "next/link";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { profileItems, uploadButtonItems } from "@/constants/dropdown-items";
import { Menu, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import React, { HTMLProps, useState } from "react";
import { useGlobalAppStore } from "@/store/global-app-store";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { NotificationCard } from "./notification-card";
import { usePathname } from "next/navigation";
import { PopoverClose } from "@radix-ui/react-popover";
import ProfileInfoOverView from "./profile-info-overview";
import { Separator } from "../ui/separator";
import {
  AccountCircle,
  Add,
  AddShoppingCart,
  Chat,
  Delete,
  Image as ImageIcon,
  Login,
  Notifications,
  Person,
  Work,
} from "@mui/icons-material";
import Image from "next/image";
import profile from "@/../public/images/profile-1.jpg";

export default function Navbar({ className }: { className?: string }) {
  const { sidebarState, setSidebarState, cart } = useGlobalAppStore();
  const [signedin, setSignedin] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "top-0 flex h-16 items-center md:gap-4 gap-2 border-b bg-card px-4 md:px-6",
        className,
      )}
    >
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <AppLogo />
        </Link>

        {navItems.map((item, item_idx) => (
          <React.Fragment key={item_idx}>
            {item.type === "item" ? (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "transition-colors text-white",
                  (
                    item.catch_routes
                      ? item.catch_routes.includes(pathname)
                      : pathname === item.href
                  )
                    ? "text-primary"
                    : "",
                )}
              >
                {item.label}
              </Link>
            ) : null}
          </React.Fragment>
        ))}
      </nav>
      <Sheet open={sidebarState} onOpenChange={setSidebarState}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-card">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <AppLogo />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {navItems.map((item, item_idx) => (
              <React.Fragment key={item_idx}>
                {item.type === "item" ? (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 text-lg font-semibold",
                      (
                        item.catch_routes
                          ? item.catch_routes.includes(pathname)
                          : pathname === item.href
                      )
                        ? "text-primary"
                        : "",
                    )}
                  >
                    <item.Icon />
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <Separator />
                )}
              </React.Fragment>
            ))}
            {extraNavItems.map((item, item_idx) => (
              <React.Fragment key={item_idx}>
                {item.type === "item" ? (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 text-lg font-semibold",
                      (
                        item.catch_routes
                          ? item.catch_routes.includes(pathname)
                          : pathname === item.href
                      )
                        ? "text-primary"
                        : "",
                    )}
                  >
                    <item.Icon />
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <Separator orientation="horizontal" />
                )}
              </React.Fragment>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center  md:ml-auto gap-2 lg:gap-4">
        <form className="w-full sm:w-2/3 mr-auto ml-1/10">
          <SearchInput />
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"success"}
              className="sm:px-3 px-2 h-8 flex justify-center items-center"
            >
              <Add className="sm:mr-1" />
              <span className="sm:inline hidden">Post</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="translate-y-2">
            <Link href={"/create-post"}>
              <DropdownMenuItem className="cursor-pointer flex gap-2 items-center pl-2">
                <ImageIcon className="h-[14px]" />
                <span>Add Post</span>
              </DropdownMenuItem>
            </Link>
            <Link href={"/create-job"}>
              <DropdownMenuItem className="cursor-pointer flex gap-2 items-center pl-2">
                <Work className="h-[14px]" />
                <span>Add Job</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            {uploadButtonItems.map((item, item_idx) => (
              <React.Fragment key={item_idx}>
                {item.type === "link" ? (
                  <Link href={item.href}>
                    <ProfileItemLabel item={item} />
                  </Link>
                ) : (
                  <DropdownMenuSeparator />
                )}
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {!signedin ? (
          <div className="flex justify-between items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <div className="cursor-pointer">
                  <Notifications className="xs:block hidden" />
                </div>
              </PopoverTrigger>
              <PopoverContent
                side="bottom"
                align="center"
                className="bg-card translate-y-3 space-y-4 max-h-[600px] lg:w-[500px] xs:w-fit w-[100vw] overflow-y-auto scroller"
              >
                <h1 className="text-xl font-semibold">Notifications</h1>
                <div className="space-y-3">
                  {Array.from({ length: 21 }, (_, i) => i).map((i) => (
                    <NotificationCard key={i} />
                  ))}
                </div>
                <Link
                  href={"/dashboard/notifications"}
                  className="inline-block w-full"
                >
                  <PopoverClose className="w-full">
                    <div className="p-2 flex justify-center items-center rounded hover:bg-primary text-primary hover:text-white cursor-pointer transition-all">
                      View All Notifications
                    </div>
                  </PopoverClose>
                </Link>
              </PopoverContent>
            </Popover>
            <Link href={"/chat"} className="xs:inline hidden">
              <Chat />
            </Link>
            <Popover open={isCartOpen} onOpenChange={(e) => setIsCartOpen(e)}>
              <PopoverTrigger asChild>
                <div
                  className="inline relative cursor-pointer"
                  id="shopping-cart"
                >
                  <AddShoppingCart />
                  {cart.length > 0 && (
                    <div
                      className={cn(
                        "h-5 aspect-square rounded-full bg-primary absolute -top-2 -right-2",
                        "grid place-content-center text-xs",
                      )}
                    >
                      {cart.length}
                    </div>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="center"
                className="bg-card space-y-3 sm:w-[450px] w-[100vw] overflow-y-auto scroller 
                translate-y-3 sm:max-h-[650px] max-h-[calc(100vh-64px)]"
              >
                {cart.map((item) => (
                  <PopoverCartItem key={item} id={item} />
                ))}
                {cart.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={"secondary"}
                      onClick={() => setIsCartOpen(false)}
                    >
                      Continue Shopping
                    </Button>
                    <Button>Checkout</Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <>
            <Link href={"/sign-up"}>
              <Button variant={"success"} className="h-9">
                <Person className="sm:mr-1" />
                <span className="md:inline hidden">Sign Up</span>
              </Button>
            </Link>

            <Link href={"/sign-in"}>
              <Button className="h-9">
                <Login className="sm:mr-1" />
                <span className="md:inline hidden">Sign In</span>
              </Button>
            </Link>
          </>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <AccountCircle fontSize="large" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="translate-y-1">
            {profileItems
              .slice(0, profileItems.length - 1)
              .map((item, item_idx) => (
                <ProfileItemLink item={item} key={item_idx}>
                  <ProfileItemLabel item={item} />
                </ProfileItemLink>
              ))}
            <Link className="w-full" href={"/signin"}>
              <DropdownMenuItem className="cursor-pointer flex gap-2 w-full pl-2 ">
                <Login className="h-[14px]" />
                Sign In
              </DropdownMenuItem>
            </Link>
            {profileItems
              .slice(profileItems.length - 1)
              .map((item, item_idx) => (
                <ProfileItemLink item={item} key={item_idx}>
                  <ProfileItemLabel item={item} />
                </ProfileItemLink>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function ProfileItemLabel({ item }: { item: (typeof profileItems)[number] }) {
  return (
    <React.Fragment>
      {item.type === "separator" ? (
        <DropdownMenuSeparator />
      ) : (
        <>
          <DropdownMenuItem
            key={item.id}
            className="cursor-pointer flex gap-2 w-full pl-2 "
          >
            <item.Icon className="h-[14px]" />
            {item.label}
          </DropdownMenuItem>
        </>
      )}
    </React.Fragment>
  );
}

function ProfileItemLink({
  item,
  children,
}: {
  item: (typeof profileItems)[number];
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      {item.type === "link" ? (
        <Link
          href={item.href}
          className="flex justify-start items-center w-full"
        >
          {children}
        </Link>
      ) : (
        <>{children}</>
      )}
    </React.Fragment>
  );
}

function SearchInput() {
  const [showSearchFields, setShowSearchFields] = useState(false);
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-8 sm:w-full"
        onFocus={() => setShowSearchFields(true)}
        onBlur={() => setShowSearchFields(false)}
      />
      <div
        hidden={!showSearchFields}
        className="sm:w-full w-[100vw] min-w-[400px] h-fit p-2 bg-card sm:absolute fixed 
        top-16 left-0 sm:left-1/2 border-b sm:-translate-x-1/2 sm:top-[calc(100%+5px)] z-50 
        rounded space-y-1 px-1 max-h-[600px] overflow-y-auto scroller "
      >
        {Array.from({ length: 5 }, (_, i) => i).map((item) => (
          <SearchItem key={item}>
            <ProfileInfoOverView
              textContainer="justify-center"
              description="hidden"
              image="h-8 w-8"
            />
          </SearchItem>
        ))}
        {navItems.map((item, item_idx) => (
          <React.Fragment key={item_idx}>
            {item.type === "item" ? (
              <Link
                href={item.href}
                key={item.id}
                className=" flex justify-start items-center gap-2 "
              >
                <SearchItem className="flex justify-start items-center gap-2">
                  <item.Icon />
                  <span>Search {item.label}</span>
                </SearchItem>
              </Link>
            ) : (
              <Separator />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function SearchItem({
  children,
  className,
  ...props
}: { children: React.ReactNode } & HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "p-2 transition-all hover:bg-lightAccent w-full rounded cursor-pointer",
        className,
      )}
    >
      {children}
    </div>
  );
}

function PopoverCartItem({ id }: { id: string }) {
  const { removeFromCart } = useGlobalAppStore();
  return (
    <div className="flex justify-start items-center gap-4 p-4 bg-lightAccent/40 hover:bg-lightAccent transition-all">
      <div className="h-16 aspect-video">
        <Image
          src={profile}
          alt="cart-item-image"
          height={200}
          width={200}
          className="h-full w-full aspect-video object-cover"
        />
      </div>
      <div className="w-full grid gap-2">
        <div className="flex justify-between items-center w-full gap-2">
          <h1 className="lg:text-lg text-base text-primary line-clamp-1">
            Modern 3D Gun Model Design
          </h1>
          <div className="cursor-pointer" onClick={() => removeFromCart(id)}>
            <Delete className="text-destructive" />
          </div>
        </div>
        <p className="flex gap-2 lg:[&>span]:text-base [&>span]:text-sm">
          <span className="line-through opacity-70">$ 9.99</span>
          <span>$ 7.99</span>
        </p>
      </div>
    </div>
  );
}
