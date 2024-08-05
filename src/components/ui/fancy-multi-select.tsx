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

const FRAMEWORKS: Option[] = [
  {
    value: "next.js",
    label: "Next.js"
  },
  {
    value: "sveltekit",
    label: "SvelteKit"
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js"
  },
  {
    value: "remix",
    label: "Remix"
  },
  {
    value: "astro",
    label: "Astro"
  },
  {
    value: "wordpress",
    label: "WordPress"
  },
  {
    value: "express.js",
    label: "Express.js"
  },
  {
    value: "nest.js",
    label: "Nest.js"
  }
];

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

  const handleUnselect = React.useCallback((value: Option) => {
    setSelected((prev) => {
      const newSelected = prev.filter((s) => s.value !== value.value);
      onChange?.(newSelected);
      return newSelected;
    });
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
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
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = options.filter(
    (option) => !selected.some((value) => value.value === option.value)
  );

  const maxCount = max
    ? selected.length > max
      ? selected.length - max
      : 0
    : 0;

  return (
    <Command
      onKeyDown={handleKeyDown}
      className={cn("overflow-visible bg-transparent")}
    >
      <div
        className={cn(
          "group grid rounded-md bg-darkAccent border border-input px-2 text-sm ring-primary focus-within:ring-2 h-full",
          className
        )}
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
            className="ml-2 max-w-[100px] flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative top-2">
        <CommandList className="">
          {open && selectables.length > 0 ? (
            <div
              className="absolute top-0 z-10 w-full rounded-md border bg-darkAccent 
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
