"use client";

import { Tabs } from "@/components/custom";
import { TabItem } from "@/types/tab";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function CourseTab() {
  const pathname = usePathname();
  const id = pathname?.split("/")[2];
  const tabs = useMemo<TabItem[]>(() => {
    return [
      {
        label: "Reviews",
        href: `/tutorial/${id}`
      },
      {
        label: "Comments",
        href: `/tutorial/${id}/comments`
      }
    ];
  }, [id]);
  return (
    <div className="flex">
      <Tabs tabs={tabs} className="border-r-none" />
    </div>
  );
}
