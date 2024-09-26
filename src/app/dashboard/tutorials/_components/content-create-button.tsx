import { cn } from "@/lib/utils";
import { IconType } from "@/types/icon";
import { forwardRef, HTMLProps } from "react";

const ContentCreateButton = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> & { Icon: IconType; label: string }
>(({ className, Icon, label, ...props }, ref) => (
  <div
    className={cn(
      "flex flex-col justify-center items-center border w-full aspect-video rounded cursor-pointer",
      " hover:bg-lightAccent transition-all",
      className
    )}
    ref={ref}
    {...props}
  >
    <Icon className="text-primary sm:h-8 h-6" />
    <span className="opacity-70">{label}</span>
  </div>
));

ContentCreateButton.displayName = "ContentCreateButton";

export default ContentCreateButton;
