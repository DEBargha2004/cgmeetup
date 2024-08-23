"use client";

import { Tabs } from "@/components/custom";
import { TabItem } from "@/types/tab";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function ProductInfoTabs() {
  const pathname = usePathname();
  const productid = useMemo(() => {
    return pathname?.slice(1).split("/")[1];
  }, [pathname]);

  const tabs = useMemo<TabItem[]>(() => {
    return [
      {
        label: "Details",
        href: `/product/${productid}`,
      },
      {
        label: "Comments",
        href: `/product/${productid}/comments`,
      },
      {
        label: "Review",
        href: `/product/${productid}/review`,
      },
    ];
  }, [productid]);
  return (
    <div className="flex">
      <Tabs tabs={tabs} className="border-r-0" />
    </div>
  );
}
