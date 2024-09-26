"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";

type Option = {
  value: string;
  label: string;
};

export function FancyMultiSelect({
  options,
  values,
  onChange,
  placeholder,
  max,
  className
}: {
  options: Option[];
  values?: Option[];
  onChange?: (values: Option[]) => void;
  placeholder?: string;
  max?: number;
  className?: string;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Option[]>(values || []);
  const [inputValue, setInputValue] = React.useState("");
  const selectablesGroupRef = React.useRef<HTMLDivElement>(null);
  const selectedTagsContainerRef = React.useRef<HTMLDivElement>(null);

  const selectables = options.filter(
    (option) => !selected.some((value) => value.value === option.value)
  );

  const isSelectable = (val: string) => {
    return selectables.some((option) => option.value === val);
  };

  const maxCount = max
    ? selected.length > max
      ? selected.length - max
      : 0
    : 0;

  const handleUnselect = React.useCallback(
    (value: Option) => {
      setSelected((prev) => {
        const newSelected = prev.filter((s) => s.value !== value.value);
        onChange?.(newSelected);
        return newSelected;
      });
    },
    [setSelected, onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected((prev) => {
            const newSelected = [...prev];
            newSelected.pop();
            onChange?.(newSelected);
            return newSelected;
          });
        }
      }

      if (e.key === "Enter") {
        if (!isSelectable(input.value)) {
          setInputValue("");
          const option: Option = { value: input.value, label: input.value };
          setSelected((prev) => [...prev, option]);
          onChange?.([...selected, option]);
        }
      }
      // This is not a default behaviour of the <input /> field
      if (e.key === "Escape") {
        input.blur();
      }
    }
  };

  React.useEffect(() => {
    const selectablesGroup = selectablesGroupRef.current;
    if (open && selectablesGroup) {
      const groupDimension = selectablesGroup.getBoundingClientRect();

      selectablesGroup.style.removeProperty("top");
      selectablesGroup.style.removeProperty("bottom");

      console.log(groupDimension.height, window.innerHeight);

      // 30 is added to account for the gap between the selectables and the input box
      // and the margin of the input box
      if (
        groupDimension.top + groupDimension.height + 40 >
        window.innerHeight
      ) {
        selectablesGroup.style.bottom =
          selectedTagsContainerRef.current?.getBoundingClientRect().height! +
          5 +
          "px";
      } else {
        selectablesGroup.style.top =
          selectedTagsContainerRef.current?.getBoundingClientRect().height! +
          5 +
          "px";
      }
    }

    return () => {
      selectablesGroup?.style.removeProperty("top");
      selectablesGroup?.style.removeProperty("bottom");
    };
  }, [open, selectables]);

  return (
    <Command
      onKeyDown={handleKeyDown}
      className={cn("overflow-visible bg-transparent relative z-10")}
    >
      <div
        className={cn(
          "group grid rounded-md bg-darkAccent border border-input p-2 text-sm ring-primary focus-within:ring-2 h-full",
          className
        )}
        ref={selectedTagsContainerRef}
      >
        <div className="flex items-center flex-wrap gap-1 my-auto">
          {selected.slice(0, max).map((value) => {
            return (
              <Badge
                key={value.value}
                variant="secondary"
                className="bg-lightAccent hover:bg-lightAccent/70 cursor-pointer"
              >
                {value.label}
                <button
                  className="ml-1 rounded-full outline-none  focus:ring-2  focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(value);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(value)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {maxCount ? (
            <Badge
              key={"max"}
              variant="secondary"
              className="bg-lightAccent hover:bg-lightAccent/70 cursor-pointer"
            >
              +{maxCount}
            </Badge>
          ) : null}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder || "Select Options"}
            className={cn(
              "ml-2 min-w-[80px] flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            )}
          />
        </div>
      </div>
      <div className="absolute w-full h-fit" ref={selectablesGroupRef}>
        <CommandList className="">
          {open && selectables.length > 0 ? (
            <div
              className="top-0 w-full rounded-md border bg-darkAccent 
            text-popover-foreground shadow-md outline-none animate-in max-h-[300px] overflow-y-auto overflow-x-hidden scroller"
            >
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((framework) => {
                  return (
                    <CommandItem
                      key={framework.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue("");
                        setSelected((prev) => [...prev, framework]);
                      }}
                      className={"cursor-pointer "}
                    >
                      {framework.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
