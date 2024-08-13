import { cn } from "@/lib/utils";
import { IconType } from "@/types/icon";
import { HTMLProps } from "react";

export default function PostActionsContainer({
  count,
  Icon,
  className,
  ...props
}: {
  Icon: IconType;
  count?: number;
} & HTMLProps<HTMLDivElement>) {
  return (
    <div className="flex justify-between items-center 2xl:gap-2 gap-1">
      <div
        className={cn(
          `flex justify-center items-center bg-lightAccent h-8 w-8 
                      2xl:h-9 2xl:w-9 rounded-full cursor-pointer`,
          className,
        )}
        {...props}
      >
        <Icon className="2xl:h-[20px]" fontSize="small" />
      </div>
      {count && <span className="font-bold opacity-90">{count}</span>}
    </div>
  );
}
