import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconType } from "@/types/icon";
import { forwardRef } from "react";

const ContentCreateButton = forwardRef<
  HTMLButtonElement,
  ButtonProps & { Icon: IconType; label: string }
>(({ className, Icon, label, ...props }, ref) => (
  <Button
    className={cn("flex flex-col h-20 aspect-square border w-24", className)}
    ref={ref}
    variant={"light_ghost"}
    type="button"
    {...props}
  >
    <Icon />
    <span className="opacity-70">{label}</span>
  </Button>
));

ContentCreateButton.displayName = "ContentCreateButton";

export default ContentCreateButton;
