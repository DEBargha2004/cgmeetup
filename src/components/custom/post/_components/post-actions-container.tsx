import { cn } from "@/lib/utils";
import { IconType } from "@/types/icon";
import { forwardRef, HTMLProps } from "react";

const PostActionsContainer = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> & {
    Icon: IconType;
    count?: any;
  }
>(({ Icon, className, count, ...props }, ref) => (
  <div className="flex justify-between items-center 2xl:gap-2 gap-1" ref={ref}>
    <div
      className={cn(
        `flex justify-center items-center bg-lightAccent h-7 w-7 
      2xl:h-9 2xl:w-9 rounded-full cursor-pointer`,
        "sm:[&>svg]:w-5 sm:[&>svg]:h-5 [&>svg]:w-4 [&>svg]:h-4",
        className
      )}
      {...props}
    >
      <Icon className="h-[20px] 2xl:scale-100 scale-[0.8]" />
    </div>
    {count && (
      <span className="font-bold opacity-90 xl:text-base text-xs">{count}</span>
    )}
  </div>
));

PostActionsContainer.displayName = "PostActionsContainer";
export default PostActionsContainer;
