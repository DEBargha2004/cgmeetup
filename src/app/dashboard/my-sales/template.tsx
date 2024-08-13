"use client";

import { Tabs } from "@/components/custom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getFormattedIdFromTitle } from "@/functions/get-formatted-id-from-title";
import getFormattedTitleFromId from "@/functions/get-formatted-title-from-id";
import { TabItem } from "@/types/tab";
import { AddCard, CalendarMonth, Payment, Shop } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const tabs: TabItem[] = [
  {
    label: "Latest Sales",
    href: "/dashboard/my-sales",
    Icon: Shop,
  },
  {
    label: "Monthly Summary",
    href: "/dashboard/my-sales/monthly-summary",
    Icon: CalendarMonth,
  },
  {
    label: "Payment Information",
    href: "/dashboard/my-sales/payment-information",
    Icon: Payment,
  },
  {
    label: "Add payment method",
    href: "/dashboard/settings/payment",
    Icon: AddCard,
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const urlArray = pathname
    ?.substring(1)
    .split("/")
    .map((seg) => getFormattedTitleFromId(seg));
  const getUrlFromUrlArray = (urlArray: string[]) => {
    return `/${urlArray?.map((u) => getFormattedIdFromTitle(u)).join("/")}`;
  };
  return (
    <div className="space-y-4">
      <header
        className="z-30 hidden sm:flex md:h-14 items-center gap-4 border-b bg-background px-4 
      sm:static sm:h-auto sm:border-0 sm:bg-transparent "
      >
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            {urlArray?.map((url, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink asChild>
                    <Link
                      href={getUrlFromUrlArray(urlArray.slice(0, index + 1))}
                    >
                      {url}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="last:hidden" />
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="px-4 space-y-2">
        <div className="flex justify-start items-center">
          <Tabs tabs={tabs} />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
