import { cn } from "@/lib/utils";
import { forwardRef, HTMLProps } from "react";

const ContentSectionHeader = forwardRef<
  HTMLHeadingElement,
  HTMLProps<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1 className={cn("md:text-2xl text-xl font-medium", className)} {...props} />
));

ContentSectionHeader.displayName = "ContentSectionHeader";

export default ContentSectionHeader;
