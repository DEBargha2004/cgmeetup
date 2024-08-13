import { cn } from "@/lib/utils";
import { PersonAdd } from "@mui/icons-material";
import { forwardRef, HTMLProps } from "react";

const AddFriend = forwardRef<
  HTMLDivElement,
  { isFriend: boolean } & HTMLProps<HTMLDivElement>
>(({ className, isFriend, ...props }, ref) => {
  return (
    <div
      className={cn(
        "xl:text-sm text-xs h-9 w-9 bg-primary flex justify-center items-center shrink-0 rounded-full",

        isFriend && "bg-transparent border",
        className,
      )}
      {...props}
    >
      <PersonAdd fontSize="small" />
    </div>
  );
});

AddFriend.displayName = "AddFriend";

export default AddFriend;
