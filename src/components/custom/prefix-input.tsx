import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Input, InputProps } from "../ui/input";

const PrefixInput = forwardRef<
  HTMLInputElement,
  InputProps & { prefix?: string; inputBoxClassName?: string }
>(({ prefix, className, inputBoxClassName, ...props }, ref) => (
  <div className={cn("relative", className)}>
    <Input
      ref={ref}
      className={cn("hide-input-inner-buttons pl-[70px]", inputBoxClassName)}
      {...props}
    />
    <div
      className={cn(
        "absolute left-0 top-1/2 -translate-y-1/2 px-3 h-full bg-lightAccent rounded-l-md",
        "flex items-center border-r"
      )}
    >
      <p>{prefix}</p>
    </div>
  </div>
));

PrefixInput.displayName = "PrefixInput";
export default PrefixInput;
