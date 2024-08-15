"use client";

import { Button } from "@/components/ui/button";
import { FancyMultiSelect } from "@/components/ui/fancy-multi-select";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { tags } from "@/constants/job-filters";
import { Sort } from "@mui/icons-material";
import React, { useState } from "react";

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
        className="bg-lightAccent overflow-y-auto scroller"
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
        <FancyMultiSelect
          options={tags.map((t) => ({ label: t, value: t }))}
          placeholder="Category"
        />
        {/* <ClearButton /> */}

        <FancyMultiSelect
          options={tags.map((t) => ({ label: t, value: t }))}
          placeholder="Software"
        />
        {/* <ClearButton /> */}

        <FancyMultiSelect
          options={tags.map((t) => ({ label: t, value: t }))}
          placeholder="Skills"
        />
        {/* <ClearButton /> */}

        <div className="space-y-1">
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
