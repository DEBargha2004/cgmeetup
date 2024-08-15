"use client";

import {
  AccordionItemChildWrapper,
  ClearButton,
  MaterialSymbolIcon,
} from "@/components/custom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FancyMultiSelect } from "@/components/ui/fancy-multi-select";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  expertise_level,
  industry,
  job_type,
  location,
  medium,
  tags,
} from "@/constants/job-filters";
import { cn } from "@/lib/utils";
import { Check, Close, KeyboardArrowDown, Sort } from "@mui/icons-material";
import { useState } from "react";

export default function FilterSheet({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={"right"}
        className="bg-card overflow-y-auto scroller"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Filter />
      </SheetContent>
    </Sheet>
  );
}

export function Filter() {
  return (
    <div className=" space-y-3">
      <div className="space-y-4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            {job_type.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Expertise Level" />
          </SelectTrigger>
          <SelectContent>
            {expertise_level.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent></SelectContent>
        </Select>
        <FancyMultiSelect
          options={tags.map((t) => ({ label: t, value: t }))}
          placeholder="Sub Category"
        />

        <FancyMultiSelect
          options={tags.map((t) => ({ label: t, value: t }))}
          placeholder="Skills"
        />

        <FancyMultiSelect
          options={tags.map((t) => ({ label: t, value: t }))}
          placeholder="Software"
        />

        <div className="flex justify-start items-center gap-2">
          <Checkbox />
          <span>Only show listings with salary included</span>
        </div>

        <div className="space-y-2">
          <Input placeholder="Country" />
          <Input placeholder="City" />
        </div>
      </div>
      <div className="flex justify-end">
        <Button className="ml-auto">Reset</Button>
      </div>
    </div>
  );
}
