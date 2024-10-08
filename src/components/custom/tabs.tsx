"use client";

import { cn } from "@/lib/utils";
import { TabItem } from "@/types/tab";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import micromatch from "micromatch";

export default function Tabs({
  tabs,
  className,
}: {
  tabs: TabItem[];
  className?: string;
}) {
  const pathname = usePathname();
  return (
    <>
      {tabs.map((tab, index) => (
        <TooltipProvider delayDuration={20} key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={tab.href}>
                <div
                  className={cn(
                    `h-10 border-b-2 border-transparent hover:border-b-primary  
              md:px-10 px-5 py-4 flex justify-center items-center text-sm border-r border-r-darkAccent 
              last:border-r-none gap-2`,
                    micromatch.isMatch(pathname, tab.href)
                      ? "border-b-primary"
                      : "",
                    className,
                  )}
                >
                  <span className="flex items-center">
                    {tab.Icon ? <tab.Icon /> : null}
                  </span>
                  <span className="lg:block hidden whitespace-nowrap">
                    {tab.label}
                  </span>
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent className="lg:hidden block bg-lightAccent">
              {tab.label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </>
  );
}
