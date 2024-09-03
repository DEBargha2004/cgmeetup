"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import React, { forwardRef, HTMLProps } from "react";

type CollapsibleProps = {
  openState: boolean;
  setOpenState: React.Dispatch<
    React.SetStateAction<CollapsibleProps["openState"]>
  >;
  toggle: () => void;
};

const CollapsibleContext = React.createContext<CollapsibleProps | null>(null);
const useCollapsible = () => {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error("useCollapsible must be used within a CollapsibleProvider");
  }
  return context;
};

export default function Collabsible({
  open = false,
  className,
  children,
  ...props
}: HTMLProps<HTMLDivElement> & { open?: boolean; collapsedHeight?: number }) {
  const [openState, setOpenState] = React.useState(open);
  const toggle = () => {
    setOpenState(!openState);
  };
  return (
    <CollapsibleContext.Provider value={{ openState, setOpenState, toggle }}>
      <section className={cn("", className)} {...props}>
        {children}
        <div className="p-2"></div>
      </section>
    </CollapsibleContext.Provider>
  );
}

const CollapsibleButtonLabel = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> & { openLabel?: string; closeLabel?: string }
>(
  (
    { openLabel = "Show less", closeLabel = "Show more", className, ...props },
    ref
  ) => {
    const { openState } = useCollapsible();
    return (
      <div
        className={cn(
          "flex justify-start items-center gap-2",
          "[&>span]:text-sm [&>span]:text-primary",
          className
        )}
        {...props}
        ref={ref}
      >
        <span>{openState ? openLabel : closeLabel}</span>
        {openState ? (
          <KeyboardArrowUp fontSize="small" />
        ) : (
          <KeyboardArrowDown fontSize="small" />
        )}
      </div>
    );
  }
);

const CollapsibleButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, ...props }, ref) => {
    const { toggle } = useCollapsible();

    return (
      <Button
        {...props}
        onClick={(...e) => {
          toggle();
          onClick?.(...e);
        }}
        className={cn("px-0", className)}
        ref={ref}
      />
    );
  }
);

const CollapsibleContainer = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> & { collapsedHeight?: number }
>(({ className, collapsedHeight = 400, style, ...props }, ref) => {
  const { openState } = useCollapsible();
  return (
    <div
      ref={ref}
      style={{
        ...(openState ? { height: "auto" } : { maxHeight: collapsedHeight }),
        position: "relative",
        ...style
      }}
      className={cn("overflow-hidden", className)}
      {...props}
    />
  );
});

const CollapsibleContainerOverflowCover = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement>
>(({ className }, ref) => {
  const { openState } = useCollapsible();
  return (
    <div
      className={cn(
        "w-full h-20 absolute bg-gradient-to-t from-card to-transparent",
        "absolute bottom-0",
        openState ? "hidden" : "",
        className
      )}
    ></div>
  );
});

CollapsibleButton.displayName = "CollapsibleButton";
CollapsibleButtonLabel.displayName = "CollapsibleButtonLabel";
CollapsibleContainer.displayName = "CollapsibleContainer";
CollapsibleContainerOverflowCover.displayName =
  "CollapsibleContainerOverflowCover";

export {
  CollapsibleButton,
  useCollapsible,
  CollapsibleButtonLabel,
  CollapsibleContainer,
  CollapsibleContainerOverflowCover,
  type CollapsibleProps
};
