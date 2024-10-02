"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function ChatUserItem({ userId }: { userId: string }) {
  const pathname = usePathname();
  const isSelected = useMemo(() => {
    return pathname.includes(userId);
  }, [pathname]);
  return (
    <div
      className={cn(
        "w-full flex justify-start items-center gap-2 p-2 hover:bg-[#0000009d] cursor-pointer",
        "shrink-0",
        isSelected ? " bg-black" : "bg-darkAccent"
      )}
    >
      <Image
        src={
          "https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098"
        }
        alt="profile"
        height={40}
        width={40}
        className="rounded-full h-14 w-14 border-2 border-primary p-[2px] object-contain"
      />
      <div className="h-full flex flex-col justify-start gap-1 w-full pr-1">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-base">Jabby Koya</h1>
          <p className="text-xs opacity-70">10:00 AM</p>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-xs opacity-70">Hey there i am using Shadcn</p>
          <p className="h-4 w-4 shrink-0 flex justify-center items-center rounded-full bg-success text-xs">
            2
          </p>
        </div>
      </div>
    </div>
  );
}
